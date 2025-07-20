import Link from "next/link";
import FoodList from "@/components/foods/FoodList";

const FoodsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Banco de Alimentos
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie os alimentos e suas informações nutricionais
          </p>
        </div>
        <Link
          href="/foods/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium inline-flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo Alimento
        </Link>
      </div>

      <FoodList />
    </div>
  );
};

export default FoodsPage;
