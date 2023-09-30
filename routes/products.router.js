import express from 'express'
import db from './../db/db.js'

const route = express.Router()

route.get('/', async (req, res) => {
    console.log('product geral')
    db(`Select * from products`, res)
})
route.get('/:id_product', async function (req, res) {
    console.log('product_id')
    const id_product = req.params.id_product;
    db(`SELECT * FROM products where id_product = ${id_product}`, res);
});
route.get('/:id_store', async function (req, res) {
    const id_store = req.params.id_store;
    db(`SELECT * FROM products where id_store = ${id_store}`, res);
});

route.post('/', (req, res) => {
    const name = ""+req.body.name;
    const category = req.body.category;
    const amount = req.body.amount;
    const price = req.body.price;
    const id_store = req.body.id_store;
    const color = req.body.color;
    const hex = req.body.hex;
    //validation
    const dataNFormatada = new Date();
    const dataFormtatada = dataNFormatada.toISOString().split('T')[0] +" "+ dataNFormatada.getHours()+":"+ dataNFormatada.getMinutes().toFixed(2);
    db(`Insert into products (name, category, amount, price, id_store, color, hex, created_at, updated_at) values ('${id_product}', '${name}', '${category}','${amount}', '${price}', ${id_store}, ${color}, ${hex}, '${dataFormtatada}', '${dataFormtatada}')`, res);
})
route.put('/:id_product', (req, res) => {
    const id_product = req.body.id_product;
    const name = ""+req.body.name;
    const category = req.body.category;
    const amount = req.body.amount;
    const price = req.body.price;
    const id_store = req.body.id_store;
    const color = req.body.color;
    const hex = req.body.hex;
    //validation
    const dataNFormatada = new Date();
    const dataFormtatada = dataNFormatada.toISOString().split('T')[0] +" "+ dataNFormatada.getHours()+":"+ dataNFormatada.getMinutes().toFixed(2);
    db(`update products set name = '${name}', category =  '${category}', amount = '${amount}' , price = '${price}' , id_store = '${id_store}, color = '${color}', hex = '${hex}', updated_at = '${dataFormtatada} ' where id_product = ${id_product}`, res);
})

route.delete('/:id_product', (req, res) => {
    db(`delete from products where id_product = ${req.params.id_product}`, res);
})

export default route