import type { Metadata } from "next";
import React from "react";
import { prisma } from "@/lib/prisma";
import ImcForm from "@/components/imc/ImcForm";

export const metadata: Metadata = {
  title: "Novo Registro IMC | BodyCal - Sistema de Gestão Nutricional",
  description: "Cadastrar novo registro de IMC e composição corporal",
};

async function getUsers() {
  try {
    const users = await prisma.systemUser.findMany({
      where: {
        active: "Y"
      },
      select: {
        id: true,
        name: true,
        email: true,
        functionName: true
      },
      orderBy: {
        name: 'asc'
      }
    });

    return users;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return [];
  }
}

export default async function NewImcPage() {
  const users = await getUsers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Novo Registro IMC
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Cadastre um novo registro de composição corporal e IMC
        </p>
      </div>

      <ImcForm users={users} />
    </div>
  );
}