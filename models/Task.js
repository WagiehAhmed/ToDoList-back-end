const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title:{
        type:String,
        require:true,
        unique:true
    },
    content:{
        type:String,
        require:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        require:true,
    }
},{timestamps:true})

module.exports = mongoose.model("tasks",taskSchema);