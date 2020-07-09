const express = require("express")
// const cors = require("cors")
const path = require("path")
const studentsRouter = require("./services/students")
const mongoose = require("mongoose")


const server = express()

server.use(express.json())

// server.use(cors())


server.use("/students", studentsRouter)

mongoose.connect("mongodb://localhost:27017/m6-day4-react",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then (

server.listen(3031, ()=>{
    console.log("Server is running on port 3001")
})
).catch((err) => console.log(err))