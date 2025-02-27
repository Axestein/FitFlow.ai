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
        
        // Populate tasks based on column
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

    // Update the task in the backend
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
      
      // Update local state
      setTasks(prev => ({
        ...prev,
        [column]: [...prev[column], newTaskObj]
      }));

      // Add task to backend
      axios.post("http://localhost:5000/api/tasks", newTaskObj)
        .catch((error) => console.error("Error adding task:", error));
    }
  };

  const removeTask = (taskId, column) => {
    setTasks(prev => ({
      ...prev,
      [column]: prev[column].filter(task => task.id !== taskId)
    }));

    // Remove task from backend
    axios.delete(`http://localhost:5000/api/tasks/${taskId}`)
      .catch((error) => console.error("Error removing task:", error));
  };

  const columnConfig = {
    workoutPlans: { 
      title: "Workout Plans", 
      headerColor: "bg-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    progressTracking: { 
      title: "Progress Tracking", 
      headerColor: "bg-teal-600",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200"
    },
    completedWorkouts: { 
      title: "Completed Workouts", 
      headerColor: "bg-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    goalSetting: { 
      title: "Goal Setting", 
      headerColor: "bg-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    nutritionPlan: { 
      title: "Nutrition Plan", 
      headerColor: "bg-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    },
    reminders: { 
      title: "Reminders", 
      headerColor: "bg-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Employee Fitness Kanban Board</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(columnConfig).map(([columnKey, config]) => (
            <div 
              key={columnKey} 
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex flex-col"
            >
              <div className={`${config.headerColor} px-6 py-4`}>
                <h2 className="text-white font-bold text-lg">
                  {config.title}
                  <span className="ml-2 text-sm font-normal opacity-80">
                    ({tasks[columnKey].length})
                  </span>
                </h2>
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
                              className={`bg-white rounded-lg shadow-sm border ${config.borderColor} 
                                p-4 transition-all duration-200 hover:shadow-md
                                ${snapshot.isDragging ? 'shadow-lg ring-2 ring-gray-200' : ''}`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div 
                                    {...provided.dragHandleProps}
                                    className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
                                  >
                                    <GripHorizontal size={16} />
                                  </div>
                                  <span className="text-gray-700">{task.content}</span>
                                </div>
                                <button 
                                  onClick={() => removeTask(task.id, columnKey)}
                                  className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1 rounded-full transition-colors duration-200"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
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
                    border rounded-lg flex items-center justify-center
                    text-gray-700 hover:bg-opacity-75 transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-offset-2 ${config.borderColor}`}
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
