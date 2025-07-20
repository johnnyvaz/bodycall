import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PatientsTable from "@/components/patients/PatientsTable";

export const metadata: Metadata = {
  title: "Pacientes | BodyCal - Sistema de Gestão Nutricional",
  description: "Gestão de pacientes do sistema BodyCal",
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
    console.error('Erro ao buscar pacientes:', error);
    return [];
  }
}

export default async function PatientsPage() {
  const patients = await getPatients();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Pacientes
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie seus pacientes e acompanhe seu progresso
          </p>
        </div>
        <Link
          href="/patients/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium inline-flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo Paciente
        </Link>
      </div>

      <PatientsTable patients={patients} />
    </div>
  );
}