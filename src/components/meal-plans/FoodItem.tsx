'use client';

import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

interface FoodItemProps {
  name: string;
  calories: number;
}

const FoodItem: React.FC<FoodItemProps> = ({ name, calories }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'food',
    item: { name, calories },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const ref = useRef<HTMLDivElement>(null);
  drag(ref);

  return (
    <div
      ref={ref}
      className={`border border-stroke dark:border-strokedark rounded-lg p-3 text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <p className="font-medium text-black dark:text-white">{name}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{calories} kcal</p>
    </div>
  );
};

export default FoodItem;
