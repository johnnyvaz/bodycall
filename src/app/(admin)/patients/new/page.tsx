import type { Metadata } from "next";
import React from "react";
import PatientCreateForm from "@/components/patients/PatientCreateForm";

export const metadata: Metadata = {
  title: "Novo Cliente | BodyCal - Sistema de Gestão Nutricional",
  description: "Cadastrar novo cliente no sistema BodyCal",
};

export default function NewPatientPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between animate-fade-in">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white animate-slide-up">
              Novo Cliente
            </h1>
            <div className="animate-bounce-gentle">
              <span className="text-2xl" role="img" aria-label="pessoa nova">
                🎆
              </span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 animate-slide-up-delay">
            🎉 Vamos dar as boas-vindas a mais um cliente incrível! Cada jornada de transformação começa com o primeiro passo.
          </p>
        </div>
      </div>

      <PatientCreateForm />
    </div>
  );
}