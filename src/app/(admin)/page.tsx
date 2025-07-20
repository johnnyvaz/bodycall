import type { Metadata } from "next";
import React from "react";
import { prisma } from "@/lib/prisma";
import NutritionistMetrics from "@/components/nutrition/NutritionistMetrics";
import RecentAppointments from "@/components/nutrition/RecentAppointments";
import PatientEvolutionChart from "@/components/nutrition/PatientEvolutionChart";
import MonthlyGoals from "@/components/nutrition/MonthlyGoals";
import WeeklySchedule from "@/components/nutrition/WeeklySchedule";

export const metadata: Metadata = {
  title: "Dashboard Nutricionista | BodyCal - Sistema de Gestão Nutricional",
  description: "Dashboard principal para nutricionistas do sistema BodyCal",
};

async function getDashboardData() {
  try {
    // Buscar dados básicos para o dashboard
    const totalPatients = await prisma.systemUser.count({
      where: {
        functionName: "Paciente",
        active: "Y"
      }
    });

    const totalAppointments = await prisma.appointment.count({
      where: {
        status: "agendada"
      }
    });

    const recentAppointments = await prisma.appointment.findMany({
      take: 5,
      orderBy: {
        date: 'desc'
      },
      include: {
        patient: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    const activeMealPlans = await prisma.mealPlan.count({
      where: {
        active: "Y"
      }
    });

    return {
      totalPatients,
      totalAppointments,
      recentAppointments,
      activeMealPlans
    };
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error);
    return {
      totalPatients: 0,
      totalAppointments: 0,
      recentAppointments: [],
      activeMealPlans: 0
    };
  }
}

export default async function NutritionistDashboard() {
  const dashboardData = await getDashboardData();

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* Métricas Principais */}
      <div className="col-span-12">
        <NutritionistMetrics 
          totalPatients={dashboardData.totalPatients}
          totalAppointments={dashboardData.totalAppointments}
          activeMealPlans={dashboardData.activeMealPlans}
        />
      </div>

      {/* Gráfico de Evolução dos Pacientes */}
      <div className="col-span-12 xl:col-span-8">
        <PatientEvolutionChart />
      </div>

      {/* Metas Mensais */}
      <div className="col-span-12 xl:col-span-4">
        <MonthlyGoals />
      </div>

      {/* Agenda da Semana */}
      <div className="col-span-12 xl:col-span-7">
        <WeeklySchedule />
      </div>

      {/* Consultas Recentes */}
      <div className="col-span-12 xl:col-span-5">
        <RecentAppointments appointments={dashboardData.recentAppointments} />
      </div>
    </div>
  );
}
