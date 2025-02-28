import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Plus, Trash2, GripHorizontal } from "lucide-react";

const FitnessKanbanBoard = () => {
  const [tasks, setTasks] = useState({
    workoutPlans: [],
    progressTracking: [],
    completedWorkouts: [],
    goalSetting: [],
    nutritionPlan: [],
    reminders: []
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks")
      .then((response) => {
        const fetchedTasks = response.data;
        const newTasks = {
          workoutPlans: [],
          progressTracking: [],
          completedWorkouts: [],
          goalSetting: [],
          nutritionPlan: [],
          reminders: []
        };
        
        fetchedTasks.forEach((task) => {
          newTasks[task.column].push(task);
        });
        setTasks(newTasks);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const newTasks = { ...tasks };
    const [movedTask] = newTasks[source.droppableId].splice(source.index, 1);
    newTasks[destination.droppableId].splice(destination.index, 0, movedTask);
    setTasks(newTasks);

    axios.put(`http://localhost:5000/api/tasks/${movedTask.id}`, {
      content: movedTask.content,
      column: destination.droppableId
    }).catch((error) => console.error("Error updating task:", error));
  };

  const addTaskToColumn = (column) => {
    const newTask = prompt(`Enter a new task for the ${column} column:`);
    if (newTask) {
      const newTaskObj = { 
        id: `task-${Date.now()}`, 
        content: newTask, 
        column 
      };
      
      setTasks(prev => ({
        ...prev,
        [column]: [...prev[column], newTaskObj]
      }));

      axios.post("http://localhost:5000/api/tasks", newTaskObj)
        .catch((error) => console.error("Error adding task:", error));
    }
  };

  const removeTask = (taskId, column) => {
    setTasks(prev => ({
      ...prev,
      [column]: prev[column].filter(task => task.id !== taskId)
    }));

    axios.delete(`http://localhost:5000/api/tasks/${taskId}`)
      .catch((error) => console.error("Error removing task:", error));
  };

  const columnConfig = {
    workoutPlans: { 
      title: "Workout Plans", 
      headerColor: "bg-gradient-to-r from-blue-500 to-blue-700",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-300"
    },
    progressTracking: { 
      title: "Progress Tracking", 
      headerColor: "bg-gradient-to-r from-teal-500 to-teal-700",
      bgColor: "bg-teal-100",
      borderColor: "border-teal-300"
    },
    completedWorkouts: { 
      title: "Completed Workouts", 
      headerColor: "bg-gradient-to-r from-green-500 to-green-700",
      bgColor: "bg-green-100",
      borderColor: "border-green-300"
    },
    goalSetting: { 
      title: "Goal Setting", 
      headerColor: "bg-gradient-to-r from-purple-500 to-purple-700",
      bgColor: "bg-purple-100",
      borderColor: "border-purple-300"
    },
    nutritionPlan: { 
      title: "Nutrition Plan", 
      headerColor: "bg-gradient-to-r from-yellow-500 to-yellow-700",
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-300"
    },
    reminders: { 
      title: "Reminders", 
      headerColor: "bg-gradient-to-r from-orange-500 to-orange-700",
      bgColor: "bg-orange-100",
      borderColor: "border-orange-300"
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center tracking-wide">🏋️ Employee Fitness Kanban Board 🥗</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(columnConfig).map(([columnKey, config]) => (
            <div 
              key={columnKey} 
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-300 flex flex-col transform transition duration-500 hover:scale-105"
            >
              <div className={`${config.headerColor} px-6 py-5 text-center text-white font-bold text-xl uppercase tracking-wider`}>
                {config.title}
                <span className="ml-2 text-sm font-normal opacity-80">
                  ({tasks[columnKey].length})
                </span>
              </div>
              <div className="flex-1 p-4">
                <Droppable droppableId={columnKey}>
                  {(provided) => (
                    <div 
                      ref={provided.innerRef} 
                      {...provided.droppableProps}
                      className={`min-h-[400px] ${config.bgColor} rounded-lg p-3 space-y-3`}
                    >
                      {tasks[columnKey].map((task, index) => (
                        <Draggable 
                          key={task.id} 
                          draggableId={task.id} 
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`bg-white rounded-xl shadow-md border ${config.borderColor} 
                                p-4 transition-all duration-200 hover:shadow-lg flex items-center justify-between`}
                            >
                              <div className="flex items-center space-x-3">
                                <div 
                                  {...provided.dragHandleProps}
                                  className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
                                >
                                  <GripHorizontal size={16} />
                                </div>
                                <span className="text-gray-700 font-medium">{task.content}</span>
                              </div>
                              <button 
                                onClick={() => removeTask(task.id, columnKey)}
                                className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1 rounded-full transition-colors duration-200"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <button
                  onClick={() => addTaskToColumn(columnKey)}
                  className={`w-full mt-4 p-3 ${config.bgColor} ${config.borderColor} 
                    border rounded-xl flex items-center justify-center text-gray-700 hover:bg-opacity-75`}
                >
                  <Plus className="mr-2" size={18} />
                  Add New Task
                </button>
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default FitnessKanbanBoard;