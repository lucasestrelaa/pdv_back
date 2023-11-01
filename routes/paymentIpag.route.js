import express from "express";
import db from "../db/db.js";

const route = express.Router();

let baseUrlApi = "https://sandbox.ipag.com.br/service/"

let data = {
    "amount": 20,
    "callback_url": "google.com",
    "payment": {
        "type": "card",
        "method": "a vista",
        "installments": 1,
        "card": {
            "holder": "Lucas",
            "number": 4111111111111111,
            "expiry_month": "01",
            "expiry_year": "2025"
        },
        "customer": {
            "name": "Lucas",
            "cpf_cnpj": "04961955140",
            "email": "addtechltyda@gmail.com",
            "phone": "61991847687"
        }
    }
}

route.post('/createpayment', (req, res, next) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
    };
    fetch(`${baseUrlApi}payment`, options)
        .then(data => {
            if (!data.ok) {
                throw Error(data.status);
            }
            return data.json();
        }).then(update => {
            console.log(update);
        }).catch(e => {
            console.log(e);
        });
})

export default route;
