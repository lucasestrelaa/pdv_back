import express from "express";
import db from "./../db/db.js";

const route = express.Router();

route.get("/", async (req, res, next) => {
  try {
    logger.info("get all supplier");
    db(`Select * from supplier`, res);
  } catch (error) {
    next(error);
  }
});
route.get("/:id_supplier", async function (req, res) {
  try {
    if (req.params.id_supplier != null) {
      logger.info("get supplier_id: ", req.params.id_supplier);
      const id_supplier = req.params.id_supplier;
      db(`SELECT * FROM supplier where id_supplier = ${id_supplier}`, res);
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});
route.get("/store/:id_store", async function (req, res) {
  try {
    if (req.params.id_store != null) {
      logger.info("get store_id: ", req.params.id_store);
      const id_store = req.params.id_store;
      db(`SELECT * FROM supplier where id_store = ${id_store}`, res);
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});

route.post("/", (req, res) => {
  try {
    if (req.body.name) {
      logger.info("create name supplier: ", req.body.name);
      const cnpj = req.body.cnpj;
      const name = req.body.name;
      const description = req.body.description;
      const phone_1 = req.body.phone_1;
      const phone_2 = req.body.phone_2;
      const email_1 = req.body.email_1;
      const email_2 = req.body.email_2;
      const address = req.body.address;

      //validationsupplier
      const dataNFormatada = new Date();
      const dataFormatada =
        dataNFormatada.toISOString().split("T")[0] +
        " " +
        dataNFormatada.getHours() +
        ":" +
        dataNFormatada.getMinutes().toFixed(2);
      db(
        `Insert into supplier (cnpj ,name, description, phone_1, phone_2, email_1, email_2, address, created_at, updated_at) values ('${cnpj}' ,'${name}', '${description}', '${phone_1}', '${phone_2}', '${email_1}', '${email_2}', '${address}', '${dataFormatada}', '${dataFormatada}')`,
        res
      );
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});

route.put("/:id_supplier", (req, res) => {
  try {
    if (req.params.id_supplier != null) {
      logger.info("edit product_sale_id: ", req.params.id_supplier);
      const cnpj = req.body.cnpj;
      const name = req.body.name;
      const description = req.body.description;
      const phone_1 = req.body.phone_1;
      const phone_2 = req.body.phone_2;
      const email_1 = req.body.email_1;
      const email_2 = req.body.email_2;
      const address = req.body.address;
      //validation
      const dataNFormatada = new Date();
      const dataFormatada =
        dataNFormatada.toISOString().split("T")[0] +
        " " +
        dataNFormatada.getHours() +
        ":" +
        dataNFormatada.getMinutes().toFixed(2);

       
      db(
        `update supplier set cnpj = '${cnpj}' ,name ='${name}', description = '${description}',phone_1 = '${phone_1}',phone_2= '${phone_2}',email_1= '${email_1}',email_2= '${email_2}', address= '${address}', updated_at = '${dataFormatada} ' where id_supplier = ${id_supplier}`,
        res
      );
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});

route.delete("/:id_supplier", (req, res) => {
  try {
    if (req.params.id_supplier != null) {
      logger.info("delete supplier_id: ", req.params.id_supplier);
      db(
        `delete from supplier where id_supplier = ${req.params.id_supplier}`,
        res
      );
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
