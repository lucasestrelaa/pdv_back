import express from 'express'
import db from './../db/db.js'

const route = express.Router()

route.get('/', async (req, res) => {
    db(`Select * from balance`, res)
})
route.get('/:id_balance', async function (req, res) {
    const id_balance = req.params.id_balance;
    db(`SELECT * FROM balance where id_balance = ${id_balance}`, res);
});

route.post('/', (req, res) => {
    const description = req.body.description;
    const amount = req.body.amount;
    const id_store = req.body.id_store;
    //validationbalance
    const dataNFormatada = new Date();
    const dataFormatada = dataNFormatada.toISOString().split('T')[0] +" "+ dataNFormatada.getHours()+":"+ dataNFormatada.getMinutes().toFixed(2);
    db(`Insert into balance (description, amount, id_store, created_at, updated_at) values ('${description}',${amount}, ${id_store}, '${dataFormatada}', '${dataFormatada}')`, res);
})

route.put('/:id_balance', (req, res) => {
    const id_balance = req.params.id_balance;
    const description = req.body.description;
    const amount = req.body.amount;
    const id_store = req.body.id_store;
    //validation
    const dataNFormatada = new Date();
    const dataFormatada = dataNFormatada.toISOString().split('T')[0] +" "+ dataNFormatada.getHours()+":"+ dataNFormatada.getMinutes().toFixed(2);
    db(`update balance set description = '${description}', amount = ${amount}, id_store =  ${id_store}, updated_at = '${dataFormatada} ' where id_balance = ${id_balance}`, res);
})

route.delete('/:id_balance', (req, res) => {
    db(`delete from balance where id_balance = ${req.params.id_balance}`, res);
})

export default route