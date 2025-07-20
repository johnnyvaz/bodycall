'use client';
import React, { useState } from 'react';
import Link from 'next/link';

interface PatientData {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  patientAppointments: Array<{
    id: number;
    date: Date;
    type: string | null;
    status: string | null;
  }>;
  latestIMC?: {
    id: number;
    weight: number | null;
    height: number | null;
    pgbmi: number | null;
    dateimc: Date;
    age: number | null;
  } | null;
}

interface PatientsTableProps {
  patients: PatientData[];
}

const PatientsTable: React.FC<PatientsTableProps> = ({ patients }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // For now, we'll consider all patients as active since they're filtered by active="Y"
    const matchesStatus = statusFilter === 'all' || statusFilter === 'active';
    
    return matchesSearch && matchesStatus;
  });

  const getPatientAge = (patient: PatientData) => {
    // Get age from latest IMC record or return '-'
    return patient.latestIMC?.age || '-';
  };

  const getIMCStatus = (imc: number | null) => {
    if (!imc) return { status: 'N/A', color: 'gray' };
    
    if (imc < 18.5) return { status: 'Abaixo', color: 'blue' };
    if (imc < 25) return { status: 'Normal', color: 'green' };
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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Header with search and filters */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="all">Todos os status</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
            </select>
            
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {filteredPatients.length} de {patients.length} pacientes
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Paciente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Idade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                IMC Atual
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Última Consulta
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Próxima Consulta
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredPatients.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400">
                      {searchTerm ? 'Nenhum paciente encontrado' : 'Nenhum paciente cadastrado'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredPatients.map((patient) => {
                const latestIMC = patient.latestIMC;
                const imcStatus = getIMCStatus(latestIMC?.pgbmi || null);
                const nextAppointment = patient.patientAppointments[0];

                return (
                  <tr key={patient.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                              {patient.name?.charAt(0).toUpperCase() || 'P'}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {patient.name || 'Nome não informado'}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {patient.email || 'Email não informado'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {getPatientAge(patient)} anos
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {latestIMC?.pgbmi?.toFixed(1) || 'N/A'}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(imcStatus.color)}`}>
                          {imcStatus.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {latestIMC ? formatDate(latestIMC.dateimc) : 'Sem registro'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {nextAppointment ? formatDate(nextAppointment.date) : 'Não agendada'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/patients/${patient.id}`}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Ver
                        </Link>
                        <Link
                          href={`/patients/${patient.id}/edit`}
                          className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                          Editar
                        </Link>
                        <button className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - placeholder for now */}
      {filteredPatients.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Mostrando {filteredPatients.length} de {patients.length} pacientes
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                Anterior
              </button>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">
                1
              </button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                Próximo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsTable;