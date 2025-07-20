'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PatientOption {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
}

interface AppointmentCreateFormProps {
  patients: PatientOption[];
}

const AppointmentCreateForm: React.FC<AppointmentCreateFormProps> = ({ patients }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    patientId: '',
    date: '',
    time: '',
    type: 'retorno',
    status: 'agendada',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.patientId) {
      newErrors.patientId = 'Selecione um paciente';
    }

    if (!formData.date) {
      newErrors.date = 'Data é obrigatória';
    } else {
      const selectedDate = new Date(formData.date + 'T' + formData.time);
      const now = new Date();
      if (selectedDate <= now) {
        newErrors.date = 'A data e hora devem ser futuras';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Horário é obrigatório';
    }

    if (!formData.type) {
      newErrors.type = 'Tipo de consulta é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Combine date and time
      const appointmentDateTime = new Date(formData.date + 'T' + formData.time);

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientId: parseInt(formData.patientId),
          date: appointmentDateTime.toISOString(),
          type: formData.type,
          status: formData.status,
          notes: formData.notes || null
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao criar consulta');
      }

      // Redirect to appointments page
      router.push('/appointments');
      router.refresh();
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setErrors({ general: error instanceof Error ? error.message : 'Erro ao criar consulta. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Get minimum date (today)
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  // Get selected patient info
  const selectedPatient = patients.find(p => p.id.toString() === formData.patientId);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Breadcrumb */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/appointments" className="hover:text-blue-600 dark:hover:text-blue-400">
            Consultas
          </Link>
          <span>&gt;</span>
          <span className="text-gray-900 dark:text-white">Nova Consulta</span>
        </nav>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-6">
          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
              {errors.general}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Patient Selection */}
              <div>
                <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Paciente *
                </label>
                <select
                  id="patientId"
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.patientId ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <option value="">Selecione um paciente</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name || 'Nome não informado'} {patient.email && `(${patient.email})`}
                    </option>
                  ))}
                </select>
                {errors.patientId && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.patientId}</p>}
                
                {selectedPatient && (
                  <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-sm">
                      <div className="font-medium text-blue-900 dark:text-blue-100">
                        {selectedPatient.name}
                      </div>
                      {selectedPatient.email && (
                        <div className="text-blue-700 dark:text-blue-300">
                          {selectedPatient.email}
                        </div>
                      )}
                      {selectedPatient.phone && (
                        <div className="text-blue-700 dark:text-blue-300">
                          {selectedPatient.phone}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Data *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={minDate}
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.date ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.date && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.date}</p>}
              </div>

              {/* Time */}
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Horário *
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.time ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.time && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.time}</p>}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Type */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo de Consulta *
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.type ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <option value="primeira_consulta">Primeira Consulta</option>
                  <option value="retorno">Retorno</option>
                  <option value="online">Consulta Online</option>
                  <option value="nutricional">Avaliação Nutricional</option>
                  <option value="acompanhamento">Acompanhamento</option>
                </select>
                {errors.type && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.type}</p>}
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="agendada">Agendada</option>
                  <option value="confirmada">Confirmada</option>
                  <option value="reagendada">Reagendada</option>
                </select>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Ações Rápidas
                </h4>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      const now = new Date();
                      const tomorrow = new Date(now);
                      tomorrow.setDate(now.getDate() + 1);
                      setFormData(prev => ({
                        ...prev,
                        date: tomorrow.toISOString().split('T')[0],
                        time: '09:00'
                      }));
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                  >
                    Amanhã às 9:00
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const now = new Date();
                      const nextWeek = new Date(now);
                      nextWeek.setDate(now.getDate() + 7);
                      setFormData(prev => ({
                        ...prev,
                        date: nextWeek.toISOString().split('T')[0],
                        time: '10:00'
                      }));
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                  >
                    Próxima semana às 10:00
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Observações
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Observações sobre a consulta, objetivos, preparação necessária, etc."
            />
          </div>

          {/* Date and Time Preview */}
          {formData.date && formData.time && (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-green-700 dark:text-green-300">
                  <strong>Agendado para:</strong> {' '}
                  {new Date(formData.date + 'T' + formData.time).toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600 flex justify-between rounded-b-lg">
          <Link
            href="/appointments"
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
          >
            Cancelar
          </Link>
          
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium inline-flex items-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Agendando...
              </>
            ) : (
              'Agendar Consulta'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentCreateForm;