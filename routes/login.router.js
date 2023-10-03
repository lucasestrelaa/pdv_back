import express from 'express'
import db from '../db/db.js'
import jwt from './../jwt/jwt.js'

const route = express.Router()

// route.get('/', (req, res) => {
//     // res.send('teste login')
//     // console.log(res)
//     db(`Select * from user`, res)
// })

route.post('/', async (req, res) => {
    // console.log(res.body)
    if(!req.body.email || !req.body.password){
        throw new Error('Parametros inválidos!')
    }
    const email = req.body.email
    const password =  req.body.password
    try {
        const data = await db(`Select id_user, id_store, token, email from user where email = '${email}' and password = '${password}'`,res)        
        // res.json(token);
        return 
    } catch (error) {
        
    }
})

// route.get('/', async (req, res) => {
//     if(!req.body.email || !req.body.password){
//         throw new Error('Parametros inválidos!')
//     }
//     const email = req.body.email
//     const password =  req.body.password
//     db(`Select token from user where email = '${email}' and password = '${password}'`, res)
// })

export default route