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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Novo Cliente
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Cadastre um novo cliente no sistema
          </p>
        </div>
      </div>

      <PatientCreateForm />
    </div>
  );
}