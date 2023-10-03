import express from 'express'
import db from './../db/db.js'

const route = express.Router()

route.get('/', async (req, res) => {
    console.log('get all sales')
    db(`Select * from sale`, res)
})
route.get('/:id_store', async function (req, res) {
    console.log('get store_id', req.params.id_store)
    const id_store = req.params.id_store;
    db(`SELECT * FROM sale where id_store = ${id_store}`, res);
});
route.get('/:id_client', async function (req, res) {
    console.log('get client_id', req.params.id_client)
    const id_store = req.params.id_store;
    db(`SELECT * FROM sale where id_client = ${id_client}`, res);
});
route.get('/:id_sale', async function (req, res) {
    console.log('get sale_id', req.params.id_sale)
    const id_store = req.params.id_sale;
    db(`SELECT * FROM sale where id_sale = ${id_sale}`, res);
});
route.get('/:id_user', async function (req, res) {
    console.log('get user_id', req.params.id_user)
    const id_store = req.params.id_user;
    db(`SELECT * FROM sale where id_user = ${id_user}`, res);
});


route.post('/', (req, res) => {
    console.log('create sale', req.params.req.body.id_store)
    const price = req.body.price;
    const paid = req.body.paid;
    const id_client = req.body.id_client;
    const id_user = req.body.id_user;
    const id_store = req.body.id_store;
    const type_payment = req.body.type_payment;
    const payment_term = req.body.payment_term;
    const interest = req.body.interest;
    //validationsale
    const dataNFormatada = new Date();
    const dataFormatada = dataNFormatada.toISOString().split('T')[0] +" "+ dataNFormatada.getHours()+":"+ dataNFormatada.getMinutes().toFixed(2);
    db(`Insert into sale (price, paid, id_client,id_user, id_store, type_payment, payment_term, interest, created_at, updated_at) values (${price},${paid}, ${id_client},${id_user},${id_store}, '${type_payment}', ${payment_term}, ${interest}, '${dataFormatada}', '${dataFormatada}')`, res);
})

route.put('/:id_sale', (req, res) => {
    console.log('edit sale', req.params.req.body.id_sale)
    const price = req.body.price;
    const paid = req.body.paid;
    const id_client = req.body.id_client;
    const id_user = req.body.id_user;
    const id_store = req.body.id_store;
    const type_payment = req.body.type_payment;
    const payment_term = req.body.payment_term;
    const interest = req.body.interest;
    //validation
    const dataNFormatada = new Date();
    const dataFormatada = dataNFormatada.toISOString().split('T')[0] +" "+ dataNFormatada.getHours()+":"+ dataNFormatada.getMinutes().toFixed(2);
    db(`update sale set price = ${price}, paid = ${paid}, id_client =  ${id_client}, id_user =  ${id_user}, id_store = ${id_store}, type_payment = '${type_payment}' , payment_term = ${payment_term}, interest = ${interest}, updated_at = '${dataFormatada} ' where id_sale = ${id_sale}`, res);
})

route.delete('/:id_sale', (req, res) => {
    console.log('delete sale', req.params.req.body.id_sale)
    db(`delete from sale where id_sale = ${req.params.id_sale}`, res);
})

export default route