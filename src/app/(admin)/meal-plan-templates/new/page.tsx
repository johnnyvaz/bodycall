import NewMealPlanTemplateForm from "@/components/meal-plan-templates/NewMealPlanTemplateForm";

const NewMealPlanTemplatePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Criar Novo Modelo de Plano Alimentar
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Crie um novo modelo de plano alimentar para reutilizar com seus pacientes
          </p>
        </div>
      </div>

      <NewMealPlanTemplateForm />
    </div>
  );
};

export default NewMealPlanTemplatePage;
