import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Registro IMC | BodyCal - Sistema de Gestão Nutricional",
  description: "Visualizar registro de IMC e composição corporal",
};

async function getImcRecord(id: number) {
  try {
    const record = await prisma.imcCollection.findUnique({
      where: { id }
    });

    if (!record) return null;

    // Get user data separately
    const user = await prisma.systemUser.findFirst({
      where: {
        id: record.userid,
        active: "Y"
      },
      select: {
        id: true,
        name: true,
        email: true,
        functionName: true,
        phone: true
      }
    });

    return {
      ...record,
      user
    };
  } catch (error) {
    console.error('Erro ao buscar registro IMC:', error);
    return null;
  }
}

export default async function ImcDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await params;
  const id = parseInt(idParam);
  
  if (isNaN(id)) {
    notFound();
  }

  const record = await getImcRecord(id);

  if (!record) {
    notFound();
  }

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
    if (imc < 25) return { status: 'Peso normal', color: 'green' };
    if (imc < 30) return { status: 'Sobrepeso', color: 'yellow' };
    if (imc < 35) return { status: 'Obesidade grau I', color: 'orange' };
    if (imc < 40) return { status: 'Obesidade grau II', color: 'red' };
    return { status: 'Obesidade grau III', color: 'red' };
  };

  const getStatusColor = (color: string) => {
    const colors = {
      gray: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
      red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  const imcStatus = getIMCStatus(record.pgbmi);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Registro IMC #{record.id}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Data: {formatDate(record.dateimc)}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href={`/imc/${record.id}/edit`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Editar
          </Link>
          <Link
            href="/imc"
            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium"
          >
            Voltar
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Informações do Usuário
          </h3>
          <div className="space-y-3">
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Nome</dt>
              <dd className="text-sm text-gray-900 dark:text-white">
                {record.user?.name || 'Usuário não encontrado'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
              <dd className="text-sm text-gray-900 dark:text-white">
                {record.user?.email || 'N/A'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Telefone</dt>
              <dd className="text-sm text-gray-900 dark:text-white">
                {record.user?.phone || 'N/A'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Função</dt>
              <dd className="text-sm text-gray-900 dark:text-white">
                {record.user?.functionName || 'N/A'}
              </dd>
            </div>
          </div>
        </div>

        {/* Basic Data */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Dados Básicos
          </h3>
          <div className="space-y-3">
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Sexo</dt>
              <dd className="text-sm text-gray-900 dark:text-white">
                {record.sex || 'N/A'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Idade</dt>
              <dd className="text-sm text-gray-900 dark:text-white">
                {record.age ? `${record.age} anos` : 'N/A'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Peso</dt>
              <dd className="text-sm text-gray-900 dark:text-white">
                {record.weight ? `${record.weight} kg` : 'N/A'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Altura</dt>
              <dd className="text-sm text-gray-900 dark:text-white">
                {record.height ? `${record.height} cm` : 'N/A'}
              </dd>
            </div>
          </div>
        </div>

        {/* IMC Status */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Status IMC
          </h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {record.pgbmi?.toFixed(1) || 'N/A'}
            </div>
            <div className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(imcStatus.color)}`}>
              {imcStatus.status}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Categoria: {record.category || 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* Body Measurements */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Medidas Corporais
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Pescoço</dt>
            <dd className="text-sm text-gray-900 dark:text-white">
              {record.neck ? `${record.neck} cm` : 'N/A'}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Cintura</dt>
            <dd className="text-sm text-gray-900 dark:text-white">
              {record.waist ? `${record.waist} cm` : 'N/A'}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Barriga</dt>
            <dd className="text-sm text-gray-900 dark:text-white">
              {record.belly ? `${record.belly} cm` : 'N/A'}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Cintura Baixa</dt>
            <dd className="text-sm text-gray-900 dark:text-white">
              {record.lowwaist ? `${record.lowwaist} cm` : 'N/A'}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Quadril</dt>
            <dd className="text-sm text-gray-900 dark:text-white">
              {record.hip ? `${record.hip} cm` : 'N/A'}
            </dd>
          </div>
        </div>
      </div>

      {/* Body Composition */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Composição Corporal
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Gordura Corporal</dt>
            <dd className="text-sm text-gray-900 dark:text-white">
              {record.pgc ? `${record.pgc.toFixed(1)}%` : 'N/A'}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Massa Gorda</dt>
            <dd className="text-sm text-gray-900 dark:text-white">
              {record.mgfm ? `${record.mgfm.toFixed(1)} kg` : 'N/A'}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Massa Magra</dt>
            <dd className="text-sm text-gray-900 dark:text-white">
              {record.mmlm ? `${record.mmlm.toFixed(1)} kg` : 'N/A'}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">ICA</dt>
            <dd className="text-sm text-gray-900 dark:text-white">
              {record.ica ? record.ica.toFixed(2) : 'N/A'}
            </dd>
          </div>
        </div>

        {record.gci && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Gordura Corporal Ideal</dt>
            <dd className="text-sm text-gray-900 dark:text-white">{record.gci}</dd>
          </div>
        )}
      </div>
    </div>
  );
}