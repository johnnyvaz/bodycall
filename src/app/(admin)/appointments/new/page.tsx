import type { Metadata } from "next";
import React from "react";
import { prisma } from "@/lib/prisma";
import AppointmentCreateForm from "@/components/appointments/AppointmentCreateForm";

export const metadata: Metadata = {
  title: "Nova Consulta | BodyCal - Sistema de Gestão Nutricional",
  description: "Agendar nova consulta no sistema BodyCal",
};

async function getPatients() {
  try {
    const patients = await prisma.systemUser.findMany({
      where: {
        functionName: "Paciente",
        active: "Y"
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true
      },
      orderBy: {
        name: 'asc'
      }
    });

    return patients;
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error);
    return [];
  }
}

export default async function NewAppointmentPage() {
  const patients = await getPatients();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Nova Consulta
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Agende uma nova consulta para um paciente
          </p>
        </div>
      </div>

      <AppointmentCreateForm patients={patients} />
    </div>
  );
}