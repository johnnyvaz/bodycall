import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PatientEditForm from "@/components/patients/PatientEditForm";

interface PatientEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PatientEditPageProps): Promise<Metadata> {
  const { id } = await params;
  const patient = await getPatientById(parseInt(id));
  
  if (!patient) {
    return {
      title: "Paciente não encontrado | BodyCal",
    };
  }

  return {
    title: `Editar ${patient.name || 'Paciente'} | BodyCal - Sistema de Gestão Nutricional`,
    description: `Editar informações do paciente ${patient.name}`,
  };
}

async function getPatientById(id: number) {
  try {
    const patient = await prisma.systemUser.findUnique({
      where: {
        id: id,
        functionName: "Paciente",
        active: "Y"
      }
    });

    if (!patient) return null;

    // Get latest IMC data
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
  } catch (error) {
    console.error('Erro ao buscar paciente:', error);
    return null;
  }
}

export default async function PatientEditPage({ params }: PatientEditPageProps) {
  const { id } = await params;
  const patientId = parseInt(id);
  
  if (isNaN(patientId)) {
    notFound();
  }

  const patient = await getPatientById(patientId);

  if (!patient) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Editar Paciente
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Atualize as informações de {patient.name || 'paciente'}
          </p>
        </div>
      </div>

      <PatientEditForm patient={patient} />
    </div>
  );
}