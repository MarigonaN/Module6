const express = require("express")
const db = require("../../db")

const studentRouter = express.Router();


studentRouter.get("/", async(req, res)=>{
    
    const response = await db.query('SELECT * FROM "Students"')
    res.send(response.rows)
})

studentRouter.get("/:id", async (req, res)=>{
    const response = await db.query('SELECT _id, firstname, surname, email, dateOfBirth FROM "Students" WHERE _id= $1', 
                                                                                        [ req.params.id ])

    if (response.rowCount === 0) 
        return res.status(404).send("Not found")

    res.send(response.rows[0])
})

studentRouter.post("/checkEmail", async(req, res)=>{
    const checkEmail = await db.query(`SELECT _id, firstname, surname, email, dateOfBirth FROM "Students" WHERE email= $1`,[req.body.email])
    
    if(checkEmail.rowCount===0){

        const response = await db.query(`INSERT INTO "Students" (firstname, surname, email, dateOfBirth) 
                                     Values ($1, $2, $3, $4)
                                     RETURNING *`, 
                                    [ req.body.firstname, req.body.surname, req.body.email, req.body.dateOfbirth ])
        res.send(response.rows)
    }else{
        
        res.send("email exit")
    }
    
})

studentRouter.post("/", async (req, res)=> {
    const response = await db.query(`INSERT INTO "Students" (firstname, surname, email, dateOfBirth) 
                                     Values ($1, $2, $3, $4)
                                     RETURNING *`, 
                                    [ req.body.firstname, req.body.surname, req.body.email, req.body.dateOfbirth ])
    
  
    
    console.log(response)
    res.send(response.rows[0])
})

studentRouter.put("/:id", async (req, res)=> {
    try {
        let params = []
        let query = 'UPDATE "Students" SET '
        for (bodyParamName in req.body) {
            query += 
                (params.length > 0 ? ", " : '') + 
                bodyParamName + " = $" + (params.length + 1) 

            params.push(req.body[bodyParamName]) 
        }

        params.push(req.params.asin) //push the asin into the array
        query += " WHERE _id = $" + (params.length) + " RETURNING *" 
        console.log(query)

        const result = await db.query(query, params)

       
        if (result.rowCount === 0) //if no element match the specified ASIN => 404
            return res.status(404).send("Not Found")

        res.send(result.rows[0]) 
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