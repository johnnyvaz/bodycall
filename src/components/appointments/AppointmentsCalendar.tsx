'use client';
import React, { useState } from 'react';

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

interface AppointmentsCalendarProps {
  appointments: AppointmentData[];
}

const AppointmentsCalendar: React.FC<AppointmentsCalendarProps> = ({ appointments }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  };

  const getDayName = (dayIndex: number) => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return days[dayIndex];
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get appointments for a specific date
  const getAppointmentsForDate = (date: Date) => {
    const dateStr = date.toDateString();
    return appointments.filter(apt => 
      new Date(apt.date).toDateString() === dateStr
    );
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
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

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayAppointments = getAppointmentsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();

      days.push({
        date,
        day,
        appointments: dayAppointments,
        isToday
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Calendar Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
            {getMonthName(currentDate)}
          </h2>
          
          <div className="flex items-center space-x-2">
            {/* View Selector */}
            <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg">
              <button
                onClick={() => setView('month')}
                className={`px-3 py-1 text-sm font-medium rounded-l-lg ${
                  view === 'month'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Mês
              </button>
              <button
                onClick={() => setView('week')}
                className={`px-3 py-1 text-sm font-medium border-l border-gray-300 dark:border-gray-600 ${
                  view === 'week'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Semana
              </button>
              <button
                onClick={() => setView('day')}
                className={`px-3 py-1 text-sm font-medium rounded-r-lg border-l border-gray-300 dark:border-gray-600 ${
                  view === 'day'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Dia
              </button>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={goToToday}
                className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                Hoje
              </button>
              
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="p-6">
        {view === 'month' ? (
          <>
            {/* Days of Week Header */}
            <div className="grid grid-cols-7 mb-2">
              {[0, 1, 2, 3, 4, 5, 6].map(dayIndex => (
                <div key={dayIndex} className="p-2 text-center">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {getDayName(dayIndex)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`min-h-24 p-1 border border-gray-100 dark:border-gray-700 rounded ${
                    day ? 'bg-white dark:bg-gray-800' : ''
                  }`}
                >
                  {day && (
                    <div className="h-full">
                      <div className={`text-sm font-medium mb-1 ${
                        day.isToday 
                          ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {day.day}
                      </div>
                      
                      <div className="space-y-1">
                        {day.appointments.slice(0, 2).map(appointment => (
                          <div
                            key={appointment.id}
                            className={`text-xs p-1 rounded truncate cursor-pointer hover:shadow-sm ${getStatusColor(appointment.status)}`}
                            title={`${formatTime(new Date(appointment.date))} - ${appointment.patient.name}`}
                          >
                            <div className="font-medium">
                              {formatTime(new Date(appointment.date))}
                            </div>
                            <div className="truncate">
                              {appointment.patient.name}
                            </div>
                          </div>
                        ))}
                        
                        {day.appointments.length > 2 && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            +{day.appointments.length - 2} mais
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              Visualização {view === 'week' ? 'semanal' : 'diária'} em desenvolvimento
            </p>
            <button 
              onClick={() => setView('month')}
              className="mt-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Voltar para visualização mensal
            </button>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="px-6 pb-6">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-100 dark:bg-blue-900/30 rounded mr-2"></div>
            <span className="text-gray-600 dark:text-gray-400">Agendada</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-100 dark:bg-green-900/30 rounded mr-2"></div>
            <span className="text-gray-600 dark:text-gray-400">Realizada</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-100 dark:bg-yellow-900/30 rounded mr-2"></div>
            <span className="text-gray-600 dark:text-gray-400">Em andamento</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-100 dark:bg-red-900/30 rounded mr-2"></div>
            <span className="text-gray-600 dark:text-gray-400">Cancelada</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsCalendar;