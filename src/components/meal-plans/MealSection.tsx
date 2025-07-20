'use client';

import React from 'react';
import { useDrop } from 'react-dnd';

interface MealSectionProps {
  title: string;
  onDrop: (item: { name: string; calories: number }) => void;
  children: React.ReactNode;
}

const MealSection: React.FC<MealSectionProps> = ({ title, onDrop, children }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'food',
    drop: (item: { name: string; calories: number }) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={`rounded-lg border border-stroke bg-white dark:border-strokedark dark:bg-boxdark p-5 ${
      isOver ? 'bg-primary/20' : ''
    }`}>
      <h5 className="text-lg font-medium text-black dark:text-white mb-4">{title}</h5>
      <div className="border-2 border-dashed border-gray-400 rounded-lg p-5 min-h-[200px]">
        {children}
      </div>
    </div>
  );
};

export default MealSection;