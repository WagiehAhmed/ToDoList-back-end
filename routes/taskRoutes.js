const express = require("express");
const router = express.Router();
const auth = require("../middlerwares/auth");
const {getTasks,createTask,deleteTask} = require("../controllers/taskController");
//auth for all requests
router.use(auth);
// get task request 
router.get("/",getTasks);
// create task request
router.post("/",createTask);
// delete task request
router.delete("/:id",deleteTask);
// update task request 
// router.update("/:id",deleteTask);

module.exports = router;