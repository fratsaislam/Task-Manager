import React, { useEffect, useState, useRef } from 'react';
import TaskCard from "../components/TaskCard";
import { Element, scroller } from 'react-scroll';
import check from '../assets/check.svg'
import { Link } from "react-router-dom";

const Tasks = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [newTask, setNewTask] = useState(false);
  const [editTask, setEditTask] = useState(false);  
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const inputRef = useRef(null);
  const [doneTasks, setDoneTasks] = useState(()=>{
    const savedDoneTasks = localStorage.getItem('done');
    return savedDoneTasks ? JSON.parse(savedDoneTasks) : [];
  })

  
  // Update localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('done', JSON.stringify(doneTasks));
    
    
  }, [tasks,doneTasks]);

 
  
  
  // Focus input when opening form
  useEffect(() => {
    if ((newTask || editTask) && inputRef.current) {
      inputRef.current.focus();
    }
  }, [newTask, editTask]);
  
  const handleCreate = () => {
    setNewTask(true);
    scrollToSection();
  };
  
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  
  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };
  
  const newCard = () => {
    if (name.trim() === "") return;
    
    setTasks([...tasks, { name, desc }]);
    setNewTask(false);
    setDesc("");
    setName("");
  };
  
  function handleDelete(index) {
    setTasks((t) => {
      return t.filter((_, i) => i !== index);
    });
  }
  
  function handleEdit(index) {
    setEditTask(true);
    setEditIndex(index);
    setName(tasks[index].name);
    setDesc(tasks[index].desc);
    scrollToSection();
  }
  
  function handleDone (index) {

    setDoneTasks([...doneTasks,tasks[index]]);
    handleDelete(index);
  }

  function edit() {
    if (name.trim() === "") {
      setEditTask(false);
      return;
    }
    
    let newArray = [...tasks];
    newArray[editIndex] = { name, desc };
    setTasks(newArray);
    setEditTask(false);
    setDesc("");
    setName("");
    setEditIndex(null);
  }
  
  const scrollToSection = () => {
    scroller.scrollTo('formSection', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };
  
  const cancelForm = () => {
    setNewTask(false);
    setEditTask(false);
    setName("");
    setDesc("");
  };

  
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg text-white p-5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <div className='flex gap-2'>
            <button 
              onClick={handleCreate}
              className="bg-white text-indigo-600 px-5 py-2 rounded-lg shadow hover:bg-opacity-90 transition-all duration-200 font-medium flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              New Task
            </button>
            <Link
              to={"/Done"}
              className="bg-white text-indigo-600 px-5 py-2 rounded-lg shadow hover:bg-opacity-90 transition-all duration-200 font-medium flex items-center"
            >
              <img src={check} width={20} height={20} className='mr-2'/>
              Done
            </Link>
          </div>
        </div>
      </nav>
      
      <main className="max-w-6xl mx-auto py-8 px-4">
        {tasks.length === 0 ? (
          <div className="text-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h2 className="mt-4 text-xl font-medium text-gray-600 dark:text-gray-300">No tasks yet</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Create a new task to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task, index) => (
              <TaskCard 
                key={index} 
                namee={task.name} 
                desce={task.desc} 
                i={index} 
                onDelete={() => handleDelete(index)} 
                onEdit={() => handleEdit(index)}
                onDone={() => handleDone(index)}
              />
            ))}
          </div>
        )}

        <Element name="formSection" className="mt-8">
          {(newTask || editTask) && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md mx-auto transition-all duration-300 transform animate-fadeIn">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                {newTask ? "Create New Task" : "Edit Task"}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="taskName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Task Name
                  </label>
                  <input
                    id="taskName"
                    ref={inputRef}
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Enter task name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="taskDesc" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    id="taskDesc"
                    value={desc}
                    onChange={handleDescChange}
                    placeholder="Enter description"
                    rows="3"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div className="flex items-center space-x-3 pt-4">
                  <button
                    onClick={newTask ? newCard : edit}
                    className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  >
                    {newTask ? "Create Task" : "Update Task"}
                  </button>
                  <button
                    onClick={cancelForm}
                    className="flex-1 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </Element>
      </main>
    </div>
  );
};

export default Tasks;

export function getDoneTasks() {
  const savedDoneTasks = localStorage.getItem("done");
  return savedDoneTasks ? JSON.parse(savedDoneTasks) : [];
};









/* import React, { useEffect, useState } from 'react'
import TaskCard from "../components/TaskCard"
import { Link, Element, scroller } from 'react-scroll';

const Tasks = () => {



  
  const [newTask, setNewTask] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [editIndex, setEditIndex] = useState(null)
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  // Update localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleCrate = () =>{
    setNewTask(true)
    scrollToSection();
}
  const handleNameChange = (e) =>{
    setName(e.target.value)
  }
  const handleDescChange = (e) =>{
    setDesc(e.target.value)
    
  }

  const newCard=()=>{
    setTasks([...tasks, {name:name, desc:desc}])
    setNewTask(false)
    setDesc("")
    setName("")
  }
  function handleDelete(index){
     setTasks((t)=>{return t.filter((_, i)=>{
        return i !== index;
    })})
  }

  function handleEdit(index){
    setEditTask(true);
    setEditIndex(index);
    setName(tasks[index].name)
    setDesc(tasks[index].desc)
    
  }

  function Edit (){
    if(name ==="" && desc ===""){
        setEditTask(false)
    }else{
        let newArray = [...tasks]
        newArray[editIndex] = {name:name , desc:desc}
        setTasks(newArray);
        setEditTask(false)
        setDesc("")
        setName("")
        setEditIndex(null)
    }
  }

  
  const scrollToSection = () => {
    scroller.scrollTo('mySection', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };
  
  return (
    <div>
        <nav className="flex justify-center items-center gap-4 bg-blue-700 text-[#FAFAFA] p-5">
            <span>Create A New Taks</span>
            <button className="bg-green-900 rounded-2xl py-[5px] px-[10px]  text-white cursor-pointer" onClick={()=>{handleCrate()}}>Create</button>
        </nav>
        
        <main className="flex w-full gap-4 justify-center flex-wrap p-[20px]">
            {tasks.map((task, index)=>{
                return <TaskCard key={index} namee={task.name} desce={task.desc} i={index} onDelete={()=>handleDelete(index)} onEdit={()=>handleEdit(index)}/>
            })}
            <Element name="mySection">
            {newTask  && (
                <div className='w-fit mx-auto bg-amber-100 rounded-2xl p-5 h-[300]'>
                    <h1 className="text-2xl p-4">Card Name</h1>
                    <input value={name} type="text" className="bg-white p-5" onChange={(e)=>handleNameChange(e)}/>
            
                    <p className="text-xl p-4">Card Description</p>
                    <input value={desc} type="text" className="bg-white p-5" onChange={(e)=>handleDescChange(e)}/>
                    
                    <button className="p-5 bg-blue-300" onClick={newCard}>Create</button>
                </div>
            )}
            </Element>
            {editTask  && (
                <div className='w-fit mx-auto bg-amber-100 rounded-2xl p-5 h-[300]'>
                    <h1 className="text-2xl p-4">Card Name</h1>
                    <input value={name} type="text" className="bg-white p-5" onChange={(e)=>handleNameChange(e)}/>
            
                    <p className="text-xl p-4">Card Description</p>
                    <input value={desc} type="text" className="bg-white p-5" onChange={(e)=>handleDescChange(e)}/>
                    
                    <button className="p-5 bg-blue-300" onClick={()=>Edit()}>Done</button>
                </div>
            )}
        </main>
    </div>
  )
}

export default Tasks;
 */