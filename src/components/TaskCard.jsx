import React from 'react';

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
        
        <div className="flex justify-center space-x-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <button 
            onClick={onEdit} 
            className="px-4 py-2 text-sm rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-800 transition-colors duration-200"
          >
            Edit
          </button>
          <button 
            onClick={onDelete} 
            className="px-4 py-2 text-sm rounded-lg bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800 transition-colors duration-200"
          >
            Delete
          </button>
          <button 
            onClick={onDone} 
            className="px-4 py-2 text-sm rounded-lg bg-green text-red-700 hover:bg-red-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800 transition-colors duration-200"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;










/* import React from 'react'

const TaskCard = (props) => {

    
  return (
    <div className='w-[100%] bg-amber-100 rounded-2xl p-5 h-[300px] flex flex-col justify-between '>
        <h1 className="text-2xl p-4">{props.namee}</h1>
        <p className="text-xl p-4">{props.desce}</p>
        <div className='flex justify-end gap-4 '>
            <button className="rounded-2xl bg-green-600 p-[5px]" onClick={()=>props.onEdit(props.i)}>Edit</button>
            <button className="rounded-2xl bg-red-600 p-[5px]" onClick={()=>props.onDelete(props.i)}> Delete</button>
        </div>
    </div>
  )
}
export default TaskCard;
 */