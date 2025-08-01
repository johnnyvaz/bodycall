'use client';
import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, ScatterChart, Scatter, PieChart, Pie, Cell } from 'recharts';

interface ImcRecord {
  id: number;
  dateimc: Date;
  userid: number;
  sex: string | null;
  age: number | null;
  weight: number | null;
  height: number | null;
  neck: number | null;
  waist: number | null;
  belly: number | null;
  lowwaist: number | null;
  hip: number | null;
  pgc: number | null;
  category: string | null;
  gci: string | null;
  mgfm: number | null;
  mmlm: number | null;
  pgbmi: number | null;
  ica: number | null;
  user?: {
    id: number;
    name: string | null;
    email: string | null;
    functionName: string | null;
  } | null;
}

interface Client {
  id: number;
  name: string | null;
  email: string | null;
}

interface ImcReportsViewProps {
  records: ImcRecord[];
  clients: Client[];
}

type ChartType = 'line' | 'bar' | 'area' | 'scatter' | 'pie';
type MetricType = 'pgbmi' | 'weight' | 'pgc' | 'mgfm' | 'mmlm' | 'waist' | 'hip';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];

const ImcReportsView: React.FC<ImcReportsViewProps> = ({ records, clients }) => {
  const [selectedClient, setSelectedClient] = useState<number | 'all'>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [sexFilter, setSexFilter] = useState('all');
  const [ageRange, setAgeRange] = useState({ min: '', max: '' });
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [chartType, setChartType] = useState<ChartType>('line');
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('pgbmi');
  const [showComparison, setShowComparison] = useState(false);
  const [selectedClients, setSelectedClients] = useState<number[]>([]);

  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      // Filtro por cliente
      if (selectedClient !== 'all' && record.userid !== selectedClient) return false;
      
      // Filtro por data
      if (dateFrom && new Date(record.dateimc) < new Date(dateFrom)) return false;
      if (dateTo && new Date(record.dateimc) > new Date(dateTo)) return false;
      
      // Filtro por sexo
      if (sexFilter !== 'all' && record.sex !== sexFilter) return false;
      
      // Filtro por faixa etária
      if (ageRange.min && record.age && record.age < parseInt(ageRange.min)) return false;
      if (ageRange.max && record.age && record.age > parseInt(ageRange.max)) return false;
      
      // Filtro por categoria
      if (categoryFilter !== 'all' && record.category !== categoryFilter) return false;
      
      return true;
    });
  }, [records, selectedClient, dateFrom, dateTo, sexFilter, ageRange, categoryFilter]);

  const chartData = useMemo(() => {
    if (showComparison && selectedClients.length > 0) {
      // Dados para comparação entre clientes
      const comparisonData: Array<Record<string, string | number | null>> = [];
      
      selectedClients.forEach(clientId => {
        const clientRecords = filteredRecords
          .filter(record => record.userid === clientId)
          .sort((a, b) => new Date(a.dateimc).getTime() - new Date(b.dateimc).getTime());
          
        clientRecords.forEach((record, index) => {
          const client = clients.find(c => c.id === clientId);
          comparisonData.push({
            date: new Date(record.dateimc).toLocaleDateString('pt-BR'),
            [client?.name || `Cliente ${clientId}`]: record[selectedMetric],
            measurement: index + 1
          });
        });
      });
      
      return comparisonData;
    } else {
      // Dados normais ordenados por data
      return filteredRecords
        .sort((a, b) => new Date(a.dateimc).getTime() - new Date(b.dateimc).getTime())
        .map((record, index) => ({
          date: new Date(record.dateimc).toLocaleDateString('pt-BR'),
          value: record[selectedMetric],
          client: record.user?.name || 'Cliente sem nome',
          weight: record.weight,
          pgbmi: record.pgbmi,
          pgc: record.pgc,
          mgfm: record.mgfm,
          mmlm: record.mmlm,
          waist: record.waist,
          hip: record.hip,
          measurement: index + 1
        }));
    }
  }, [filteredRecords, selectedMetric, showComparison, selectedClients, clients]);

  const statisticsData = useMemo(() => {
    if (filteredRecords.length === 0) return null;
    
    const values = filteredRecords
      .map(record => record[selectedMetric])
      .filter(val => val !== null && val !== undefined) as number[];
    
    if (values.length === 0) return null;
    
    const sum = values.reduce((acc, val) => acc + val, 0);
    const avg = sum / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    // Variação (diferença entre último e primeiro registro)
    const sortedRecords = filteredRecords.sort((a, b) => new Date(a.dateimc).getTime() - new Date(b.dateimc).getTime());
    const firstValue = sortedRecords[0]?.[selectedMetric];
    const lastValue = sortedRecords[sortedRecords.length - 1]?.[selectedMetric];
    const variation = firstValue && lastValue ? lastValue - firstValue : 0;
    
    return { avg, min, max, count: values.length, variation };
  }, [filteredRecords, selectedMetric]);

  const metricLabels = {
    pgbmi: 'IMC (%)',
    weight: 'Peso (kg)',
    pgc: 'Gordura Corporal (%)',
    mgfm: 'Massa Gorda (kg)',
    mmlm: 'Massa Magra (kg)',
    waist: 'Cintura (cm)',
    hip: 'Quadril (cm)'
  };

  const renderChart = () => {
    if (chartData.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          Nenhum dado encontrado para os filtros selecionados
        </div>
      );
    }

    const commonProps = {
      data: chartData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'line':
        if (showComparison) {
          return (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart {...commonProps}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                {selectedClients.map((clientId, index) => {
                  const client = clients.find(c => c.id === clientId);
                  return (
                    <Line
                      key={clientId}
                      type="monotone"
                      dataKey={client?.name || `Cliente ${clientId}`}
                      stroke={COLORS[index % COLORS.length]}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          );
        }
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#0088FE" 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#FFBB28" 
                fill="#FFBB28" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="measurement" name="Medição" />
              <YAxis dataKey="value" name={metricLabels[selectedMetric]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter dataKey="value" fill="#FF8042" />
            </ScatterChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        // Para gráfico de pizza, vamos agrupar por categoria IMC
        const pieData = chartData.reduce((acc: Array<{name: string, value: number}>, record) => {
          const imcValue = typeof record.pgbmi === 'number' ? record.pgbmi : 0;
          let category = 'N/A';
          
          if (imcValue < 18.5) category = 'Abaixo do peso';
          else if (imcValue < 25) category = 'Normal';
          else if (imcValue < 30) category = 'Sobrepeso';
          else category = 'Obesidade';
          
          const existing = acc.find(item => item.name === category);
          if (existing) {
            existing.value += 1;
          } else {
            acc.push({ name: category, value: 1 });
          }
          return acc;
        }, []);
        
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  const clearFilters = () => {
    setSelectedClient('all');
    setDateFrom('');
    setDateTo('');
    setSexFilter('all');
    setAgeRange({ min: '', max: '' });
    setCategoryFilter('all');
    setShowComparison(false);
    setSelectedClients([]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Filtros */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Filtros e Configurações
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Cliente */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cliente
            </label>
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="all">Todos os clientes</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.name || `Cliente ${client.id}`}
                </option>
              ))}
            </select>
          </div>

          {/* Data Inicial */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Data Inicial
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            />
          </div>

          {/* Data Final */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Data Final
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            />
          </div>

          {/* Sexo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sexo
            </label>
            <select
              value={sexFilter}
              onChange={(e) => setSexFilter(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="all">Todos</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>
          </div>

          {/* Idade Mínima */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Idade Mínima
            </label>
            <input
              type="number"
              value={ageRange.min}
              onChange={(e) => setAgeRange(prev => ({ ...prev, min: e.target.value }))}
              placeholder="Ex: 18"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            />
          </div>

          {/* Idade Máxima */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Idade Máxima
            </label>
            <input
              type="number"
              value={ageRange.max}
              onChange={(e) => setAgeRange(prev => ({ ...prev, max: e.target.value }))}
              placeholder="Ex: 65"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            />
          </div>

          {/* Categoria IMC */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Categoria IMC
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="all">Todas</option>
              <option value="Abaixo do peso">Abaixo do peso</option>
              <option value="Normal">Normal</option>
              <option value="Sobrepeso">Sobrepeso</option>
              <option value="Obesidade">Obesidade</option>
            </select>
          </div>

          {/* Botão Limpar Filtros */}
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        {/* Configurações do Gráfico */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tipo de Gráfico */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tipo de Gráfico
            </label>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value as ChartType)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="line">Linha</option>
              <option value="bar">Barras</option>
              <option value="area">Área</option>
              <option value="scatter">Dispersão</option>
              <option value="pie">Pizza (Categorias IMC)</option>
            </select>
          </div>

          {/* Métrica */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Métrica
            </label>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value as MetricType)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              disabled={chartType === 'pie'}
            >
              <option value="pgbmi">IMC (%)</option>
              <option value="weight">Peso (kg)</option>
              <option value="pgc">Gordura Corporal (%)</option>
              <option value="mgfm">Massa Gorda (kg)</option>
              <option value="mmlm">Massa Magra (kg)</option>
              <option value="waist">Cintura (cm)</option>
              <option value="hip">Quadril (cm)</option>
            </select>
          </div>

          {/* Comparação entre Clientes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Comparação
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="comparison"
                checked={showComparison}
                onChange={(e) => setShowComparison(e.target.checked)}
                className="mr-2"
                disabled={chartType === 'pie'}
              />
              <label htmlFor="comparison" className="text-sm text-gray-700 dark:text-gray-300">
                Comparar clientes
              </label>
            </div>
          </div>
        </div>

        {/* Seleção de Clientes para Comparação */}
        {showComparison && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Selecionar Clientes para Comparação (máx. 5)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {clients.slice(0, 20).map(client => (
                <label key={client.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedClients.includes(client.id)}
                    onChange={(e) => {
                      if (e.target.checked && selectedClients.length < 5) {
                        setSelectedClients([...selectedClients, client.id]);
                      } else if (!e.target.checked) {
                        setSelectedClients(selectedClients.filter(id => id !== client.id));
                      }
                    }}
                    disabled={!selectedClients.includes(client.id) && selectedClients.length >= 5}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                    {client.name || `Cliente ${client.id}`}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Estatísticas */}
      {statisticsData && (
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Estatísticas - {metricLabels[selectedMetric]}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {statisticsData.count}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Registros</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {statisticsData.avg.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Média</div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {statisticsData.min.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Mínimo</div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {statisticsData.max.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Máximo</div>
            </div>
            <div className={`p-4 rounded-lg ${statisticsData.variation >= 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
              <div className={`text-2xl font-bold ${statisticsData.variation >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {statisticsData.variation > 0 ? '+' : ''}{statisticsData.variation.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Variação</div>
            </div>
          </div>
        </div>
      )}

      {/* Gráfico */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {chartType === 'pie' ? 'Distribuição por Categoria IMC' : `Evolução - ${metricLabels[selectedMetric]}`}
        </h3>
        {renderChart()}
      </div>
    </div>
  );
};

export default ImcReportsView;