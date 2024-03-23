const express = require("express");
const app =  express();

const cors = require("cors");
app.use(cors({
    origin:'*'
}));

const helmet = require("helmet");
app.use(helmet());

const dotenv = require("dotenv");
dotenv.config();

// const bodyParser = require("body-parser"); 
// app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

// connect to database
const { connectToDb } = require("./utils/dataBase/connectToDb");
connectToDb();

const logger = require("./middlerwares/logger")
app.use(logger);

//user routes
const userRouter = require("./routes/userRoutes");
app.use("/api/users",userRouter)
const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks",taskRoutes)

app.listen(process.env.PORT,()=>console.log(`server is listening on port ${process.env.PORT}`));