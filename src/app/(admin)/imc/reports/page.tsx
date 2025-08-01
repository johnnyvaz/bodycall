import type { Metadata } from "next";
import React from "react";
import { prisma } from "@/lib/prisma";
import ImcReportsView from "@/components/imc/ImcReportsView";

export const metadata: Metadata = {
  title: "Relatórios IMC | BodyCal - Sistema de Gestão Nutricional",
  description: "Relatórios de evolução e análise dos dados de composição corporal",
};

async function getReportsData() {
  try {
    // Buscar todos os registros IMC com dados dos usuários
    const records = await prisma.imcCollection.findMany({
      orderBy: {
        dateimc: 'desc'
      }
    });

    // Buscar usuários (clientes) para o filtro
    const clients = await prisma.systemUser.findMany({
      where: {
        functionName: "Paciente",
        active: "Y"
      },
      select: {
        id: true,
        name: true,
        email: true
      },
      orderBy: {
        name: 'asc'
      }
    });

    // Combinar registros com dados dos usuários
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

    // Filtrar apenas registros com usuários válidos
    const validRecords = recordsWithUsers.filter(record => record.user);

    return {
      records: validRecords,
      clients
    };
  } catch (error) {
    console.error('Erro ao buscar dados dos relatórios:', error);
    return {
      records: [],
      clients: []
    };
  }
}

export default async function ImcReportsPage() {
  const { records, clients } = await getReportsData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Relatórios de Evolução IMC
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Análise completa da evolução da composição corporal dos clientes
          </p>
        </div>
      </div>

      <ImcReportsView records={records} clients={clients} />
    </div>
  );
}