'use client';

import React, { useEffect, useState } from 'react';

interface MealPlan {
  id: number;
  patient: string;
  status: string;
  startDate: string;
  endDate: string;
}

const MealPlansList = () => {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);

  useEffect(() => {
    const fetchMealPlans = async () => {
      const res = await fetch('/api/meal-plans');
      const data = await res.json();
      setMealPlans(data);
    };

    fetchMealPlans();
  }, []);

  return (
    <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Paciente
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data de Início
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data de Fim
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-boxdark dark:divide-gray-700">
          {mealPlans.map((plan) => (
            <tr key={plan.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">{plan.patient}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${plan.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {plan.status === 'Active' ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">{new Date(plan.startDate).toLocaleDateString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">{new Date(plan.endDate).toLocaleDateString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" className="text-blue-600 hover:text-blue-900">Visualizar</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MealPlansList;