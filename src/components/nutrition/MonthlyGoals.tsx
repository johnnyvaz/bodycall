'use client';
import React from 'react';

const MonthlyGoals: React.FC = () => {
  const goals = [
    {
      title: "Novos Pacientes",
      current: 12,
      target: 15,
      percentage: 80,
      color: "blue"
    },
    {
      title: "Consultas Realizadas",
      current: 48,
      target: 60,
      percentage: 80,
      color: "green"
    },
    {
      title: "Planos Criados",
      current: 25,
      target: 30,
      percentage: 83,
      color: "purple"
    },
    {
      title: "Taxa de Aderência",
      current: 87,
      target: 90,
      percentage: 97,
      color: "orange",
      suffix: "%"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: "bg-blue-500",
        light: "bg-blue-100 dark:bg-blue-900/30",
        text: "text-blue-600 dark:text-blue-400"
      },
      green: {
        bg: "bg-green-500",
        light: "bg-green-100 dark:bg-green-900/30",
        text: "text-green-600 dark:text-green-400"
      },
      purple: {
        bg: "bg-purple-500",
        light: "bg-purple-100 dark:bg-purple-900/30",
        text: "text-purple-600 dark:text-purple-400"
      },
      orange: {
        bg: "bg-orange-500",
        light: "bg-orange-100 dark:bg-orange-900/30",
        text: "text-orange-600 dark:text-orange-400"
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Metas do Mês
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Julho 2025
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {goals.map((goal, index) => {
            const colorClasses = getColorClasses(goal.color);
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {goal.title}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {goal.current}{goal.suffix || ''} / {goal.target}{goal.suffix || ''}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${colorClasses.bg}`}
                    style={{ width: `${goal.percentage}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium ${colorClasses.text}`}>
                    {goal.percentage}% completo
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Faltam {goal.target - goal.current}{goal.suffix || ''}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Performance Geral
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Você está muito bem!
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                85%
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Metas atingidas
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyGoals;