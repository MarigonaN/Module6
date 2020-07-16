const express = require("express")
const db = require("../../db")
const students = require("../../../public/students/students.json")

const studentRouter = express.Router()


studentRouter.get("/", async(req, res)=>{
    // getting values from Query String ?offset=10 etc
    // OR setting a default value
    const order = req.query.order || "asc"
    const offset = req.query.offset || 0
    const limit = req.query.limit || 10

    // removing them from Query since otherwise I'll automatically filter on them
    delete req.query.order
    delete req.query.offset
    delete req.query.limit

    let query = 'SELECT * FROM "Students" ' //create my query

    const params = []
    for (queryParam in req.query) { //for each value in query string, I'll filter
        params.push(req.query[queryParam])

        if (params.length === 1) // for the first, I'll add the where clause
            query += `WHERE ${queryParam} = $${params.length} `
        else // the all the rest, it'll start with AND
            query += ` AND ${queryParam} = $${params.length} `
    }

    query += " ORDER BY Title " + order  //adding the sorting 

    params.push (limit)
    query += ` LIMIT $${params.length} `
    params.push(offset)
    query += ` OFFSET $${params.length}`
    // query += ` LIMIT $${params.length+1} OFFSET $${params.length+2}` //adding the pagination
    // params.push(limit)
    // params.push(offset) 
    console.log(query)

    //you can also specify just the fields you are interested in, like:
    //SELECT asin, category, img, title, price FROM "Books" 
    const response = await db.query(query, params)
    res.send(response.rows)
})

studentRouter.get("/:id", async (req, res)=>{
    const response = await db.query('SELECT _id, firstname, surname, email FROM "Students" WHERE _id = $1', 
                                                                                        [ req.params.id ])

    if (response.rowCount === 0) 
        return res.status(404).send("Not found")

    res.send(response.rows[0])
})

studentRouter.post("/", async (req, res)=> {
    const response = await db.query(`INSERT INTO "Students" (id, firstname, surname, email) 
                                     Values ($1, $2, $3, $4)
                                     RETURNING *`, 
                                    [ req.body.id, req.body.firstname, req.body.surname, req.body.email])
    
    console.log(response)
    res.send(response.rows[0])
})

studentRouter.put("/:id", async (req, res)=> {
    try {
        let params = []
        let query = 'UPDATE "Students" SET '
        for (bodyParamName in req.body) {
            query += // for each element in the body I'll add something like parameterName = $Position
                (params.length > 0 ? ", " : '') + //I'll add a coma before the parameterName for every parameter but the first
                bodyParamName + " = $" + (params.length + 1) // += Category = $1 

            params.push(req.body[bodyParamName]) //save the current body parameter into the params array
        }

        params.push(req.params.id) //push the asin into the array
        query += " WHERE id = $" + (params.length) + " RETURNING *" //adding filtering for ASIN + returning
        console.log(query)

        const result = await db.query(query, params) //querying the DB for updating the row

        
        if (result.rowCount === 0) //if no element match the specified ASIN => 404
            return res.status(404).send("Not Found")

        res.send(result.rows[0]) //else, return the updated version
    }
    catch(ex) {
        console.log(ex)
        res.status(500).send(ex)
    }
})

studentRouter.delete("/:id", async (req, res) => {
    const response = await db.query(`DELETE FROM "Students" WHERE _id = $1`, [ req.params.id ])

    if (response.rowCount === 0)
        return res.status(404).send("Not Found")
    
    res.send("OK")
})

module.exports = studentRouter