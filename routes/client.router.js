import express from "express";
import db from "./../db/db.js";

const route = express.Router();

route.get("/", async (req, res, next) => {
  try {
    logger.info("get all client");
    db(`Select * from client`, res);
  } catch (error) {
    next(error);
  }
});
route.get("/client/:id_client", async function (req, res, next) {
  try {
    console.log('id_client: ', req.params.id_client)
    if (req.params.id_client != null) {
      logger.info("get client_id: ", req.params.id_client);
      const id_client = req.params.id_client;
      db(`SELECT * FROM client where id_client = ${id_client}`, res);
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});
route.get("/store/:id_store", async function (req, res, next) {
  try {
    if (req.params.id_store != null) {
      logger.info("get store_id: ", req.params.id_store);
      const id_store = req.params.id_store;
      db(`SELECT * FROM client where id_store = ${id_store}`, res);
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});

route.post("/", (req, res, next) => {
  try {
    if (req.body.name) {
      logger.info("create name client: ", req.body.name);
      const document = req.body.document;
      const name = req.body.name;
      const description = req.body.description;
      const phone_1 = req.body.phone_1;
      const phone_2 = req.body.phone_2;
      const email_1 = req.body.email_1;
      const email_2 = req.body.email_2;
      const address = req.body.address;
      const id_store = req.body.id_store;

      //validationclient
      const dataNFormatada = new Date();
      const dataFormatada =
        dataNFormatada.toISOString().split("T")[0] +
        " " +
        dataNFormatada.getHours() +
        ":" +
        dataNFormatada.getMinutes().toFixed(2);
      db(
        `Insert into client (document ,name, description, phone_1, phone_2, email_1, email_2, address,id_store, created_at, updated_at) values ('${document}' ,'${name}', '${description}', '${phone_1}', '${phone_2}', '${email_1}', '${email_2}', '${address}',${id_store}, '${dataFormatada}', '${dataFormatada}')`,
        res
      );
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});

route.put("/:id_client", (req, res, next) => {
  try {
    if (req.params.id_client != null) {
      logger.info("edit product_sale_id: ", req.params.id_client);
      const id_client = req.params.id_client;
      const document = req.body.document;
      const name = req.body.name;
      const description = req.body.description;
      const phone_1 = req.body.phone_1;
      const phone_2 = req.body.phone_2;
      const email_1 = req.body.email_1;
      const email_2 = req.body.email_2;
      const address = req.body.address;
      const id_store = req.body.id_store;
      //validation
      const dataNFormatada = new Date();
      const dataFormatada =
        dataNFormatada.toISOString().split("T")[0] +
        " " +
        dataNFormatada.getHours() +
        ":" +
        dataNFormatada.getMinutes().toFixed(2);

       
      db(
        `update client set document = '${document}' ,name ='${name}', description = '${description}',phone_1 = '${phone_1}',phone_2= '${phone_2}',email_1= '${email_1}',email_2= '${email_2}', address= '${address}', id_store='${id_store}', updated_at = '${dataFormatada} ' where id_client = ${id_client}`,
        res
      );
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});

route.delete("/:id_client", (req, res) => {
  try {
    if (req.params.id_client != null) {
      logger.info("delete client_id: ", req.params.id_client);
      db(
        `delete from client where id_client = ${req.params.id_client}`,
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
