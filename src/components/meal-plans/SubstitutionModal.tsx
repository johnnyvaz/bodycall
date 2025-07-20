'use client';

import React from 'react';

interface SubstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  foodName: string;
}

const SubstitutionModal: React.FC<SubstitutionModalProps> = ({ isOpen, onClose, foodName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-boxdark rounded-lg p-6 w-full max-w-lg">
        <h4 className="text-xl font-semibold text-black dark:text-white mb-4">
          Substitutions for {foodName}
        </h4>
        {/* Add substitution logic here */}
        <div className="flex justify-end mt-6">
          <button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-lg font-medium">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubstitutionModal;
