import express from 'express'
import db from './../db/db.js'

const route = express.Router()

route.get('/', async (req, res) => {
    db(`Select * from sale`, res)
})
route.get('/:id_store', async function (req, res) {
    const id_store = req.params.id_store;
    db(`SELECT * FROM sale where id_store = ${id_store}`, res);
});
// route.get('/:id_sale', async function (req, res) {
//     const id_sale = req.params.id_sale;
//     db(`SELECT * FROM sale where id_sale = ${id_sale}`, res);
// });

route.post('/', (req, res) => {
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
    const dataFormtatada = dataNFormatada.toISOString().split('T')[0] +" "+ dataNFormatada.getHours()+":"+ dataNFormatada.getMinutes().toFixed(2);
    db(`Insert into sale (price, paid, id_client,id_user, id_store, type_payment, payment_term, interest, created_at, updated_at) values ('${price}','${paid}', '${id_client}','${id_user}','${id_store}', '${type_payment}', ${payment_term}, ${interest}, '${dataFormtatada}', '${dataFormtatada}')`, res);
})

route.put('/:id_sale', (req, res) => {
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
    const dataFormtatada = dataNFormatada.toISOString().split('T')[0] +" "+ dataNFormatada.getHours()+":"+ dataNFormatada.getMinutes().toFixed(2);
    db(`update sale set price = ${price}, paid = '${paid}', id_client =  '${id_client}', id_user =  '${id_user}', id_store = '${id_store}' , type_payment = '${type_payment}' , payment_term = '${payment_term}, interest = '${interest}', updated_at = '${dataFormtatada} ' where id_sale = ${id_sale}`, res);
})

route.delete('/:id_sale', (req, res) => {
    db(`delete from sale where id_sale = ${req.params.id_sale}`, res);
})

export default route