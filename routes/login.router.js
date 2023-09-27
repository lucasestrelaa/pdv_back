import express from 'express'
import db from '../db/db.js'

const route = express.Router()

route.get('/', async (req, res) => {
    db(`Select * from user`, res)
})
route.get('/:id_user', async function (req, res) {
    const id_user = req.params.id_user;
    execSQLQuery(`SELECT * FROM user where id_user = ${id_user}`, res);
});

route.post('/', (req, res) => {
    const id_user = req.body.id_user;
    const email = ""+req.body.email;
    const password = md5(req.body.password);
    const token = md5(req.body.token);
    const tokenNewPass = md5(req.body.tokenNewPass);
    const id_store = req.body.id_store;
    //validation
    const dataNFormatada = new Date();
    const dataFormtatada = dataNFormatada.toISOString().split('T')[0] +" "+ dataNFormatada.getHours()+":"+ dataNFormatada.getMinutes().toFixed(2);
    execSQLQuery(`Insert into user (email, password, token, tokenNewPass, id_store, created_at, updated_at) values ('${email}', '${password}','${token}', '${tokenNewPass}', ${id_store}, '${dataFormtatada}', '${dataFormtatada}')`, res);
})
route.put('/:id_user', (req, res) => {
    const id_user = req.body.id_user;
    const email = ""+req.body.email;
    const password = md5(req.body.password);
    const token = md5(req.body.token);
    const tokenNewPass = md5(req.body.tokenNewPass);
    const id_store = req.body.id_store;
    //validation
    const dataNFormatada = new Date();
    const dataFormtatada = dataNFormatada.toISOString().split('T')[0] +" "+ dataNFormatada.getHours()+":"+ dataNFormatada.getMinutes().toFixed(2);
    execSQLQuery(`update user set email = '${email}', password =  '${password}', token = '${token}' , tokenNewPass = '${tokenNewPass}' , id_store = '${id_store}', store = '${store}, updated_at = '${dataFormtatada} ' where id_user = ${id_user}`, res);
})

route.delete('/:id_user', (req, res) => {
    execSQLQuery(`delete from user where id_user = ${req.params.id_user}`, res);
})

export default route