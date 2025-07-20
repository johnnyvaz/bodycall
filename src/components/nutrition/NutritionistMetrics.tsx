'use client';
import React from 'react';

interface NutritionistMetricsProps {
  totalPatients: number;
  totalAppointments: number;
  activeMealPlans: number;
}

const NutritionistMetrics: React.FC<NutritionistMetricsProps> = ({
  totalPatients,
  totalAppointments,
  activeMealPlans
}) => {
  const metrics = [
    {
      title: "Total de Pacientes",
      value: totalPatients,
      color: "blue",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      change: "+12%",
      period: "vs mês anterior"
    },
    {
      title: "Consultas Agendadas",
      value: totalAppointments,
      color: "green",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      change: "+8%",
      period: "esta semana"
    },
    {
      title: "Planos Ativos",
      value: activeMealPlans,
      color: "purple",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      change: "+15%",
      period: "planos criados"
    },
    {
      title: "Taxa de Sucesso",
      value: 87,
      suffix: "%",
      color: "orange",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      change: "+3%",
      period: "metas atingidas"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: "bg-blue-50 dark:bg-blue-900/20",
        icon: "text-blue-600 dark:text-blue-400",
        text: "text-blue-600 dark:text-blue-400"
      },
      green: {
        bg: "bg-green-50 dark:bg-green-900/20",
        icon: "text-green-600 dark:text-green-400",
        text: "text-green-600 dark:text-green-400"
      },
      purple: {
        bg: "bg-purple-50 dark:bg-purple-900/20",
        icon: "text-purple-600 dark:text-purple-400",
        text: "text-purple-600 dark:text-purple-400"
      },
      orange: {
        bg: "bg-orange-50 dark:bg-orange-900/20",
        icon: "text-orange-600 dark:text-orange-400",
        text: "text-orange-600 dark:text-orange-400"
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const colorClasses = getColorClasses(metric.color);
        
        return (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${colorClasses.bg}`}>
                <div className={colorClasses.icon}>
                  {metric.icon}
                </div>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">
                {metric.change}
              </span>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {metric.title}
              </h3>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metric.value.toLocaleString()}
                </span>
                {metric.suffix && (
                  <span className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                    {metric.suffix}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {metric.period}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NutritionistMetrics;