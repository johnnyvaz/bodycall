'use client';
import React, { useState } from 'react';

interface IMCData {
  id: number;
  weight: number | null;
  height: number | null;
  pgbmi: number | null;
  dateimc: Date;
  age: number | null;
  pgc: number | null;
  category: string | null;
  neck: number | null;
  waist: number | null;
  hip: number | null;
}

interface PatientHistoryProps {
  imcHistory: IMCData[];
}

const PatientHistory: React.FC<PatientHistoryProps> = ({ imcHistory }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedHistory = showAll ? imcHistory : imcHistory.slice(0, 5);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const getIMCStatus = (imc: number | null) => {
    if (!imc) return { status: 'N/A', color: 'gray' };
    
    if (imc < 18.5) return { status: 'Abaixo do peso', color: 'blue' };
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

  const calculateChange = (current: number | null, previous: number | null) => {
    if (!current || !previous) return null;
    const change = current - previous;
    const isPositive = change > 0;
    return {
      value: change,
      isPositive,
      className: isPositive ? 'text-red-600' : 'text-green-600'
    };
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Histórico de Medições
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {imcHistory.length} registros
          </div>
        </div>
      </div>

      <div className="p-6">
        {imcHistory.length === 0 ? (
          <div className="text-center py-8">
            <svg className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-gray-500 dark:text-gray-400">
              Nenhuma medição registrada
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedHistory.map((record, index) => {
              const previousRecord = index < imcHistory.length - 1 ? imcHistory[index + 1] : null;
              const weightChange = calculateChange(record.weight, previousRecord?.weight || null);
              const imcChange = calculateChange(record.pgbmi, previousRecord?.pgbmi || null);
              const imcStatus = getIMCStatus(record.pgbmi);

              return (
                <div
                  key={record.id}
                  className={`p-4 rounded-lg border-2 ${
                    index === 0 
                      ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20' 
                      : 'border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatDate(record.dateimc)}
                      </div>
                      {index === 0 && (
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                          Mais recente
                        </span>
                      )}
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(imcStatus.color)}`}>
                      {imcStatus.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Peso */}
                    <div className="space-y-1">
                      <div className="text-xs text-gray-600 dark:text-gray-400">Peso</div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {record.weight?.toFixed(1) || 'N/A'} kg
                        </span>
                        {weightChange && (
                          <span className={`text-xs ${weightChange.className}`}>
                            {weightChange.isPositive ? '+' : ''}{weightChange.value.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* IMC */}
                    <div className="space-y-1">
                      <div className="text-xs text-gray-600 dark:text-gray-400">IMC</div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {record.pgbmi?.toFixed(1) || 'N/A'}
                        </span>
                        {imcChange && (
                          <span className={`text-xs ${imcChange.className}`}>
                            {imcChange.isPositive ? '+' : ''}{imcChange.value.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Altura */}
                    <div className="space-y-1">
                      <div className="text-xs text-gray-600 dark:text-gray-400">Altura</div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {record.height ? (record.height / 100).toFixed(2) : 'N/A'} m
                      </span>
                    </div>

                    {/* Gordura Corporal */}
                    <div className="space-y-1">
                      <div className="text-xs text-gray-600 dark:text-gray-400">Gordura Corporal</div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {record.pgc?.toFixed(1) || 'N/A'}%
                      </span>
                    </div>
                  </div>

                  {/* Medidas corporais expandidas */}
                  {(record.neck || record.waist || record.hip) && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                      <div className="grid grid-cols-3 gap-4 text-xs">
                        {record.neck && (
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Pescoço:</span>
                            <span className="ml-1 text-gray-900 dark:text-white">{record.neck} cm</span>
                          </div>
                        )}
                        {record.waist && (
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Cintura:</span>
                            <span className="ml-1 text-gray-900 dark:text-white">{record.waist} cm</span>
                          </div>
                        )}
                        {record.hip && (
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Quadril:</span>
                            <span className="ml-1 text-gray-900 dark:text-white">{record.hip} cm</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Show More/Less Button */}
            {imcHistory.length > 5 && (
              <div className="text-center pt-4">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                >
                  {showAll ? 'Mostrar menos' : `Mostrar todos (${imcHistory.length - 5} mais)`}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientHistory;