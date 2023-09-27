/** 
 * conectar com a base de dados
 * loja
 * login
 * produtos
*/
import express from "express";
import loginRouter from './routes/login.router.js'
import productRouter from './routes/products.router.js'

const app = express()

app.use(express.json())

app.use('/login', loginRouter)
app.use('/product', productRouter)


app.listen(3001, () => {
    console.log('servidor rodando!')
})