import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PatientHeader from "@/components/patients/PatientHeader";
import PatientMetrics from "@/components/patients/PatientMetrics";
import PatientHistory from "@/components/patients/PatientHistory";
import PatientAppointments from "@/components/patients/PatientAppointments";

interface PatientPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PatientPageProps): Promise<Metadata> {
  const { id } = await params;
  const patient = await getPatientById(parseInt(id));
  
  if (!patient) {
    return {
      title: "Paciente não encontrado | BodyCal",
    };
  }

  return {
    title: `${patient.name || 'Paciente'} | BodyCal - Sistema de Gestão Nutricional`,
    description: `Detalhes e histórico do paciente ${patient.name}`,
  };
}

async function getPatientById(id: number) {
  try {
    const patient = await prisma.systemUser.findUnique({
      where: {
        id: id,
        functionName: "Paciente",
        active: "Y"
      },
      include: {
        patientAppointments: {
          orderBy: {
            date: 'desc'
          },
          take: 10
        }
      }
    });

    if (!patient) return null;

    // Get IMC history
    const imcHistory = await prisma.imcCollection.findMany({
      where: {
        userid: patient.id
      },
      orderBy: {
        dateimc: 'desc'
      },
      take: 20
    });

    // Get meal plans
    const mealPlans = await prisma.mealPlan.findMany({
      where: {
        patientId: patient.id
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 5
    });

    return {
      ...patient,
      imcHistory,
      mealPlans
    };
  } catch (error) {
    console.error('Erro ao buscar paciente:', error);
    return null;
  }
}

export default async function PatientDetailPage({ params }: PatientPageProps) {
  const { id } = await params;
  const patientId = parseInt(id);
  
  if (isNaN(patientId)) {
    notFound();
  }

  const patient = await getPatientById(patientId);

  if (!patient) {
    notFound();
  }

  const latestIMC = patient.imcHistory[0];
  const nextAppointment = patient.patientAppointments.find(
    app => app.status === 'agendada' && new Date(app.date) > new Date()
  );

  return (
    <div className="space-y-6">
      <PatientHeader 
        patient={patient}
        latestIMC={latestIMC}
        nextAppointment={nextAppointment}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PatientMetrics 
            patient={patient}
            imcHistory={patient.imcHistory}
          />
          
          <PatientHistory 
            imcHistory={patient.imcHistory}
          />
        </div>
        
        <div className="space-y-6">
          <PatientAppointments 
            appointments={patient.patientAppointments}
            patientId={patient.id}
          />
        </div>
      </div>
    </div>
  );
}