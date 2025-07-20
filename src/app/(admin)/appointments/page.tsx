import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AppointmentsCalendar from "@/components/appointments/AppointmentsCalendar";
import AppointmentsList from "@/components/appointments/AppointmentsList";

export const metadata: Metadata = {
  title: "Consultas | BodyCal - Sistema de Gestão Nutricional",
  description: "Gestão de consultas e agenda do sistema BodyCal",
};

async function getAppointments() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: {
        date: 'asc'
      },
      include: {
        patient: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        }
      }
    });

    return appointments;
  } catch (error) {
    console.error('Erro ao buscar consultas:', error);
    return [];
  }
}

async function getAppointmentStats() {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
    
    const [
      totalScheduled,
      todayAppointments,
      pendingAppointments,
      completedAppointments
    ] = await Promise.all([
      prisma.appointment.count({
        where: {
          status: 'agendada'
        }
      }),
      prisma.appointment.count({
        where: {
          date: {
            gte: startOfDay,
            lte: endOfDay
          },
          status: 'agendada'
        }
      }),
      prisma.appointment.count({
        where: {
          status: 'agendada',
          date: {
            gte: new Date()
          }
        }
      }),
      prisma.appointment.count({
        where: {
          status: 'realizada'
        }
      })
    ]);

    return {
      totalScheduled,
      todayAppointments,
      pendingAppointments,
      completedAppointments
    };
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return {
      totalScheduled: 0,
      todayAppointments: 0,
      pendingAppointments: 0,
      completedAppointments: 0
    };
  }
}

export default async function AppointmentsPage() {
  const [appointments, stats] = await Promise.all([
    getAppointments(),
    getAppointmentStats()
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Consultas
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie sua agenda e consultas
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/appointments/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nova Consulta
          </Link>
          <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg font-medium inline-flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Hoje
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Agendadas</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalScheduled}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Hoje</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.todayAppointments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Pendentes</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pendingAppointments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Realizadas</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completedAppointments}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="xl:col-span-2">
          <AppointmentsCalendar appointments={appointments} />
        </div>
        
        {/* Appointments List */}
        <div>
          <AppointmentsList appointments={appointments} />
        </div>
      </div>
    </div>
  );
}