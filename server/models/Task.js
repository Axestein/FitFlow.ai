const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  id: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  column: { 
    type: String, 
    required: true 
  }, 
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
