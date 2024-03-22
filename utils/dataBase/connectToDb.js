const mongoose = require("mongoose");
const connectToDb = async () => {
    try{
        const connection = await mongoose.connect(process.env.DB_CONNECTION_STRING);
        if(connection){
            console.log("connected to ToDoList database");
        }
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    connectToDb,
}