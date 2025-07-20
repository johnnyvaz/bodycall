'use client';

import React from 'react';
import { useDrop } from 'react-dnd';

interface MealSectionProps {
  title: string;
  onDrop: (item: { id: number; name: string; calories: number; protein: number; carbs: number; fat: number; }) => void;
  children: React.ReactNode;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

const MealSection: React.FC<MealSectionProps> = ({ title, onDrop, children, totalCalories, totalProtein, totalCarbs, totalFat }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'food',
    drop: (item: { id: number; name: string; calories: number; protein: number; carbs: number; fat: number; }) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={`rounded-lg border border-stroke bg-white dark:border-strokedark dark:bg-boxdark p-5 ${
      isOver ? 'bg-primary/20' : ''
    }`}>
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-lg font-medium text-black dark:text-white">{title}</h5>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
          <p>Cals: {totalCalories} kcal</p>
          <p>P: {totalProtein}g</p>
          <p>C: {totalCarbs}g</p>
          <p>F: {totalFat}g</p>
        </div>
      </div>
      <div className="border-2 border-dashed border-gray-400 rounded-lg p-5 min-h-[200px]">
        {children}
      </div>
    </div>
  );
};

export default MealSection;
