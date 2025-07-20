'use client';

import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FoodItem from '@/components/meal-plans/FoodItem';
import MealSection from '@/components/meal-plans/MealSection';

interface Food {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const NewMealPlanTemplateForm = () => {
  const [meals, setMeals] = useState<Record<string, Food[]>>({
    "Café da Manhã": [],
    "Almoço": [],
    "Lanche": [],
    "Jantar": [],
  });
  const [foodLibrary, setFoodLibrary] = useState<Food[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  useEffect(() => {
    const fetchFoods = async () => {
      const res = await fetch('/api/foods');
      const data = await res.json();
      setFoodLibrary(data);
    };

    fetchFoods();
  }, []);

  const handleDrop = (meal: string, item: Food) => {
    setMeals((prevMeals) => ({
      ...prevMeals,
      [meal]: [...prevMeals[meal], item],
    }));
  };

  const calculateTotal = (meal: string, nutrient: keyof Food) => {
    return meals[meal].reduce((total, food) => total + (food[nutrient] as number), 0);
  };

  const filteredFoodLibrary = foodLibrary.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-6">
        <div className="flex flex-col gap-6">
          {/* Template Name and Description */}
          <div>
            <label htmlFor="templateName" className="mb-2.5 block text-black dark:text-white">Nome do Modelo</label>
            <input id="templateName" type="text" placeholder="Digite o nome do modelo" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
          </div>
          <div>
            <label htmlFor="templateDescription" className="mb-2.5 block text-black dark:text-white">Descrição do Modelo</label>
            <textarea id="templateDescription" placeholder="Digite a descrição do modelo" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"></textarea>
          </div>

          {/* Meal Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(meals).map((meal) => (
              <MealSection
                key={meal}
                title={meal}
                onDrop={(item) => handleDrop(meal, item)}
                totalCalories={calculateTotal(meal, 'calories')}
                totalProtein={calculateTotal(meal, 'protein')}
                totalCarbs={calculateTotal(meal, 'carbs')}
                totalFat={calculateTotal(meal, 'fat')}
              >
                {meals[meal].length > 0 ? (
                  meals[meal].map((food, index) => (
                    <div key={index} className="flex justify-between items-center bg-white dark:bg-boxdark p-2 rounded-lg mb-2">
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

          {/* Special Instructions */}
          <div>
            <label htmlFor="specialInstructions" className="mb-2.5 block text-black dark:text-white">Instruções Especiais</label>
            <textarea
              id="specialInstructions"
              placeholder="Digite as instruções especiais"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
            ></textarea>
          </div>

          {/* Food Items Library */}
          <div className="bg-white dark:bg-boxdark p-5 rounded-lg border border-stroke dark:border-strokedark">
            <h5 className="text-lg font-medium text-black dark:text-white mb-4">Banco de Alimentos</h5>
            {/* Search and filter */}
            <div className="flex items-center gap-4 mb-4">
              <input
                type="text"
                placeholder="Buscar alimento"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Food items list */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredFoodLibrary.map((food) => (
                <FoodItem key={food.id} name={food.name} calories={food.calories} protein={food.protein} carbs={food.carbs} fat={food.fat} />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">Salvar Modelo</button>
            <button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">Visualizar Impressão</button>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default NewMealPlanTemplateForm;