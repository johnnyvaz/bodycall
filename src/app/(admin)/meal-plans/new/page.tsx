import MealPlanCreator from "@/components/meal-plans/MealPlanCreator";

const NewMealPlanPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Novo Plano Alimentar
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Crie um novo plano alimentar para um paciente
          </p>
        </div>
      </div>

      <MealPlanCreator />
    </div>
  );
};

export default NewMealPlanPage;
