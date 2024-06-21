import express from "express";
import db from "../db/db.js";

const route = express.Router();

let baseUrlApi = "https://sandbox.ipag.com.br/service/payment"

let data = {
    "amount": 20,
    "callback_url": "https://addictiontech.com.br/testeServidor/",
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
//data 2 peguei do site da ipag
let data2 = {
    "amount": 10.00,
    "callback_url": "https://exemplosite.com.br/ipag/callback",
    "order_id": "1000000",
    "capture": false,
    "payment": {
        "type": "card",
        "method": "visa",
        "installments": 1,
        "card": {
            "holder": "FULANO DA SILVA",
            "number": "4111 1111 1111 1111",
            "expiry_month": "12",
            "expiry_year": "2030",
            "cvv": "123"
        }
    },
    "customer": {
        "name": "Fulano da Silva",
        "cpf_cnpj": "79999338801"
    }
}

route.post('/createpayment', (req, res, next) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic E557-38DC8ED7-DB228A9D-B05AAA95-C7BE',
            'x-api-version': '2'
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
