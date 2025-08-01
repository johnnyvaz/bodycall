'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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

interface ImcTableProps {
  records: ImcRecord[];
}

const ImcTable: React.FC<ImcTableProps> = ({ records }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sexFilter, setSexFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [celebratingRows, setCelebratingRows] = useState<Set<number>>(new Set());

  // Simular loading para mostrar skeleton
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleCelebrate = (recordId: number) => {
    setCelebratingRows(prev => new Set(prev).add(recordId));
    setTimeout(() => {
      setCelebratingRows(prev => {
        const newSet = new Set(prev);
        newSet.delete(recordId);
        return newSet;
      });
    }, 600);
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.id.toString().includes(searchTerm);
    
    const matchesSex = sexFilter === 'all' || record.sex === sexFilter;
    const matchesCategory = categoryFilter === 'all' || record.category === categoryFilter;
    
    return matchesSearch && matchesSex && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + recordsPerPage);

  // Get unique categories for filter
  const categories = [...new Set(records.map(r => r.category).filter(Boolean))];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
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

  const exportData = () => {
    // Create CSV content
    const headers = [
      'ID', 'Data', 'Usuário', 'Sexo', 'Idade', 'Peso', 'Altura', 'Pescoço', 
      'Cintura', 'Barriga', 'Cintura Baixa', 'Quadril', 'Gordura Corporal %', 
      'Gordura Ideal %', 'Massa Corporal (FM) kg', 'Massa Magra (LM) kg', 
      'Massa Magra %', 'Gordura Corporal (BMI) %', 'ICA', 'Categoria'
    ];
    
    const csvContent = [
      headers.join(','),
      ...filteredRecords.map(record => [
        record.id,
        formatDate(record.dateimc),
        record.user?.name || 'N/A',
        record.sex || 'N/A',
        record.age || 'N/A',
        record.weight || 'N/A',
        record.height || 'N/A',
        record.neck || 'N/A',
        record.waist || 'N/A',
        record.belly || 'N/A',
        record.lowwaist || 'N/A',
        record.hip || 'N/A',
        record.pgc || 'N/A',
        record.gci || 'N/A',
        record.mgfm || 'N/A',
        record.mmlm || 'N/A',
        record.mmlm ? ((record.mmlm / (record.weight || 1)) * 100).toFixed(1) : 'N/A',
        record.pgbmi || 'N/A',
        record.ica || 'N/A',
        record.category || 'N/A'
      ].join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `registros_imc_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 mb-4">
              <div className="skeleton h-4 w-16 rounded"></div>
              <div className="skeleton h-4 w-24 rounded"></div>
              <div className="flex-1">
                <div className="skeleton h-4 w-48 mb-2 rounded"></div>
                <div className="skeleton h-3 w-32 rounded"></div>
              </div>
              <div className="skeleton h-4 w-12 rounded"></div>
              <div className="skeleton h-4 w-16 rounded"></div>
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
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar por ID, nome ou email... 🔍"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus hover-glow"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={sexFilter}
              onChange={(e) => setSexFilter(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="all">Todos os sexos</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="all">Todas as categorias</option>
              {categories.map(category => (
                <option key={category} value={category || ''}>{category}</option>
              ))}
            </select>

            <select
              value={recordsPerPage}
              onChange={(e) => {
                setRecordsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value={10}>10 registros</option>
              <option value={25}>25 registros</option>
              <option value={50}>50 registros</option>
              <option value={100}>100 registros</option>
            </select>

            <button
              onClick={exportData}
              className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center transform hover:scale-105 transition-all duration-200 hover:shadow-lg btn-playful"
              title="Exportar dados para planilha"
            >
              <svg className="w-4 h-4 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="group-hover:mr-1 transition-all duration-200">Exportar</span>
              <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">📄</span>
            </button>
            
            <div className="text-sm text-gray-600 dark:text-gray-400 animate-fade-in-delay">
              📈 {filteredRecords.length} de {records.length} registros
              {filteredRecords.length > 0 && (
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
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Usuário
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Sexo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Idade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Peso
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Altura
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                IMC
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Gordura %
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Categoria
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedRecords.length === 0 ? (
              <tr>
                <td colSpan={11} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center animate-pop-in">
                    <div className="animate-float mb-6">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-full flex items-center justify-center mb-4">
                          <span className="text-4xl animate-bounce-gentle" role="img" aria-label="procurando">
                            {searchTerm ? '🔍' : '📉'}
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
                      {searchTerm ? 'Nenhum registro por aqui!' : 'Seus dados estão esperando!'}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                      {searchTerm 
                        ? 'Que tal tentar outros termos? Os registros podem estar se escondendo!' 
                        : 'Comece a acompanhar a evolução corporal dos seus clientes criando o primeiro registro!'
                      }
                    </p>
                    {!searchTerm && (
                      <Link
                        href="/imc/new"
                        className="mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 hover:shadow-lg btn-playful"
                      >
                        <span className="mr-2">📈</span>
                        Criar Primeiro Registro
                        <span className="ml-2 animate-bounce-gentle">✨</span>
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              paginatedRecords.map((record) => {
                const imcStatus = getIMCStatus(record.pgbmi);
                
                return (
                  <tr key={record.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 hover-lift ${
                    celebratingRows.has(record.id) ? 'animate-celebrate' : ''
                  }`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      #{record.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {formatDate(record.dateimc)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {record.user?.name || 'Usuário não encontrado'}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {record.user?.email || 'Email não informado'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {record.sex || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {record.age ? `${record.age} anos` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {record.weight ? `${record.weight} kg` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {record.height ? `${record.height} cm` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {record.pgbmi?.toFixed(1) || 'N/A'}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(imcStatus.color)}`}>
                          {imcStatus.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {record.pgc ? `${record.pgc.toFixed(1)}%` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {record.category || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleCelebrate(record.id)}
                          className="inline-flex items-center px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:hover:bg-yellow-900/50 transition-all duration-200 hover:scale-105"
                          title="Celebrar progresso! 🎉"
                        >
                          <span>🎆</span>
                        </button>
                        <Link
                          href={`/imc/${record.id}`}
                          className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-all duration-200 hover:scale-105"
                          title="Ver detalhes completos"
                        >
                          <span className="mr-1">👁️</span>
                          Ver
                        </Link>
                        <Link
                          href={`/imc/${record.id}/edit`}
                          className="inline-flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-105"
                          title="Editar medidas"
                        >
                          <span className="mr-1">✏️</span>
                          Editar
                        </Link>
                        <button 
                          className="inline-flex items-center px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-all duration-200 hover:scale-105"
                          title="Remover registro (cuidado!)"
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

      {/* Pagination */}
      {filteredRecords.length > 0 && totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Mostrando {startIndex + 1} até {Math.min(startIndex + recordsPerPage, filteredRecords.length)} de {filteredRecords.length} registros
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 text-sm rounded ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próximo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImcTable;