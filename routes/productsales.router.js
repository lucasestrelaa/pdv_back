import express from 'express'
import db from './../db/db.js'

const route = express.Router()

route.get('/', async (req, res) => {
    db(`Select * from product_sale`, res)
})
route.get('/:id_product_sale', async function (req, res) {
    const id_product_sale = req.params.id_product_sale;
    execSQLQuery(`SELECT * FROM product_sale where id_product_sale = ${id_product_sale}`, res);
});

route.post('/', (req, res) => {
    const id_sale = req.body.id_sale;
    const id_product = req.body.id_product;
    const id_store = req.body.id_store;
    //validationproduct_sale
    const dataNFormatada = new Date();
    const dataFormtatada = dataNFormatada.toISOString().split('T')[0] +" "+ dataNFormatada.getHours()+":"+ dataNFormatada.getMinutes().toFixed(2);
    execSQLQuery(`Insert into product_sale (id_sale, id_product, id_store, created_at, updated_at) values ('${id_sale}', '${id_product}', ${id_store},'${dataFormtatada}', '${dataFormtatada}')`, res);
})

route.put('/:id_product_sale', (req, res) => {
    const id_product_sale = req.body.id_product_sale;
    const id_sale = req.body.id_sale;
    const id_product = req.body.id_product;
    //validation
    const dataNFormatada = new Date();
    const dataFormtatada = dataNFormatada.toISOString().split('T')[0] +" "+ dataNFormatada.getHours()+":"+ dataNFormatada.getMinutes().toFixed(2);
    execSQLQuery(`update product_sale set id_sale = ${id_sale}, id_product = '${id_product}', id_store = ${id_store}, updated_at = '${dataFormtatada} ' where id_product_sale = ${id_product_sale}`, res);
})

route.delete('/:id_product_sale', (req, res) => {
    execSQLQuery(`delete from product_sale where id_product_sale = ${req.params.id_product_sale}`, res);
})

export default route