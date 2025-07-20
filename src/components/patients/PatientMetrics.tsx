'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface PatientData {
  id: number;
  name: string | null;
}

interface IMCData {
  id: number;
  weight: number | null;
  height: number | null;
  pgbmi: number | null;
  dateimc: Date;
  age: number | null;
  pgc: number | null;
}

interface PatientMetricsProps {
  patient: PatientData;
  imcHistory: IMCData[];
}

const PatientMetrics: React.FC<PatientMetricsProps> = ({ imcHistory }) => {
  const latest = imcHistory[0];
  const previous = imcHistory[1];

  const calculateChange = (current: number | null, prev: number | null) => {
    if (!current || !prev) return null;
    const change = current - prev;
    return {
      value: change,
      percentage: ((change / prev) * 100)
    };
  };

  const weightChange = calculateChange(latest?.weight || null, previous?.weight || null);
  const imcChange = calculateChange(latest?.pgbmi || null, previous?.pgbmi || null);
  const bodyFatChange = calculateChange(latest?.pgc || null, previous?.pgc || null);

  const metrics = [
    {
      title: "Peso Atual",
      value: latest?.weight?.toFixed(1) || 'N/A',
      unit: 'kg',
      change: weightChange,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
      color: 'blue'
    },
    {
      title: "IMC",
      value: latest?.pgbmi?.toFixed(1) || 'N/A',
      unit: '',
      change: imcChange,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'green'
    },
    {
      title: "Altura",
      value: latest?.height ? (latest.height / 100).toFixed(2) : 'N/A',
      unit: 'm',
      change: null,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
        </svg>
      ),
      color: 'purple'
    },
    {
      title: "Gordura Corporal",
      value: latest?.pgc?.toFixed(1) || 'N/A',
      unit: '%',
      change: bodyFatChange,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      color: 'orange'
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

  const formatChangeIndicator = (change: { value: number; percentage: number } | null) => {
    if (!change) return null;
    
    const isPositive = change.value > 0;
    const isNegative = change.value < 0;
    
    return (
      <div className={`flex items-center text-xs ${
        isPositive ? 'text-red-600 dark:text-red-400' : 
        isNegative ? 'text-green-600 dark:text-green-400' : 
        'text-gray-500 dark:text-gray-400'
      }`}>
        {isPositive && (
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        )}
        {isNegative && (
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        )}
        {Math.abs(change.value).toFixed(1)} ({Math.abs(change.percentage).toFixed(1)}%)
      </div>
    );
  };

  // Prepare chart data
  const chartData = imcHistory.slice(0, 10).reverse().map(record => ({
    date: new Intl.DateTimeFormat('pt-BR', { 
      day: '2-digit', 
      month: '2-digit' 
    }).format(new Date(record.dateimc)),
    weight: record.weight || 0,
    imc: record.pgbmi || 0,
    bodyFat: record.pgc || 0
  }));

  const chartOptions = {
    chart: {
      type: 'line' as const,
      height: 300,
      toolbar: { show: false },
    },
    colors: ['#3B82F6', '#10B981', '#F59E0B'],
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth' as const,
      width: 3,
    },
    xaxis: {
      categories: chartData.map(d => d.date),
      labels: {
        style: { colors: '#6B7280' },
      },
    },
    yaxis: [
      {
        title: { text: 'Peso (kg)', style: { color: '#6B7280' } },
        labels: { style: { colors: '#6B7280' } },
      },
      {
        opposite: true,
        title: { text: 'IMC / Gordura (%)', style: { color: '#6B7280' } },
        labels: { style: { colors: '#6B7280' } },
      }
    ],
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 4,
    },
    legend: {
      position: 'top' as const,
      labels: { colors: '#6B7280' },
    },
    tooltip: { theme: 'light' },
  };

  const chartSeries = [
    {
      name: 'Peso (kg)',
      data: chartData.map(d => d.weight),
      yAxisIndex: 0,
    },
    {
      name: 'IMC',
      data: chartData.map(d => d.imc),
      yAxisIndex: 1,
    },
    {
      name: 'Gordura Corporal (%)',
      data: chartData.map(d => d.bodyFat),
      yAxisIndex: 1,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Métricas Atuais
        </h3>
      </div>

      <div className="p-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => {
            const colorClasses = getColorClasses(metric.color);
            
            return (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${colorClasses.bg}`}>
                    <div className={colorClasses.icon}>
                      {metric.icon}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {metric.title}
                  </h4>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {metric.value}
                    </span>
                    {metric.unit && (
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {metric.unit}
                      </span>
                    )}
                  </div>
                  {formatChangeIndicator(metric.change)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Evolution Chart */}
        {chartData.length > 1 && (
          <div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Evolução (Últimos 10 registros)
            </h4>
            <div className="h-80">
              <Chart
                options={chartOptions}
                series={chartSeries}
                type="line"
                height="100%"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientMetrics;