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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Registros IMC
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie os dados de composição corporal e IMC dos usuários
          </p>
        </div>
        <Link
          href="/imc/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium inline-flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo Registro
        </Link>
      </div>

      <ImcTable records={records} />
    </div>
  );
}