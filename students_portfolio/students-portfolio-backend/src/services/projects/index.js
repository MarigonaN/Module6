const express = require('express')
const projectModel = require('./schema')
const qToM = require('query-to-mongo')

const projectsRouter = express.Router()


projectsRouter.get('/', async (req, res, next) => {
    const parsedQuery = qToM(req.query)
    console.log(parsedQuery)
    try {
        const projectsList = await projectModel.find(req.query).populate("authors")
      
        res.send(projectsList)
    } catch (error) {
        next(error)
    }
})




projectsRouter.get('/:id', async (req, res, next) => {
    try {
        const project = await projectModel.findOne( {_id: req.params.id})
        if (project) {
            res.send(project)
        } else {
            const error = new Error()
            error.httpStatusCode = 404
            next(error)
        }

    } catch (error) {
        next(error)
    }
})




projectsRouter.post('/', async (req, res, next) => {
    try {
        const newProject = new projectModel(req.body)
        const response = await newProject.save()
        res.send(response)
    } catch (error) {
        next(error)
    }
})




projectsRouter.put('/:id', async (req, res, next) => {
    try {
        const response = await projectModel.findByIdAndUpdate(req.params.id, req.body)
        console.log(response)
        res.send(response)
    } catch (error) {
        next(error)
    }
})




projectsRouter.delete('/:id', async (req, res, next) => {
    try {
        await projectModel.findByIdAndDelete(req.params.id)

        res.send("deleted!")
    } catch (error) {
        next(error)
    }
})

module.exports = projectsRouter