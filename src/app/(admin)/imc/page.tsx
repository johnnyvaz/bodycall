import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ImcTable from "@/components/imc/ImcTable";

export const metadata: Metadata = {
  title: "Registros IMC | BodyCal - Sistema de Gestão Nutricional",
  description: "Gestão de registros de IMC e composição corporal",
};

async function getImcRecords() {
  try {
    const records = await prisma.imcCollection.findMany({
      orderBy: {
        dateimc: 'desc'
      },
    });

    // Get user data separately since there's no direct relation
    const recordsWithUsers = await Promise.all(
      records.map(async (record) => {
        const user = await prisma.systemUser.findFirst({
          where: {
            id: record.userid,
            active: "Y"
          },
          select: {
            id: true,
            name: true,
            email: true,
            functionName: true
          }
        });

        return {
          ...record,
          user
        };
      })
    );

    return recordsWithUsers;
  } catch (error) {
    console.error('Erro ao buscar registros de IMC:', error);
    return [];
  }
}

export default async function ImcPage() {
  const records = await getImcRecords();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between animate-fade-in">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white animate-slide-up">
              Registros IMC
            </h1>
            <div className="animate-bounce-gentle">
              <span className="text-2xl" role="img" aria-label="balança">
                ⚖️
              </span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 animate-slide-up-delay">
            {records.length === 0 
              ? "📈 Pronto para começar a acompanhar as transformações? Vamos registrar as primeiras medidas!" 
              : `💪 Acompanhando ${records.length} ${records.length === 1 ? 'registro' : 'registros'} de evolução corporal`
            }
          </p>
        </div>
        <Link
          href="/imc/new"
          className="group bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium inline-flex items-center transform hover:scale-105 transition-all duration-200 hover:shadow-lg animate-fade-in-delay"
        >
          <svg className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="group-hover:mr-1 transition-all duration-200">Novo Registro</span>
          <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">📉</span>
        </Link>
      </div>

      <ImcTable records={records} />
    </div>
  );
}