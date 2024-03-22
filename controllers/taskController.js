const Task = require("../models/Task");
const { taskSchema } = require("../utils/validation/validation");

const getTasks = async (req, res) => {
  try{
    const tasks = await Task.find({ userId: req.userId }).sort({createdAt:-1});
    if (tasks.length > 0) {
      return res.status(200).json({ tasks });
    } else {
      return res.status(200).json({ message:"No tasks are founded" });
    }
  }catch(error){
    return res.status(400).json({ message:error.message });
  }
};

const deleteTask = async (req, res) => {
  try{
    const taskId = req.params.id;
    const task = await Task.findOne({ $and:[{userId: req.userId}, {_id :taskId}] });
    if (task) {
      await Task.deleteOne({_id :taskId});
      return res.status(200).json({message:"Task deleted successfully"});
    } else {
      return res.status(400).json({ message: "Not found" });
    }
  }catch(error){
    return res.status(400).json({ message: error.message});
  }
};

const createTask = async (req, res) => {
  //check task data
  const { error } = taskSchema.validate({ ...req.body,userId:req.userId });
  if (!error) {
    try{
      // check if task is created before or not
      let task = await Task.findOne({ title: req.body.title });
      if (!task) {
        // creating new task
        task = new Task({ ...req.body, userId: req.userId});
        task = await task.save();
        if (task) {
          return res
          .status(201)
            .json({ message: "New task is created.", task });
          }
        } else {
          return res.status(400).json({ message: "task already exist." });
        }
      }catch(error){
        return res.status(400).json({ message: error.message });
      }
  } else {
    return res.status(400).json({ message: error.details[0].message });
  }
};

module.exports = {
  getTasks,
  deleteTask,
  createTask,
};
