'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string | null;
  email: string | null;
  functionName: string | null;
}

interface ImcFormProps {
  users: User[];
  initialData?: {
    id?: number;
    dateimc?: string;
    userid?: number;
    sex?: string;
    age?: number;
    weight?: number;
    height?: number;
    neck?: number;
    waist?: number;
    belly?: number;
    lowwaist?: number;
    hip?: number;
    pgc?: number;
    category?: string;
    gci?: string;
    mgfm?: number;
    mmlm?: number;
    pgbmi?: number;
    ica?: number;
  };
}

const ImcForm: React.FC<ImcFormProps> = ({ users, initialData }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [calculationProgress, setCalculationProgress] = useState(0);
  const [formData, setFormData] = useState({
    dateimc: initialData?.dateimc || new Date().toISOString().split('T')[0],
    userid: initialData?.userid || '',
    sex: initialData?.sex || '',
    age: initialData?.age || '',
    weight: initialData?.weight || '',
    height: initialData?.height || '',
    neck: initialData?.neck || '',
    waist: initialData?.waist || '',
    belly: initialData?.belly || '',
    lowwaist: initialData?.lowwaist || '',
    hip: initialData?.hip || '',
    pgc: initialData?.pgc || '',
    category: initialData?.category || '',
    gci: initialData?.gci || '',
    mgfm: initialData?.mgfm || '',
    mmlm: initialData?.mmlm || '',
    pgbmi: initialData?.pgbmi || '',
    ica: initialData?.ica || ''
  });

  // Calculate BMI automatically
  const calculateBMI = (weight: number, height: number) => {
    if (!weight || !height) return 0;
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  };

  // Calculate body fat percentage using Navy formula
  const calculateBodyFat = (sex: string, waist: number, neck: number, height: number, hip?: number) => {
    if (!waist || !neck || !height) return 0;
    
    if (sex === 'Masculino') {
      return 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else if (sex === 'Feminino' && hip) {
      return 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    }
    return 0;
  };

  // Calculate body fat mass and lean mass
  const calculateBodyComposition = (weight: number, bodyFatPercentage: number) => {
    if (!weight || !bodyFatPercentage) return { mgfm: 0, mmlm: 0 };
    
    const mgfm = (weight * bodyFatPercentage) / 100; // Fat mass
    const mmlm = weight - mgfm; // Lean mass
    
    return { mgfm, mmlm };
  };

  // Calculate Abdominal Conicity Index (ICA)
  const calculateICA = (waist: number, weight: number, height: number) => {
    if (!waist || !weight || !height) return 0;
    const heightInMeters = height / 100;
    return (waist / 100) / (0.109 * Math.sqrt(weight / heightInMeters));
  };

  // Determine BMI category
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return 'Abaixo do peso';
    if (bmi < 25) return 'Peso normal';
    if (bmi < 30) return 'Sobrepeso';
    if (bmi < 35) return 'Obesidade grau I';
    if (bmi < 40) return 'Obesidade grau II';
    return 'Obesidade grau III';
  };

  // Calculate form completion progress
  useEffect(() => {
    const requiredFields = ['userid', 'sex', 'weight', 'height'];
    const filledRequired = requiredFields.filter(field => formData[field as keyof typeof formData]).length;
    const progress = (filledRequired / requiredFields.length) * 100;
    setCalculationProgress(progress);
  }, [formData]);

  // Auto-calculate when relevant fields change
  useEffect(() => {
    const weight = parseFloat(formData.weight as string) || 0;
    const height = parseFloat(formData.height as string) || 0;
    const waist = parseFloat(formData.waist as string) || 0;
    const neck = parseFloat(formData.neck as string) || 0;
    const hip = parseFloat(formData.hip as string) || 0;

    if (weight && height) {
      const bmi = calculateBMI(weight, height);
      const category = getBMICategory(bmi);
      
      // Add visual feedback for calculation
      const calculatedFields = document.querySelectorAll('[data-calculated="true"]');
      calculatedFields.forEach(field => {
        field.classList.add('success-glow');
        setTimeout(() => field.classList.remove('success-glow'), 800);
      });
      
      setFormData(prev => ({
        ...prev,
        pgbmi: bmi.toFixed(2),
        category
      }));

      if (waist && neck && formData.sex) {
        const bodyFat = calculateBodyFat(formData.sex, waist, neck, height, hip);
        const { mgfm, mmlm } = calculateBodyComposition(weight, bodyFat);
        const ica = calculateICA(waist, weight, height);

        setFormData(prev => ({
          ...prev,
          pgc: bodyFat.toFixed(2),
          mgfm: mgfm.toFixed(2),
          mmlm: mmlm.toFixed(2),
          ica: ica.toFixed(2)
        }));
      }
    }
  }, [formData.weight, formData.height, formData.waist, formData.neck, formData.hip, formData.sex]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = initialData?.id ? `/api/imc/${initialData.id}` : '/api/imc';
      const method = initialData?.id ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userid: parseInt(formData.userid as string),
          age: formData.age ? parseInt(formData.age as string) : null,
          weight: formData.weight ? parseFloat(formData.weight as string) : null,
          height: formData.height ? parseInt(formData.height as string) : null,
          neck: formData.neck ? parseInt(formData.neck as string) : null,
          waist: formData.waist ? parseInt(formData.waist as string) : null,
          belly: formData.belly ? parseInt(formData.belly as string) : null,
          lowwaist: formData.lowwaist ? parseInt(formData.lowwaist as string) : null,
          hip: formData.hip ? parseInt(formData.hip as string) : null,
          pgc: formData.pgc ? parseFloat(formData.pgc as string) : null,
          mgfm: formData.mgfm ? parseFloat(formData.mgfm as string) : null,
          mmlm: formData.mmlm ? parseFloat(formData.mmlm as string) : null,
          pgbmi: formData.pgbmi ? parseFloat(formData.pgbmi as string) : null,
          ica: formData.ica ? parseFloat(formData.ica as string) : null
        }),
      });

      if (response.ok) {
        // Show success message with celebration
        setSuccessMessage(initialData?.id ? 'Registro atualizado! 🎉' : 'Registro criado com sucesso! 💪');
        
        // Add celebration effect
        for (let i = 0; i < 20; i++) {
          setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'][Math.floor(Math.random() * 4)];
            document.body.appendChild(confetti);
            
            setTimeout(() => {
              if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
              }
            }, 3000);
          }, i * 50);
        }
        
        setTimeout(() => {
          router.push('/imc');
        }, 1500);
      } else {
        console.error('Erro ao salvar registro');
      }
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProgressEmoji = () => {
    if (calculationProgress === 0) return '🏁';
    if (calculationProgress < 50) return '🚀';
    if (calculationProgress < 100) return '💪';
    return '🎆';
  };

  const getProgressMessage = () => {
    if (calculationProgress === 0) return 'Vamos começar as medidas!';
    if (calculationProgress < 50) return 'Continuando bem!';
    if (calculationProgress < 100) return 'Quase pronto para calcular!';
    return 'Tudo preenchido! Cálculos em tempo real!';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 animate-fade-in">
      {/* Progress Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl animate-bounce-gentle">{getProgressEmoji()}</span>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                {getProgressMessage()}
              </h3>
              <div className="flex items-center mt-1">
                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${calculationProgress}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {Math.round(calculationProgress)}% completo
                </span>
              </div>
            </div>
          </div>
          {successMessage && (
            <div className="animate-pop-in bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              {successMessage}
            </div>
          )}
        </div>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Identificação */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Identificação
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Data
                </label>
                <input
                  type="date"
                  name="dateimc"
                  value={formData.dateimc}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Usuário
                </label>
                <select
                  name="userid"
                  value={formData.userid}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione um usuário</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sexo
                </label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
              </div>
            </div>
          </div>

          {/* Dados Básicos */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Dados Básicos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Idade (anos)
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="0"
                  max="150"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Peso (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  min="0"
                  max="500"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Altura (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  min="0"
                  max="250"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Medidas Corporais */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Medidas Corporais (cm)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pescoço
                </label>
                <input
                  type="number"
                  name="neck"
                  value={formData.neck}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cintura
                </label>
                <input
                  type="number"
                  name="waist"
                  value={formData.waist}
                  onChange={handleChange}
                  min="0"
                  max="200"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Barriga
                </label>
                <input
                  type="number"
                  name="belly"
                  value={formData.belly}
                  onChange={handleChange}
                  min="0"
                  max="200"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cintura Baixa
                </label>
                <input
                  type="number"
                  name="lowwaist"
                  value={formData.lowwaist}
                  onChange={handleChange}
                  min="0"
                  max="200"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quadril
                </label>
                <input
                  type="number"
                  name="hip"
                  value={formData.hip}
                  onChange={handleChange}
                  min="0"
                  max="200"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Indicadores Calculados */}
          <div className="pb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Indicadores (Calculados Automaticamente)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  IMC
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="pgbmi"
                  value={formData.pgbmi}
                  onChange={handleChange}
                  readOnly
                  data-calculated="true"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 text-gray-900 dark:text-white font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gordura Corporal (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="pgc"
                  value={formData.pgc}
                  onChange={handleChange}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Massa Gorda (kg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="mgfm"
                  value={formData.mgfm}
                  onChange={handleChange}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Massa Magra (kg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="mmlm"
                  value={formData.mmlm}
                  onChange={handleChange}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ICA (Índice de Conicidade)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="ica"
                  value={formData.ica}
                  onChange={handleChange}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Categoria
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading || successMessage !== ''}
              className="group px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-blue-600 rounded-xl hover:from-green-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 transform hover:scale-105 transition-all duration-200 hover:shadow-lg btn-playful"
            >
              {isLoading ? (
                <>
                  <div className="loading-dots mr-2">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </div>
                  Calculando magia...
                </>
              ) : successMessage ? (
                <>
                  <span className="mr-2 animate-bounce-gentle">🎉</span>
                  {initialData?.id ? 'Atualizado!' : 'Criado!'}
                  <span className="ml-2 animate-bounce-gentle">✨</span>
                </>
              ) : (
                <>
                  <span className="mr-2 group-hover:animate-wiggle">📈</span>
                  {initialData?.id ? 'Atualizar Registro' : 'Salvar Registro'}
                  <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">✨</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImcForm;