'use client';

import React, { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import SubstitutionModal from './SubstitutionModal';

interface FoodItemProps {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const FoodItem: React.FC<FoodItemProps> = ({ name, calories, protein, carbs, fat }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'food',
    item: { name, calories, protein, carbs, fat },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const ref = useRef<HTMLDivElement>(null);
  drag(ref);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        ref={ref}
        className={`border border-stroke dark:border-strokedark rounded-lg p-3 text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
          isDragging ? 'opacity-50' : 'opacity-100'
        }`}
      >
        <p className="font-medium text-black dark:text-white">{name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{calories} kcal</p>
        <button
          className="text-xs text-blue-600 hover:text-blue-900 mt-2"
          onClick={() => setIsModalOpen(true)}
        >
          Substitutions
        </button>
      </div>
      <SubstitutionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        foodName={name}
      />
    </>
  );
};

export default FoodItem;
