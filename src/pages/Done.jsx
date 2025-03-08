import React from 'react'
import { Link } from "react-router-dom";
import check from "../assets/check.svg"
import DoneTaskCard from '../components/DoneTaskCard';
import { getDoneTasks } from './Tasks'


 const Done = () => {
  
  const doneTasks = getDoneTasks();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg text-white p-5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <div className='flex gap-2'>
            
            <Link 
              to={"/"}
              className="bg-white text-indigo-600 px-5 py-2 rounded-lg shadow hover:bg-opacity-90 transition-all duration-200 font-medium flex items-center"
            >
              <img src={check} width={20} height={20} className='mr-2'/>
              Go To Tasks
            </Link>
          </div>
        </div>
      </nav>
      <main className='max-w-6xl mx-auto py-8 px-4"'>
      {doneTasks.length === 0 ? (
          <div className="text-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h2 className="mt-4 text-xl font-medium text-gray-600 dark:text-gray-300">No tasks yet</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Complete some tasks to see them Here</p>
          </div>
        ) : (
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doneTasks.map((task, index) => (
              <DoneTaskCard 
                key={index} 
                namee={task.name} 
                desce={task.desc} 
                i={index} 
              />
            ))}
        </div>)}
      </main>
      
      
    </div>
  );
}
export default Done;
