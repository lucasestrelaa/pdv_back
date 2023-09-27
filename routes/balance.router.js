import express from 'express'
import db from './../db/db.js'

const route = express.Router()

route.get('/', async (req, res) => {
    db(`Select * from balance`, res)
})
route.get('/:id_balance', async function (req, res) {
    const id_balance = req.params.id_balance;
    execSQLQuery(`SELECT * FROM balance where id_balance = ${id_balance}`, res);
});

route.post('/', (req, res) => {
    const description = req.body.description;
    const amount = req.body.amount;
    const id_store = req.body.id_store;
    //validationbalance
    const dataNFormatada = new Date();
    const dataFormtatada = dataNFormatada.toISOString().split('T')[0] +" "+ dataNFormatada.getHours()+":"+ dataNFormatada.getMinutes().toFixed(2);
    execSQLQuery(`Insert into balance (description, amount, id_store, created_at, updated_at) values ('${description}','${amount}', '${id_store}', '${dataFormtatada}', '${dataFormtatada}')`, res);
})

route.put('/:id_balance', (req, res) => {
    const id_balance = req.params.id_balance;
    const description = req.body.description;
    const amount = req.body.amount;
    const id_store = req.body.id_store;
    //validation
    const dataNFormatada = new Date();
    const dataFormtatada = dataNFormatada.toISOString().split('T')[0] +" "+ dataNFormatada.getHours()+":"+ dataNFormatada.getMinutes().toFixed(2);
    execSQLQuery(`update balance set description = ${description}, amount = '${amount}', id_store =  '${id_store}', updated_at = '${dataFormtatada} ' where id_balance = ${id_balance}`, res);
})

route.delete('/:id_balance', (req, res) => {
    execSQLQuery(`delete from balance where id_balance = ${req.params.id_balance}`, res);
})

export default route