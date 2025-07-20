'use client';
import React from 'react';

const WeeklySchedule: React.FC = () => {
  const currentWeek = [
    {
      day: 'Segunda',
      date: '22/07',
      appointments: [
        { time: '09:00', patient: 'Maria Silva', type: 'Primeira consulta' },
        { time: '10:30', patient: 'João Santos', type: 'Retorno' },
        { time: '14:00', patient: 'Ana Costa', type: 'Retorno' },
      ]
    },
    {
      day: 'Terça',
      date: '23/07',
      appointments: [
        { time: '08:30', patient: 'Pedro Lima', type: 'Online' },
        { time: '11:00', patient: 'Carla Oliveira', type: 'Primeira consulta' },
      ]
    },
    {
      day: 'Quarta',
      date: '24/07',
      appointments: [
        { time: '09:30', patient: 'Roberto Alves', type: 'Retorno' },
        { time: '13:30', patient: 'Lucia Fernandes', type: 'Retorno' },
        { time: '15:00', patient: 'Marcos Pereira', type: 'Online' },
      ]
    },
    {
      day: 'Quinta',
      date: '25/07',
      appointments: [
        { time: '10:00', patient: 'Sandra Ribeiro', type: 'Primeira consulta' },
        { time: '16:00', patient: 'Felipe Castro', type: 'Retorno' },
      ]
    },
    {
      day: 'Sexta',
      date: '26/07',
      appointments: [
        { time: '09:00', patient: 'Camila Souza', type: 'Retorno' },
        { time: '11:30', patient: 'Diego Martins', type: 'Online' },
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Primeira consulta':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Retorno':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Online':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const today = new Date().getDay(); // 0 = domingo, 1 = segunda, etc.
  const todayIndex = today === 0 ? 6 : today - 1; // Ajustar para começar na segunda

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Agenda da Semana
          </h3>
          <div className="flex items-center space-x-2">
            <button className="p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              22-26 Jul, 2025
            </span>
            <button className="p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {currentWeek.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className={`space-y-2 ${
                dayIndex === todayIndex 
                  ? 'bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800' 
                  : ''
              }`}
            >
              <div className="text-center">
                <div className={`text-sm font-medium ${
                  dayIndex === todayIndex 
                    ? 'text-blue-700 dark:text-blue-300' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {day.day}
                </div>
                <div className={`text-xs ${
                  dayIndex === todayIndex 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {day.date}
                </div>
              </div>
              
              <div className="space-y-2">
                {day.appointments.length === 0 ? (
                  <div className="text-center py-4">
                    <div className="text-xs text-gray-400 dark:text-gray-600">
                      Nenhuma consulta
                    </div>
                  </div>
                ) : (
                  day.appointments.map((appointment, index) => (
                    <div
                      key={index}
                      className="p-2 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 shadow-sm"
                    >
                      <div className="text-xs font-medium text-gray-900 dark:text-white mb-1">
                        {appointment.time}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        {appointment.patient}
                      </div>
                      <span className={`inline-block px-1.5 py-0.5 text-xs rounded ${getTypeColor(appointment.type)}`}>
                        {appointment.type}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-600 dark:text-gray-400">
              Total de consultas esta semana: <span className="font-medium text-gray-900 dark:text-white">12</span>
            </div>
            <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
              Ver agenda completa →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklySchedule;