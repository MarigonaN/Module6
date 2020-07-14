// const express = require("express")
// const db = require("../../db")
// const books = require("../../../students.json")

// const router = express.Router()

// router.post("/import", async (req, res) => {

//     const response = await db.query('SELECT id  FROM "Students"')


//     const idList = response.rows.map(x => x.asin)

//     let total = 0
//     let skipped = 0

//     books.forEach(async book => {
//         if (asinList.indexOf(book.asin) === -1){
         
//             await db.query(`INSERT INTO "Books" (ASIN, Category, Img, Title, Price) 
//                                                 Values ($1, $2, $3, $4, $5)`, 
//                                                 [ book.asin, book.category, book.img, book.title, book.price])
//             total++ 
//         } 
//         else { 
//             console.log(`Element ${book.asin} is already in the DB!`)
//             skipped++
//         }
//     })

//     res.send({ 
//         added: total,
//         skipped
//     })
// })

// router.get("/", async(req, res)=>{
  
//     const order = req.query.order || "asc"
//     const offset = req.query.offset || 0
//     const limit = req.query.limit || 10


//     delete req.query.order
//     delete req.query.offset
//     delete req.query.limit

//     let query = 'SELECT * FROM "Students" '

//     const params = []
//     for (queryParam in req.query) { 
//         params.push(req.query[queryParam])

//         if (params.length === 1)
//             query += `WHERE ${queryParam} = $${params.length} `
//         else 
//             query += ` AND ${queryParam} = $${params.length} `
//     }

//     query += " ORDER BY Title " + order  

//     params.push (limit)
//     query += ` LIMIT $${params.length} `
//     params.push(offset)
//     query += ` OFFSET $${params.length}`
  
//     console.log(query)

 
//     const response = await db.query(query, params)
//     res.send(response.rows)
// })

// router.get("/:asin", async (req, res)=>{
//     const response = await db.query('SELECT asin, category, img, title, price FROM "Books" WHERE ASIN = $1', 
//                                                                                         [ req.params.asin ])

//     if (response.rowCount === 0) 
//         return res.status(404).send("Not found")

//     res.send(response.rows[0])
// })

// router.post("/", async (req, res)=> {
//     const response = await db.query(`INSERT INTO "Books" (ASIN, Category, Img, Title, Price) 
//                                      Values ($1, $2, $3, $4, $5)
//                                      RETURNING *`, 
//                                     [ req.body.asin, req.body.category, req.body.img, req.body.title, req.body.price ])
    
//     console.log(response)
//     res.send(response.rows[0])
// })

// router.put("/:asin", async (req, res)=> {
//     try {
//         let params = []
//         let query = 'UPDATE "Books" SET '
//         for (bodyParamName in req.body) {
//             query += 
//                 (params.length > 0 ? ", " : '') + 
//                 bodyParamName + " = $" + (params.length + 1)

//             params.push(req.body[bodyParamName]) 
//         }

//         params.push(req.params.asin)
//         query += " WHERE asin = $" + (params.length) + " RETURNING *"
//         console.log(query)

//         const result = await db.query(query, params) 


        
//         if (result.rowCount === 0) 
//             return res.status(404).send("Not Found")

//         res.send(result.rows[0]) 
//     }
//     catch(ex) {
//         console.log(ex)
//         res.status(500).send(ex)
//     }
// })

// router.delete("/:asin", async (req, res) => {
//     const response = await db.query(`DELETE FROM "Books" WHERE ASIN = $1`, [ req.params.asin ])

//     if (response.rowCount === 0)
//         return res.status(404).send("Not Found")
    
//     res.send("OK")
// })

// module.exports = router