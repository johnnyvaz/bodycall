'use client';
import React, { useState } from 'react';
import Link from 'next/link';

interface PatientData {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
}

interface AppointmentData {
  id: number;
  date: Date;
  type: string | null;
  status: string | null;
  patient: PatientData;
}

interface AppointmentsListProps {
  appointments: AppointmentData[];
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({ appointments }) => {
  const [filter, setFilter] = useState<'all' | 'today' | 'upcoming' | 'completed'>('upcoming');

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };


  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'agendada':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'realizada':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'cancelada':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'em_andamento':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getTypeIcon = (type: string | null) => {
    switch (type) {
      case 'primeira_consulta':
        return (
          <div className="p-1 bg-blue-100 rounded-full dark:bg-blue-900/30">
            <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        );
      case 'retorno':
        return (
          <div className="p-1 bg-green-100 rounded-full dark:bg-green-900/30">
            <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        );
      case 'online':
        return (
          <div className="p-1 bg-purple-100 rounded-full dark:bg-purple-900/30">
            <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="p-1 bg-gray-100 rounded-full dark:bg-gray-900/30">
            <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        );
    }
  };

  const formatTypeDisplay = (type: string | null) => {
    switch (type) {
      case 'primeira_consulta':
        return 'Primeira Consulta';
      case 'retorno':
        return 'Retorno';
      case 'online':
        return 'Online';
      default:
        return 'Consulta';
    }
  };

  const formatStatusDisplay = (status: string | null) => {
    switch (status) {
      case 'agendada':
        return 'Agendada';
      case 'realizada':
        return 'Realizada';
      case 'cancelada':
        return 'Cancelada';
      case 'em_andamento':
        return 'Em Andamento';
      default:
        return 'Sem Status';
    }
  };

  // Filter appointments
  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

    switch (filter) {
      case 'today':
        return appointmentDate >= startOfDay && appointmentDate <= endOfDay;
      case 'upcoming':
        return appointment.status === 'agendada' && appointmentDate > new Date();
      case 'completed':
        return appointment.status === 'realizada';
      default:
        return true;
    }
  });

  // Sort appointments by date
  const sortedAppointments = filteredAppointments.sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Consultas
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {sortedAppointments.length} de {appointments.length}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
          <button
            onClick={() => setFilter('upcoming')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === 'upcoming'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Próximas
          </button>
          <button
            onClick={() => setFilter('today')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === 'today'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Hoje
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === 'completed'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Realizadas
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === 'all'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Todas
          </button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="p-6">
        {sortedAppointments.length === 0 ? (
          <div className="text-center py-8">
            <svg className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {filter === 'today' && 'Nenhuma consulta para hoje'}
              {filter === 'upcoming' && 'Nenhuma consulta agendada'}
              {filter === 'completed' && 'Nenhuma consulta realizada'}
              {filter === 'all' && 'Nenhuma consulta encontrada'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedAppointments.map(appointment => {
              const appointmentDate = new Date(appointment.date);
              const isToday = appointmentDate.toDateString() === new Date().toDateString();
              const isUpcoming = appointmentDate > new Date() && appointment.status === 'agendada';

              return (
                <div
                  key={appointment.id}
                  className={`p-4 rounded-lg border transition-colors hover:shadow-sm ${
                    isToday 
                      ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
                      : isUpcoming
                      ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                      : 'border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getTypeIcon(appointment.type)}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900 dark:text-white truncate">
                            {appointment.patient.name || 'Paciente sem nome'}
                          </h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                            {formatStatusDisplay(appointment.status)}
                          </span>
                        </div>
                        
                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {formatDateTime(appointmentDate)}
                          </div>
                          
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            {formatTypeDisplay(appointment.type)}
                          </div>

                          {appointment.patient.phone && (
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              {appointment.patient.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      <Link
                        href={`/patients/${appointment.patient.id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400"
                        title="Ver paciente"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </Link>
                      
                      <button 
                        className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                        title="Editar consulta"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>

                      <button 
                        className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                        title="Mais opções"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {sortedAppointments.length > 0 && (
        <div className="px-6 pb-6">
          <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {filter === 'upcoming' && `${sortedAppointments.length} consultas agendadas`}
              {filter === 'today' && `${sortedAppointments.length} consultas hoje`}
              {filter === 'completed' && `${sortedAppointments.length} consultas realizadas`}
              {filter === 'all' && `${sortedAppointments.length} consultas no total`}
            </div>
            
            <Link
              href="/appointments/new"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
            >
              Nova Consulta →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsList;