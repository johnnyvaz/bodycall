'use client';

import React from 'react';
import Link from 'next/link';

const MealPlanTemplateList = () => {
  const templates = [
    { id: 1, name: 'Plano de Perda de Peso', description: 'Um plano focado em déficit calórico para perda de peso.' },
    { id: 2, name: 'Plano de Ganho de Massa Muscular', description: 'Um plano focado em alta proteína para ganho de massa muscular.' },
    { id: 3, name: 'Dieta Balanceada', description: 'Uma dieta balanceada para manter um estilo de vida saudável.' },
  ];

  return (
    <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg overflow-x-auto">
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
        {templates.map((template) => (
          <div key={template.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 flex flex-col justify-between">
            <div>
              <h5 className="text-lg font-medium text-gray-900 dark:text-white">{template.name}</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{template.description}</p>
            </div>
            <div className="flex gap-4 mt-4">
              <Link href={`/meal-plan-templates/edit/${template.id}`} className="text-blue-600 hover:text-blue-900">
                Editar
              </Link>
              <button className="text-red-600 hover:text-red-900">Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlanTemplateList;
