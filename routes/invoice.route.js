import express from "express";
import db from "./../db/db.js";

const route = express.Router();

route.get("/", (req, res, next) => {
    try {
        logger.info("get all invoices");
        db(`Select * from invoice`, res);
    } catch (error) {
        next(error);
    }
});

route.get("/:id_store", async function (req, res, next) {
    try {
        if (req.params.id_store != null) {
            logger.info("get invoice of reference: ", req.params.id_store);
            const id_store = req.params.id_store;
            db(`SELECT * FROM invoice where id_store = ${id_store}`, res);
        } else {
            throw new Error("Parametros inválidos!");
        }
    } catch (error) {
        next(error);
    }
});
route.get("/reference/:reference", async function (req, res, next) {
    try {
        if (req.params.reference != null) {
            logger.info("get invoice from reference: ", req.params.reference);
            const reference = req.params.reference;
            db(`SELECT * FROM invoice where reference = ${reference}`, res);
        } else {
            throw new Error("Parametros inválidos!");
        }
    } catch (error) {
        next(error);
    }
});

//fatura da loja
//pegar a tabela de preços
//pegar todas as lojas e armazenar com o valor da tabela de preço/pelo numero de dias do mês utilizado
//gerar boleto
//salvar no banco (cliente, referencia, valor, data de geração de fatura, data de vencimento, codigo de barras, paga ou não, criado, updated)

route.post("/", (req, res, next) => {
    try {
        if (req.body.reference != null) {
            logger.info(
                "create invoice: ",
                req.body.reference,
                " - to store : ",
                req.body.id_store
            );
            const description = req.body.description;
            const reference = "" + req.body.reference;
            const price = req.body.price;
            const paid = req.body.paid;
            const id_store = req.body.id_store;
            const payday = req.body.payday;
            //validation
            const dataNFormatada = new Date();
            const dataFormatada =
                dataNFormatada.toISOString().split("T")[0] +
                " " +
                dataNFormatada.getHours() +
                ":" +
                dataNFormatada.getMinutes().toFixed(2);
            db(
                `Insert into invoice (description, reference, price,id_store, paid, payday, created_at, updated_at) 
                values ('${description}', '${reference}','${price}', ${id_store}, '${paid}', ${payday}, '${dataFormatada}', '${dataFormatada}')`,
                res
            );
        } else {
            throw new Error("Parametros inválidos!");
        }
    } catch (error) {
        next(error);
    }
});

route.put("/:id_invoice", (req, res, next) => {
    try {
        if (req.params.id_invoice != null) {
            logger.info("edit invoice: ", req.params.id_invoice, " from store: ", id_store);
            const description = req.body.description;
            const reference = "" + req.body.reference;
            const price = req.body.price;
            const paid = req.body.paid;
            const id_store = req.body.id_store;
            const payday = req.body.payday;
            //validation
            const dataNFormatada = new Date();
            const dataFormatada =
                dataNFormatada.toISOString().split("T")[0] +
                " " +
                dataNFormatada.getHours() +
                ":" +
                dataNFormatada.getMinutes().toFixed(2);
            db(
                `update invoice set description = '${description}', reference =  '${reference}', price = '${price}' , paid = '${paid}' , id_store = '${id_store}', payday = ${payday}, updated_at = '${dataFormatada} ' where id_invoice = ${id_invoice}`,
                res
            );
        } else {
            throw new Error("Parametros inválidos!");
        }
    } catch (error) {
        next(error);
    }
});

route.delete("/:id_invoice", (req, res, next) => {
    try {
        if (req.params.id_invoice != null) {
            logger.info("delete invoice: ", req.params.id_invoice);
            db(`delete from invoice where id_invoice = ${req.params.id_invoice}`, res);
        } else {
            throw new Error("Parametros inválidos!");
        }
    } catch (error) {
        next(error);
    }
});

route.use((err, req, res, next) => {
    logger.error(`${err.message}`);
    res.status(400).send({ error: err.message });
});

export default route;