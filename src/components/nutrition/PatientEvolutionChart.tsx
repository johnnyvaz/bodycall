'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const PatientEvolutionChart: React.FC = () => {
  const chartOptions = {
    chart: {
      type: 'line' as const,
      height: 350,
      toolbar: {
        show: false,
      },
    },
    colors: ['#3B82F6', '#10B981', '#F59E0B'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth' as const,
      width: 3,
    },
    xaxis: {
      categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      labels: {
        style: {
          colors: '#6B7280',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6B7280',
        },
      },
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 4,
    },
    legend: {
      position: 'top' as const,
      horizontalAlign: 'right' as const,
      labels: {
        colors: '#6B7280',
      },
    },
    tooltip: {
      theme: 'light',
    },
  };

  const chartSeries = [
    {
      name: 'Peso Médio (kg)',
      data: [75, 73, 71, 69, 67, 65],
    },
    {
      name: 'IMC Médio',
      data: [26.2, 25.8, 25.1, 24.6, 24.0, 23.5],
    },
    {
      name: 'Gordura Corporal (%)',
      data: [28, 26, 24, 22, 20, 18],
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Evolução dos Pacientes
          </h3>
          <div className="flex items-center space-x-2">
            <select className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option>Últimos 6 meses</option>
              <option>Último ano</option>
              <option>Todos os dados</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">-8.5kg</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Perda média de peso</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">-2.7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Redução média IMC</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">-10%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Redução gordura corporal</div>
          </div>
        </div>

        <div className="h-80">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="line"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default PatientEvolutionChart;