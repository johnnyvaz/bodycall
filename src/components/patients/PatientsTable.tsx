'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import '../../styles/whimsy.css';

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
  const [isLoading, setIsLoading] = useState(true);
  const [celebratingRows, setCelebratingRows] = useState<Set<number>>(new Set());

  // Simular loading para mostrar skeleton
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleCelebrate = (patientId: number) => {
    setCelebratingRows(prev => new Set(prev).add(patientId));
    setTimeout(() => {
      setCelebratingRows(prev => {
        const newSet = new Set(prev);
        newSet.delete(patientId);
        return newSet;
      });
    }, 600);
  };

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

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 animate-fade-in">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="skeleton h-10 w-64 rounded-lg"></div>
            <div className="skeleton h-10 w-32 rounded-lg"></div>
          </div>
        </div>
        <div className="p-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 mb-4">
              <div className="skeleton h-10 w-10 rounded-full"></div>
              <div className="flex-1">
                <div className="skeleton h-4 w-48 mb-2 rounded"></div>
                <div className="skeleton h-3 w-32 rounded"></div>
              </div>
              <div className="skeleton h-4 w-16 rounded"></div>
              <div className="skeleton h-4 w-20 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 animate-fade-in card-hover">
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
                placeholder="Buscar por nome ou email... 🔍"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus hover-glow"
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
            
            <div className="text-sm text-gray-600 dark:text-gray-400 animate-fade-in-delay">
              📈 {filteredPatients.length} de {patients.length} clientes
              {filteredPatients.length > 0 && (
                <span className="ml-2 animate-bounce-gentle">✨</span>
              )}
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
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Cliente
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
                <td colSpan={7} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center animate-pop-in">
                    <div className="animate-float mb-6">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mb-4">
                          <span className="text-4xl animate-bounce-gentle" role="img" aria-label="procurando">
                            {searchTerm ? '🔍' : '👥'}
                          </span>
                        </div>
                        {!searchTerm && (
                          <div className="absolute -top-2 -right-2 animate-pulse-subtle">
                            <span className="text-2xl" role="img" aria-label="brilho">✨</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {searchTerm ? 'Ops! Ninguém por aqui' : 'Sua jornada começa aqui!'}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                      {searchTerm 
                        ? 'Que tal tentar outros termos de busca? Seus clientes estão esperando!' 
                        : 'Adicione seu primeiro cliente e comece a acompanhar transformações incríveis!'
                      }
                    </p>
                    {!searchTerm && (
                      <Link
                        href="/patients/new"
                        className="mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 hover:shadow-lg btn-playful"
                      >
                        <span className="mr-2">🎆</span>
                        Adicionar Primeiro Cliente
                        <span className="ml-2 animate-bounce-gentle">✨</span>
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filteredPatients.map((patient) => {
                const latestIMC = patient.latestIMC;
                const imcStatus = getIMCStatus(latestIMC?.pgbmi || null);
                const nextAppointment = patient.patientAppointments[0];

                return (
                  <tr key={patient.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 hover-lift ${
                    celebratingRows.has(patient.id) ? 'animate-celebrate' : ''
                  }`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      #{patient.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center transform hover:scale-110 transition-transform duration-200 cursor-pointer"
                               onClick={() => handleCelebrate(patient.id)}
                               title="Clique para celebrar este cliente! 🎉">
                            <span className="text-white font-bold text-sm">
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
                          className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-all duration-200 hover:scale-105"
                          title="Ver detalhes do cliente"
                        >
                          <span className="mr-1">👁️</span>
                          Ver
                        </Link>
                        <Link
                          href={`/patients/${patient.id}/edit`}
                          className="inline-flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-105"
                          title="Editar informações"
                        >
                          <span className="mr-1">✏️</span>
                          Editar
                        </Link>
                        <button 
                          className="inline-flex items-center px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-all duration-200 hover:scale-105"
                          title="Remover cliente (cuidado!)"
                        >
                          <span className="mr-1">🗑️</span>
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
              Mostrando {filteredPatients.length} de {patients.length} clientes
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