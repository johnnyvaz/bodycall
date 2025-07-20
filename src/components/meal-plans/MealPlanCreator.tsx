'use client';

import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FoodItem from './FoodItem';
import MealSection from './MealSection';

interface Food {
  name: string;
  calories: number;
}

const MealPlanCreator = () => {
  const [meals, setMeals] = useState<Record<string, Food[]>>({
    "Café da Manhã": [],
    "Almoço": [],
    "Lanche": [],
    "Jantar": [],
  });

  const handleDrop = (meal: string, item: Food) => {
    setMeals((prevMeals) => ({
      ...prevMeals,
      [meal]: [...prevMeals[meal], item],
    }));
  };

  const foodLibrary: Food[] = [
    { name: 'Maçã', calories: 95 },
    { name: 'Banana', calories: 105 },
    { name: 'Peito de Frango', calories: 165 },
    { name: 'Arroz Integral', calories: 215 },
    { name: 'Salada', calories: 50 },
    { name: 'Iogurte', calories: 150 },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-6">
        <div className="flex flex-col gap-6">
          {/* Patient Selection */}
          <div>
            <label htmlFor="patient" className="mb-2.5 block text-black dark:text-white">Selecionar Paciente</label>
            <select id="patient" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
              <option value="">Selecione um paciente</option>
              <option value="1">John Doe</option>
              <option value="2">Jane Smith</option>
            </select>
          </div>

          {/* Meal Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(meals).map((meal) => (
              <MealSection key={meal} title={meal} onDrop={(item) => handleDrop(meal, item)}>
                {meals[meal].length > 0 ? (
                  meals[meal].map((food, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-2 rounded-lg mb-2">
                      <p className="text-gray-900 dark:text-white">{food.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{food.calories} kcal</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400">Arraste e solte os alimentos aqui</p>
                )}
              </MealSection>
            ))}
          </div>

          {/* Food Items Library */}
          <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg">
            <h5 className="text-lg font-medium text-black dark:text-white mb-4">Banco de Alimentos</h5>
            {/* Search and filter */}
            <div className="flex items-center gap-4 mb-4">
              <input type="text" placeholder="Buscar alimento" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">Buscar</button>
            </div>
            {/* Food items list */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {foodLibrary.map((food) => (
                <FoodItem key={food.name} name={food.name} calories={food.calories} />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <button className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-lg font-medium">Salvar como Rascunho</button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">Salvar e Publicar</button>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default MealPlanCreator;