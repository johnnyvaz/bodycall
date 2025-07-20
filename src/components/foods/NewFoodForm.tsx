'use client';

import React from 'react';

const NewFoodForm = () => {
  return (
    <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-6">
      <form>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="col-span-1">
            <label htmlFor="name" className="mb-2.5 block text-black dark:text-white">
              Nome
            </label>
            <input
              id="name"
              type="text"
              placeholder="Digite o nome do alimento"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="calories" className="mb-2.5 block text-black dark:text-white">
              Calorias
            </label>
            <input
              id="calories"
              type="number"
              placeholder="Digite as calorias"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="protein" className="mb-2.5 block text-black dark:text-white">
              Proteínas (g)
            </label>
            <input
              id="protein"
              type="number"
              placeholder="Digite as proteínas em gramas"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="carbs" className="mb-2.5 block text-black dark:text-white">
              Carboidratos (g)
            </label>
            <input
              id="carbs"
              type="number"
              placeholder="Digite os carboidratos em gramas"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="fat" className="mb-2.5 block text-black dark:text-white">
              Gorduras (g)
            </label>
            <input
              id="fat"
              type="number"
              placeholder="Digite as gorduras em gramas"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
            Adicionar Alimento
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewFoodForm;
