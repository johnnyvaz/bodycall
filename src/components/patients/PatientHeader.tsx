'use client';
import React from 'react';
import Link from 'next/link';

interface PatientData {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  createdate: Date | null;
  address: string | null;
  about: string | null;
}

interface IMCData {
  id: number;
  weight: number | null;
  height: number | null;
  pgbmi: number | null;
  dateimc: Date;
  age: number | null;
  category: string | null;
}

interface AppointmentData {
  id: number;
  date: Date;
  type: string | null;
  status: string | null;
}

interface PatientHeaderProps {
  patient: PatientData;
  latestIMC?: IMCData | null;
  nextAppointment?: AppointmentData | null;
}

const PatientHeader: React.FC<PatientHeaderProps> = ({ 
  patient, 
  latestIMC, 
  nextAppointment 
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getIMCStatus = (imc: number | null) => {
    if (!imc) return { status: 'N/A', color: 'gray' };
    
    if (imc < 18.5) return { status: 'Abaixo do peso', color: 'blue' };
    if (imc < 25) return { status: 'Peso normal', color: 'green' };
    if (imc < 30) return { status: 'Sobrepeso', color: 'yellow' };
    return { status: 'Obesidade', color: 'red' };
  };

  const getStatusColor = (color: string) => {
    const colors = {
      gray: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  const imcStatus = getIMCStatus(latestIMC?.pgbmi || null);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Breadcrumb */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/patients" className="hover:text-blue-600 dark:hover:text-blue-400">
            Pacientes
          </Link>
          <span>&gt;</span>
          <span className="text-gray-900 dark:text-white">
            {patient.name || 'Paciente sem nome'}
          </span>
        </nav>
      </div>

      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-6 lg:space-y-0">
          {/* Patient Info */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 h-16 w-16">
              <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-semibold text-xl">
                  {patient.name?.charAt(0).toUpperCase() || 'P'}
                </span>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {patient.name || 'Nome não informado'}
                </h1>
                {latestIMC && (
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(imcStatus.color)}`}>
                    {imcStatus.status}
                  </span>
                )}
              </div>
              
              <div className="mt-2 space-y-1">
                {patient.email && (
                  <p className="text-gray-600 dark:text-gray-400 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {patient.email}
                  </p>
                )}
                
                {patient.phone && (
                  <p className="text-gray-600 dark:text-gray-400 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {patient.phone}
                  </p>
                )}
                
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Paciente desde {patient.createdate ? formatDate(patient.createdate) : 'Data não informada'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats & Actions */}
          <div className="flex flex-col lg:items-end space-y-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-2">
              {latestIMC && (
                <div className="text-center lg:text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {latestIMC.pgbmi?.toFixed(1) || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    IMC Atual
                  </div>
                </div>
              )}
              
              {latestIMC?.age && (
                <div className="text-center lg:text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {latestIMC.age}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Anos
                  </div>
                </div>
              )}
            </div>

            {/* Next Appointment */}
            {nextAppointment && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <div className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                  Próxima Consulta
                </div>
                <div className="text-blue-800 dark:text-blue-200 font-semibold">
                  {formatDateTime(nextAppointment.date)}
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400">
                  {nextAppointment.type || 'Consulta'}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Link
                href={`/patients/${patient.id}/edit`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm inline-flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Editar
              </Link>
              
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm inline-flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Nova Consulta
              </button>
            </div>
          </div>
        </div>
        
        {/* Patient Notes */}
        {patient.about && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Observações
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {patient.about}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientHeader;