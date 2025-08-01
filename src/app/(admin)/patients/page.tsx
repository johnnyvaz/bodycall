import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PatientsTable from "@/components/patients/PatientsTable";

export const metadata: Metadata = {
  title: "Clientes | BodyCal - Sistema de Gestão Nutricional",
  description: "Gestão de clientes do sistema BodyCal",
};

async function getPatients() {
  try {
    const patients = await prisma.systemUser.findMany({
      where: {
        functionName: "Paciente",
        active: "Y"
      },
      orderBy: {
        name: 'asc'
      },
      include: {
        patientAppointments: {
          where: {
            status: "agendada"
          },
          orderBy: {
            date: 'asc'
          },
          take: 1
        }
      }
    });

    // Get IMC data separately for each patient
    const patientsWithIMC = await Promise.all(
      patients.map(async (patient) => {
        const latestIMC = await prisma.imcCollection.findFirst({
          where: {
            userid: patient.id
          },
          orderBy: {
            dateimc: 'desc'
          }
        });

        return {
          ...patient,
          latestIMC
        };
      })
    );

    return patientsWithIMC;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    return [];
  }
}

export default async function PatientsPage() {
  const patients = await getPatients();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between animate-fade-in">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white animate-slide-up">
              Seus Clientes
            </h1>
            <div className="animate-bounce-gentle">
              <span className="text-2xl" role="img" aria-label="pessoas">
                👥
              </span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 animate-slide-up-delay">
            {patients.length === 0 
              ? "Que tal adicionar seu primeiro cliente? A jornada de transformação começa aqui!" 
              : `Acompanhe o progresso de ${patients.length} ${patients.length === 1 ? 'cliente' : 'clientes'} incríveis`
            }
          </p>
        </div>
        <Link
          href="/patients/new"
          className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium inline-flex items-center transform hover:scale-105 transition-all duration-200 hover:shadow-lg animate-fade-in-delay"
        >
          <svg className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="group-hover:mr-1 transition-all duration-200">Novo Cliente</span>
          <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">✨</span>
        </Link>
      </div>

      <PatientsTable patients={patients} />
    </div>
  );
}