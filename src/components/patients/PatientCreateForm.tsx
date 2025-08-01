'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const PatientCreateForm: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state for patient data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    cep: '',
    about: ''
  });

  // Form state for initial IMC measurement (optional)
  const [imcData, setImcData] = useState({
    weight: '',
    height: '',
    age: '',
    neck: '',
    waist: '',
    hip: '',
    bodyFat: ''
  });

  const [activeTab, setActiveTab] = useState<'personal' | 'measurements'>('personal');
  const [includeInitialMeasurement, setIncludeInitialMeasurement] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Show success animation when field is filled
    if (value.trim() && !formData[name as keyof typeof formData]) {
      const element = document.getElementById(name);
      if (element) {
        element.classList.add('success-glow');
        setTimeout(() => element.classList.remove('success-glow'), 1000);
      }
    }
  };

  const handleIMCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Only allow numbers and decimal points
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setImcData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (formData.phone && !/^[\d\s\(\)\-\+]+$/.test(formData.phone)) {
      newErrors.phone = 'Telefone inválido';
    }

    if (formData.cep && !/^\d{5}-?\d{3}$/.test(formData.cep)) {
      newErrors.cep = 'CEP inválido (formato: 12345-678)';
    }

    // Validate measurements if included
    if (includeInitialMeasurement) {
      if (!imcData.weight) {
        newErrors.weight = 'Peso é obrigatório quando incluindo medição inicial';
      }
      if (!imcData.height) {
        newErrors.height = 'Altura é obrigatória quando incluindo medição inicial';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateIMC = () => {
    const weight = parseFloat(imcData.weight);
    const height = parseFloat(imcData.height);
    
    if (weight && height) {
      const heightInMeters = height / 100;
      return weight / (heightInMeters * heightInMeters);
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Create patient
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao criar paciente');
      }

      const { patient } = await response.json();

      // If measurements were provided, create initial IMC record
      if (includeInitialMeasurement && imcData.weight && imcData.height) {
        const calculatedIMC = calculateIMC();
        
        const imcResponse = await fetch(`/api/patients/${patient.id}/measurements`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            weight: parseFloat(imcData.weight),
            height: parseFloat(imcData.height),
            age: imcData.age ? parseInt(imcData.age) : null,
            neck: imcData.neck ? parseFloat(imcData.neck) : null,
            waist: imcData.waist ? parseFloat(imcData.waist) : null,
            hip: imcData.hip ? parseFloat(imcData.hip) : null,
            pgc: imcData.bodyFat ? parseFloat(imcData.bodyFat) : null,
            pgbmi: calculatedIMC
          }),
        });

        if (!imcResponse.ok) {
          console.warn('Erro ao salvar medições iniciais, mas paciente foi criado');
        }
      }

      // Show success message with celebration
      setSuccessMessage('Cliente criado com sucesso! 🎉');
      
      // Add confetti effect (visual celebration)
      const celebrateSuccess = () => {
        for (let i = 0; i < 30; i++) {
          setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][Math.floor(Math.random() * 5)];
            document.body.appendChild(confetti);
            
            setTimeout(() => {
              if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
              }
            }, 3000);
          }, i * 100);
        }
      };
      
      celebrateSuccess();
      
      // Redirect after showing success
      setTimeout(() => {
        router.push(`/patients/${patient.id}`);
        router.refresh();
      }, 2000);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setErrors({ general: error instanceof Error ? error.message : 'Erro ao criar paciente. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  const currentIMC = calculateIMC();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Breadcrumb */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/patients" className="hover:text-blue-600 dark:hover:text-blue-400">
            Pacientes
          </Link>
          <span>&gt;</span>
          <span className="text-gray-900 dark:text-white">Novo Paciente</span>
        </nav>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex px-6">
          <button
            onClick={() => setActiveTab('personal')}
            className={`py-4 px-1 border-b-2 font-medium text-sm mr-8 ${
              activeTab === 'personal'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Dados Pessoais *
          </button>
          <button
            onClick={() => setActiveTab('measurements')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'measurements'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Medição Inicial (Opcional)
          </button>
        </nav>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-6">
          {errors.general && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
              {errors.general}
            </div>
          )}

          {/* Personal Data Tab */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus hover-glow transition-all duration-200 ${
                      errors.name ? 'border-red-300 dark:border-red-600 animate-shake-no' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Digite o nome completo 🙋‍♂️"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus hover-glow transition-all duration-200 ${
                      errors.email ? 'border-red-300 dark:border-red-600 animate-shake-no' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Digite o email 📧"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.phone ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="(11) 99999-9999"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>}
                </div>

                {/* CEP */}
                <div>
                  <label htmlFor="cep" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    CEP
                  </label>
                  <input
                    type="text"
                    id="cep"
                    name="cep"
                    value={formData.cep}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.cep ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="12345-678"
                  />
                  {errors.cep && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.cep}</p>}
                </div>
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Endereço
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Rua, número, bairro, cidade"
                />
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Observações
                </label>
                <textarea
                  id="about"
                  name="about"
                  rows={4}
                  value={formData.about}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Observações sobre o paciente, histórico médico, preferências alimentares, etc."
                />
              </div>
            </div>
          )}

          {/* Measurements Tab */}
          {activeTab === 'measurements' && (
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="includeInitialMeasurement"
                    checked={includeInitialMeasurement}
                    onChange={(e) => setIncludeInitialMeasurement(e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="includeInitialMeasurement" className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Incluir medição inicial
                  </label>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Opcionalmente, você pode adicionar uma medição inicial para começar o acompanhamento do paciente.
                </p>
              </div>

              {includeInitialMeasurement && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Weight */}
                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Peso (kg) *
                    </label>
                    <input
                      type="text"
                      id="weight"
                      name="weight"
                      value={imcData.weight}
                      onChange={handleIMCChange}
                      className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.weight ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="70.5"
                    />
                    {errors.weight && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.weight}</p>}
                  </div>

                  {/* Height */}
                  <div>
                    <label htmlFor="height" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Altura (cm) *
                    </label>
                    <input
                      type="text"
                      id="height"
                      name="height"
                      value={imcData.height}
                      onChange={handleIMCChange}
                      className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.height ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="170"
                    />
                    {errors.height && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.height}</p>}
                  </div>

                  {/* Age */}
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Idade
                    </label>
                    <input
                      type="text"
                      id="age"
                      name="age"
                      value={imcData.age}
                      onChange={handleIMCChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="30"
                    />
                  </div>

                  {/* Body Fat */}
                  <div>
                    <label htmlFor="bodyFat" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Gordura Corporal (%)
                    </label>
                    <input
                      type="text"
                      id="bodyFat"
                      name="bodyFat"
                      value={imcData.bodyFat}
                      onChange={handleIMCChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="15.5"
                    />
                  </div>

                  {/* Neck */}
                  <div>
                    <label htmlFor="neck" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Pescoço (cm)
                    </label>
                    <input
                      type="text"
                      id="neck"
                      name="neck"
                      value={imcData.neck}
                      onChange={handleIMCChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="35"
                    />
                  </div>

                  {/* Waist */}
                  <div>
                    <label htmlFor="waist" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Cintura (cm)
                    </label>
                    <input
                      type="text"
                      id="waist"
                      name="waist"
                      value={imcData.waist}
                      onChange={handleIMCChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="80"
                    />
                  </div>

                  {/* Hip */}
                  <div>
                    <label htmlFor="hip" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Quadril (cm)
                    </label>
                    <input
                      type="text"
                      id="hip"
                      name="hip"
                      value={imcData.hip}
                      onChange={handleIMCChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="95"
                    />
                  </div>
                </div>
              )}

              {/* IMC Calculation */}
              {includeInitialMeasurement && currentIMC && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-green-700 dark:text-green-300">
                      IMC Calculado: <strong>{currentIMC.toFixed(1)}</strong>
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600 flex justify-between rounded-b-lg">
          <Link
            href="/patients"
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
          >
            Cancelar
          </Link>
          
          <button
            type="submit"
            disabled={isLoading || successMessage !== ''}
            className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-3 rounded-xl font-medium inline-flex items-center transform hover:scale-105 transition-all duration-200 hover:shadow-lg btn-playful"
          >
            {isLoading ? (
              <>
                <div className="loading-dots mr-2">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </div>
                Criando sua magia...
              </>
            ) : successMessage ? (
              <>
                <span className="mr-2 animate-bounce-gentle">🎉</span>
                Cliente Criado!
                <span className="ml-2 animate-bounce-gentle">✨</span>
              </>
            ) : (
              <>
                <span className="mr-2 group-hover:animate-wiggle">🚀</span>
                Criar Cliente
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">✨</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientCreateForm;