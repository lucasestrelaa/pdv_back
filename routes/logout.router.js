import express from "express";
import db from "../db/db.js";
import jwt from "./../jwt/jwt.js";

const route = express.Router();

// route.get('/', (req, res) => {
//     // res.send('teste login')
//     // logger.info(res)
//     db(`Select * from user`, res)
// })

route.post("/", async (req, res, next) => {
  try {
    console.log(req)
    
// function destroyToken(token){
//   // return jwt.destroy(token)
// }
    
  } catch (error) {
    next(error);
  }
});

route.use((err, req, res, next) => {
  logger.error(`${err.message}`);
  res.status(400).send({ error: err.message });
});

// route.get('/', async (req, res) => {
//     if(!req.body.email || !req.body.password){
//         throw new Error('Parametros inválidos!')
//     }
//     const email = req.body.email
//     const password =  req.body.password
//     db(`Select token from user where email = '${email}' and password = '${password}'`, res)
// })

export default route;
