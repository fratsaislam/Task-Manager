import React from 'react';
import check from '../assets/check.svg'
const TaskCard = ({ namee, desce, onEdit, onDelete , onDone}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6 flex flex-col h-full">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 line-clamp-2">
            {namee}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-4">
            {desce || "No description provided"}
          </p>
        </div>
        
        <div className='flex items-center justify-between text-white'>
            <p>Status:</p>
            <p className='flex  items-center  gap-2 px-2 py-1 bg-green-500 rounded-2xl mr-4'>
                <img width={30} src={check}/>
                done
                </p>
            
        </div>
        
      </div>
    </div>
  );
};

export default TaskCard;




