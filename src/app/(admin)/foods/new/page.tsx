import NewFoodForm from "@/components/foods/NewFoodForm";

const NewFoodPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Adicionar Novo Alimento
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Adicione um novo alimento ao banco de dados
          </p>
        </div>
      </div>

      <NewFoodForm />
    </div>
  );
};

export default NewFoodPage;
