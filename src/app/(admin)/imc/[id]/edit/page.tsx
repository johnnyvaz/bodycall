import type { Metadata } from "next";
import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ImcForm from "@/components/imc/ImcForm";

export const metadata: Metadata = {
  title: "Editar Registro IMC | BodyCal - Sistema de Gestão Nutricional",
  description: "Editar registro de IMC e composição corporal",
};

async function getImcRecord(id: number) {
  try {
    const record = await prisma.imcCollection.findUnique({
      where: { id }
    });

    return record;
  } catch (error) {
    console.error('Erro ao buscar registro IMC:', error);
    return null;
  }
}

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

export default async function EditImcPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await params;
  const id = parseInt(idParam);
  
  if (isNaN(id)) {
    notFound();
  }

  const [record, users] = await Promise.all([
    getImcRecord(id),
    getUsers()
  ]);

  if (!record) {
    notFound();
  }

  // Format the initial data for the form
  const initialData = {
    id: record.id,
    dateimc: record.dateimc.toISOString().split('T')[0],
    userid: record.userid,
    sex: record.sex || '',
    age: record.age || undefined,
    weight: record.weight || undefined,
    height: record.height || undefined,
    neck: record.neck || undefined,
    waist: record.waist || undefined,
    belly: record.belly || undefined,
    lowwaist: record.lowwaist || undefined,
    hip: record.hip || undefined,
    pgc: record.pgc || undefined,
    category: record.category || '',
    gci: record.gci || '',
    mgfm: record.mgfm || undefined,
    mmlm: record.mmlm || undefined,
    pgbmi: record.pgbmi || undefined,
    ica: record.ica || undefined
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Editar Registro IMC #{record.id}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Edite os dados de composição corporal e IMC
        </p>
      </div>

      <ImcForm users={users} initialData={initialData} />
    </div>
  );
}