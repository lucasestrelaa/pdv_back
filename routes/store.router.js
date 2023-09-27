import express from 'express'
import db from './../db/db.js'

const route = express.Router()

route.get('/', async (req, res) => {
    db(`Select * from store`, res)
})
route.get('/:id_store', async function (req, res) {
    const id_store = req.params.id_store;
    db(`SELECT * FROM store where id_store = ${id_store}`, res);
});

route.post('/', (req, res) => {
    const cnpj = req.body.cnpj;
    const fantasy_name = req.body.fantasy_name;
    const corporation_reason = req.body.corporation_reason;
    const phone_1 = req.body.phone_1;
    const phone_2 = req.body.phone_2;
    const email_1 = req.body.email_1;
    const email_2 = req.body.email_2;
    const adress = req.body.adress;
    const cep = req.body.cep;
    //validationstore
    const dataNFormatada = new Date();
    const dataFormtatada = dataNFormatada.toISOString().split('T')[0] +" "+ dataNFormatada.getHours()+":"+ dataNFormatada.getMinutes().toFixed(2);
    db(`Insert into store (cnpj, fantasy_name, corporation_reason, phone_1, phone_2, email_1, email_2, adress, cep, created_at, updated_at) values ('${cnpj}','${fantasy_name}', '${corporation_reason}','${phone_1}', '${phone_2}', ${email_1}, ${email_2}, ${adress}, ${cep}, '${dataFormtatada}', '${dataFormtatada}')`, res);
})

route.put('/:id_store', (req, res) => {
    const id_store = req.body.id_store;
    const cnpj = req.body.cnpj;
    const fantasy_name = req.body.fantasy_name;
    const corporation_reason = req.body.corporation_reason;
    const phone_1 = req.body.phone_1;
    const phone_2 = req.body.phone_2;
    const email_1 = req.body.email_1;
    const email_2 = req.body.email_2;
    const adress = req.body.adress;
    const cep = req.body.cep;
    //validation
    const dataNFormatada = new Date();
    const dataFormtatada = dataNFormatada.toISOString().split('T')[0] +" "+ dataNFormatada.getHours()+":"+ dataNFormatada.getMinutes().toFixed(2);
    db(`update store set cnpj = ${cnpj}, fantasy_name = '${fantasy_name}', corporation_reason =  '${corporation_reason}', phone_1 = '${phone_1}' , phone_2 = '${phone_2}' , store = '${store}, email_1 = '${email_1}', email_2 = '${email_2}', address = '${adress}', cep = '${cep}', updated_at = '${dataFormtatada} ' where id_store = ${id_store}`, res);
})

route.delete('/:id_store', (req, res) => {
    db(`delete from store where id_store = ${req.params.id_store}`, res);
})

export default route