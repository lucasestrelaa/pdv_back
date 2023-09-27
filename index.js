/** 
 * conectar com a base de dados
 * loja
 * login
 * produtos
*/
import express from "express";
import "dotenv/config.js";
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken'


//routes
import loginRouter from './routes/login.router.js'
import userRouter from './routes/user.router.js'
import productRouter from './routes/products.router.js'
import salesRouter from './routes/sales.router.js'
import storeRouter from './routes/store.router.js'
import productsalesRouter from './routes/productsales.router.js'
import balanceRouter from './routes/balance.router.js'



const app = express()

app.use(express.json())
app.use(cookieParser())

function authenticateToken(req, res, next) {
    console.log(req.headers['authorization'])
    const authHeader = req.headers['authorization']
    console.log('authHeader:',authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    console.log('token:',token)
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }

app.use('/login', loginRouter)
app.use('/user',authenticateToken, userRouter)
app.use('/product',authenticateToken, productRouter)
app.use('/sales',authenticateToken, salesRouter)
app.use('/store',authenticateToken, storeRouter)
app.use('/productsales',authenticateToken, productsalesRouter)
app.use('/balance',authenticateToken, balanceRouter)


app.listen(3001, () => {
    console.log('servidor rodando!')
})