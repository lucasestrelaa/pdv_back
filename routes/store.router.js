import express from 'express'
import db from './../db/db.js'

const route = express.Router()

route.get('/', async (req, res) => {
    try {
        if(req.params.id_product != null){
            
        }else{
            throw new Error("Parametros inválidos!");
        }
    } catch (error) {
        next(error)
    }
    console.log('get all stores')
    db(`Select * from store`, res)
})
route.get('/:id_store', async function (req, res) {
    console.log('get store_id: ', req.params.id_store)
    const id_store = req.params.id_store;
    db(`SELECT * FROM store where id_store = ${id_store}`, res);
});

route.post('/', (req, res) => {
    console.log('create store_id: ', req.body.cnpj)
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
    const dataFormatada = dataNFormatada.toISOString().split('T')[0] +" "+ dataNFormatada.getHours()+":"+ dataNFormatada.getMinutes().toFixed(2);
    db(`Insert into store (cnpj, fantasy_name, corporation_reason, phone_1, phone_2, email_1, email_2, adress, cep, created_at, updated_at) values ('${cnpj}','${fantasy_name}', '${corporation_reason}','${phone_1}', '${phone_2}', '${email_1}', '${email_2}', '${adress}', '${cep}', '${dataFormatada}', '${dataFormatada}')`, res);
})

route.put('/:id_store', (req, res) => {
    console.log('edit store_id: ', req.params.id_store, ' - CNPJ:', req.body.cnpj)
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
    const dataFormatada = dataNFormatada.toISOString().split('T')[0] +" "+ dataNFormatada.getHours()+":"+ dataNFormatada.getMinutes().toFixed(2);
    db(`update store set cnpj = '${cnpj}', fantasy_name = '${fantasy_name}', corporation_reason =  '${corporation_reason}', phone_1 = '${phone_1}' , phone_2 = '${phone_2}' , email_1 = '${email_1}', email_2 = '${email_2}', address = '${adress}', cep = '${cep}', updated_at = '${dataFormatada} ' where id_store = ${id_store}`, res);
})

route.delete('/:id_store', (req, res) => {
    console.log('delete store_id: ', req.params.id_store)
    db(`delete from store where id_store = ${req.params.id_store}`, res);
})

export default route