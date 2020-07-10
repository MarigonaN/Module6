const express = require('express')
const cors = require('cors')
const listEndpoints = require('express-list-endpoints')
const mongoose = require('mongoose')

const studentsRoutes = require('./services/students')
const projectsRoutes = require('./services/projects')



const {
    notFoundHandler, 
    badRequestHandler,
    genericErrorHandler,
} = require('./errorHandlers')

const server = express()

server.use(express.json())

const port = process.env.PORT || 3006

server.use('/students', studentsRoutes)
server.use('/projects', projectsRoutes)

server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

console.log(listEndpoints(server))

mongoose.connect("mongodb://localhost:27017/students-portfolio", {useNewUrlParser: true, 
useUnifiedTopology: true
}).then(
    server.listen(port, () =>{
        console.log("running on port", port)
    })
)

