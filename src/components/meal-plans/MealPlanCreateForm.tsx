'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PatientOption {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
}

interface FoodOption {
  id: number;
  name: string;
  category: string | null;
  caloriesPer100g: number | null;
  proteinPer100g: number | null;
  carbsPer100g: number | null;
  fatPer100g: number | null;
  fiberPer100g: number | null;
  active: string | null;
}

interface MealPlanCreateFormProps {
  patients: PatientOption[];
  foods: FoodOption[];
}

interface MealItem {
  id: string;
  foodId: number;
  quantity: number;
  unit: string;
}

interface Meal {
  id: string;
  name: string;
  time: string;
  items: MealItem[];
}

const MealPlanCreateForm: React.FC<MealPlanCreateFormProps> = ({ patients, foods }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    patientId: '',
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    targetCalories: '',
    notes: ''
  });

  const [meals, setMeals] = useState<Meal[]>([
    {
      id: '1',
      name: 'Café da Manhã',
      time: '07:00',
      items: []
    },
    {
      id: '2',
      name: 'Lanche da Manhã',
      time: '10:00',
      items: []
    },
    {
      id: '3',
      name: 'Almoço',
      time: '12:00',
      items: []
    },
    {
      id: '4',
      name: 'Lanche da Tarde',
      time: '15:00',
      items: []
    },
    {
      id: '5',
      name: 'Jantar',
      time: '19:00',
      items: []
    }
  ]);

  const [activeTab, setActiveTab] = useState<'info' | 'meals'>('info');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const addMealItem = (mealId: string) => {
    const newItem: MealItem = {
      id: Date.now().toString(),
      foodId: 0,
      quantity: 1,
      unit: 'g'
    };

    setMeals(prev => prev.map(meal => 
      meal.id === mealId 
        ? { ...meal, items: [...meal.items, newItem] }
        : meal
    ));
  };

  const removeMealItem = (mealId: string, itemId: string) => {
    setMeals(prev => prev.map(meal => 
      meal.id === mealId 
        ? { ...meal, items: meal.items.filter(item => item.id !== itemId) }
        : meal
    ));
  };

  const updateMealItem = (mealId: string, itemId: string, field: keyof MealItem, value: string | number) => {
    setMeals(prev => prev.map(meal => 
      meal.id === mealId 
        ? { 
            ...meal, 
            items: meal.items.map(item => 
              item.id === itemId 
                ? { ...item, [field]: value }
                : item
            )
          }
        : meal
    ));
  };

  const updateMeal = (mealId: string, field: 'name' | 'time', value: string) => {
    setMeals(prev => prev.map(meal => 
      meal.id === mealId 
        ? { ...meal, [field]: value }
        : meal
    ));
  };

  const calculateTotalCalories = () => {
    let totalCalories = 0;
    meals.forEach(meal => {
      meal.items.forEach(item => {
        const food = foods.find(f => f.id === item.foodId);
        if (food && food.caloriesPer100g) {
          // Calculate calories based on quantity (assuming calories are per 100g)
          totalCalories += (food.caloriesPer100g * item.quantity) / 100;
        }
      });
    });
    return Math.round(totalCalories);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.patientId) {
      newErrors.patientId = 'Selecione um paciente';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Data de início é obrigatória';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'Data de fim é obrigatória';
    } else if (formData.startDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = 'Data de fim deve ser posterior à data de início';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const totalCalories = calculateTotalCalories();

      const response = await fetch('/api/meal-plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientId: parseInt(formData.patientId),
          title: formData.title.trim(),
          description: formData.description.trim() || null,
          startDate: formData.startDate,
          endDate: formData.endDate,
          totalCalories: totalCalories || parseInt(formData.targetCalories) || null,
          notes: formData.notes.trim() || null,
          meals: meals.filter(meal => meal.items.length > 0) // Only include meals with items
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao criar plano alimentar');
      }

      const { mealPlan } = await response.json();

      // Redirect to meal plan details
      router.push(`/meal-plans/${mealPlan.id}`);
      router.refresh();
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setErrors({ general: error instanceof Error ? error.message : 'Erro ao criar plano alimentar. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Get selected patient info
  const selectedPatient = patients.find(p => p.id.toString() === formData.patientId);
  const totalCalories = calculateTotalCalories();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Breadcrumb */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/meal-plans" className="hover:text-blue-600 dark:hover:text-blue-400">
            Planos Alimentares
          </Link>
          <span>&gt;</span>
          <span className="text-gray-900 dark:text-white">Novo Plano</span>
        </nav>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex px-6">
          <button
            onClick={() => setActiveTab('info')}
            className={`py-4 px-1 border-b-2 font-medium text-sm mr-8 ${
              activeTab === 'info'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Informações Básicas
          </button>
          <button
            onClick={() => setActiveTab('meals')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'meals'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Refeições ({meals.filter(m => m.items.length > 0).length})
          </button>
        </nav>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-6">
          {errors.general && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
              {errors.general}
            </div>
          )}

          {/* Basic Information Tab */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Patient Selection */}
                <div className="lg:col-span-2">
                  <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Paciente *
                  </label>
                  <select
                    id="patientId"
                    name="patientId"
                    value={formData.patientId}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.patientId ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <option value="">Selecione um paciente</option>
                    {patients.map(patient => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name || 'Nome não informado'} {patient.email && `(${patient.email})`}
                      </option>
                    ))}
                  </select>
                  {errors.patientId && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.patientId}</p>}
                  
                  {selectedPatient && (
                    <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-sm">
                        <div className="font-medium text-blue-900 dark:text-blue-100">
                          {selectedPatient.name}
                        </div>
                        {selectedPatient.email && (
                          <div className="text-blue-700 dark:text-blue-300">
                            {selectedPatient.email}
                          </div>
                        )}
                        {selectedPatient.phone && (
                          <div className="text-blue-700 dark:text-blue-300">
                            {selectedPatient.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Título do Plano *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.title ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Ex: Plano de Emagrecimento"
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>}
                </div>

                {/* Target Calories */}
                <div>
                  <label htmlFor="targetCalories" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Meta Calórica (kcal/dia)
                  </label>
                  <input
                    type="number"
                    id="targetCalories"
                    name="targetCalories"
                    value={formData.targetCalories}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2000"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Data de Início *
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.startDate ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {errors.startDate && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.startDate}</p>}
                </div>

                {/* End Date */}
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Data de Fim *
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.endDate ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {errors.endDate && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.endDate}</p>}
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Descrição
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Descreva os objetivos e características do plano alimentar..."
                />
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Observações
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Instruções especiais, restrições alimentares, suplementação, etc."
                />
              </div>
            </div>
          )}

          {/* Meals Tab */}
          {activeTab === 'meals' && (
            <div className="space-y-6">
              {/* Calories Summary */}
              {totalCalories > 0 && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-green-700 dark:text-green-300">
                      <strong>Total calculado:</strong> {totalCalories} kcal/dia
                      {formData.targetCalories && (
                        <span className="ml-2">
                          (Meta: {formData.targetCalories} kcal)
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              )}

              {/* Meals */}
              {meals.map(meal => (
                <div key={meal.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <input
                        type="text"
                        value={meal.name}
                        onChange={(e) => updateMeal(meal.id, 'name', e.target.value)}
                        className="font-medium text-lg border-none bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 rounded"
                      />
                      <input
                        type="time"
                        value={meal.time}
                        onChange={(e) => updateMeal(meal.id, 'time', e.target.value)}
                        className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => addMealItem(meal.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm inline-flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Adicionar Alimento
                    </button>
                  </div>

                  {meal.items.length === 0 ? (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                      Nenhum alimento adicionado
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {meal.items.map(item => (
                        <div key={item.id} className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700/50 p-3 rounded">
                          <select
                            value={item.foodId}
                            onChange={(e) => updateMealItem(meal.id, item.id, 'foodId', parseInt(e.target.value))}
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                          >
                            <option value={0}>Selecione um alimento</option>
                            {foods.map(food => (
                              <option key={food.id} value={food.id}>
                                {food.name} {food.caloriesPer100g && `(${food.caloriesPer100g} kcal/100g)`}
                              </option>
                            ))}
                          </select>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateMealItem(meal.id, item.id, 'quantity', parseFloat(e.target.value))}
                            className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                            min="0"
                            step="0.1"
                          />
                          <select
                            value={item.unit}
                            onChange={(e) => updateMealItem(meal.id, item.id, 'unit', e.target.value)}
                            className="w-16 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                          >
                            <option value="g">g</option>
                            <option value="ml">ml</option>
                            <option value="un">un</option>
                            <option value="col">col</option>
                            <option value="xíc">xíc</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => removeMealItem(meal.id, item.id)}
                            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600 flex justify-between rounded-b-lg">
          <Link
            href="/meal-plans"
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
          >
            Cancelar
          </Link>
          
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium inline-flex items-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Criando...
              </>
            ) : (
              'Criar Plano Alimentar'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MealPlanCreateForm;