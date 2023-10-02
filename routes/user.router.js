import express from 'express'
import db from '../db/db.js'

const route = express.Router()

route.get('/', (req, res) => {
    db(`Select * from user`, res)
})
route.get('/:id_user', async function (req, res) {
    const id_user = req.params.id_user;
    db(`SELECT * FROM user where id_user = ${id_user}`, res);
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
    const dataFormatada = dataNFormatada.toISOString().split('T')[0] +" "+ dataNFormatada.getHours()+":"+ dataNFormatada.getMinutes().toFixed(2);
    db(`Insert into user (email, password, token, tokenNewPass, id_store, created_at, updated_at) values ('${email}', '${password}','${token}', '${tokenNewPass}', ${id_store}, '${dataFormatada}', '${dataFormatada}')`, res);
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
    const dataFormatada = dataNFormatada.toISOString().split('T')[0] +" "+ dataNFormatada.getHours()+":"+ dataNFormatada.getMinutes().toFixed(2);
    db(`update user set email = '${email}', password =  '${password}', token = '${token}' , token_newPass = '${tokenNewPass}' , id_store = '${id_store}', updated_at = '${dataFormatada} ' where id_user = ${id_user}`, res);
})

route.delete('/:id_user', (req, res) => {
    db(`delete from user where id_user = ${req.params.id_user}`, res);
})

export default route