const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const db = require("./db")
const studentRouter = require("./routes/students")

const listEndpoints = require("express-list-endpoints")

const server = express()
server.use(cors())
server.use(express.json())

server.get("/", (req, res)=> {
    res.send("The server is running!")
})

server.use("/Students", studentRouter)


console.log(listEndpoints(server))
server.listen(process.env.PORT || 3456, () => console.log("Running on port", process.env.PORT || 3456))