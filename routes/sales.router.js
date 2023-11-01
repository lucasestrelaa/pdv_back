import express from "express";
import db from "./../db/db.js";

const route = express.Router();

route.get("/", async (req, res) => {
  try {
    logger.info("get all sales");
    db(`Select * from sale`, res);
  } catch (error) {
    next(error);
  }
});
route.get("/store/:id_store", async function (req, res) {
  try {
    if (req.params.id_store != null) {
      logger.info("get store_id", req.params.id_store);
      const id_store = req.params.id_store;
      db(`SELECT * FROM sale where id_store = ${id_store}`, res);
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});
route.get("/client/:id_client", async function (req, res) {
  try {
    if (req.params.id_client != null) {
      logger.info("get client_id", req.params.id_client);
      const id_store = req.params.id_store;
      db(`SELECT * FROM sale where id_client = ${id_client}`, res);
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});
route.get("/sale/:id_sale", async function (req, res, next) {
  try {
    if (req.params.id_sale != null) {
      logger.info("get sale_id", req.params.id_sale);
      const id_store = req.params.id_sale;
      db(`SELECT * FROM sale where id_sale = ${id_sale}`, res);
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});
route.get("/user/:id_user", async function (req, res, next) {
  try {
    if (req.params.id_user != null) {
      logger.info("get user_id", req.params.id_user);
      const id_store = req.params.id_user;
      db(`SELECT * FROM sale where id_user = ${id_user}`, res);
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});

route.post("/", (req, res, next) => {
  try {
    if (req.body.id_store != null) {
      logger.info("create sale", req.body.id_store);
      const price = req.body.price;
      const paid = req.body.paid;
      const id_client = req.body.id_client;
      const id_user = req.body.id_user;
      const id_store = req.body.id_store;
      const type_payment = req.body.type_payment;
      const payment_term = req.body.payment_term;
      const interest = req.body.interest;
      //validationsale
      const dataNFormatada = new Date();
      const dataFormatada =
        dataNFormatada.toISOString().split("T")[0] +
        " " +
        dataNFormatada.getHours() +
        ":" +
        dataNFormatada.getMinutes().toFixed(2);
      db(
        `Insert into sale (price, paid, id_client,id_user, id_store, type_payment, payment_term, interest, created_at, updated_at) values (${price},${paid}, ${id_client},${id_user},${id_store}, '${type_payment}', ${payment_term}, ${interest}, '${dataFormatada}', '${dataFormatada}')`,
        res
      );
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});

route.put("/:id_sale", (req, res, next) => {
  try {
    if (req.params.id_sale != null) {
      logger.info("edit sale", req.params.req.body.id_sale);
      const price = req.body.price;
      const paid = req.body.paid;
      const id_client = req.body.id_client;
      const id_user = req.body.id_user;
      const id_store = req.body.id_store;
      const type_payment = req.body.type_payment;
      const payment_term = req.body.payment_term;
      const interest = req.body.interest;
      //validation
      const dataNFormatada = new Date();
      const dataFormatada =
        dataNFormatada.toISOString().split("T")[0] +
        " " +
        dataNFormatada.getHours() +
        ":" +
        dataNFormatada.getMinutes().toFixed(2);
      db(
        `update sale set price = ${price}, paid = ${paid}, id_client =  ${id_client}, id_user =  ${id_user}, id_store = ${id_store}, type_payment = '${type_payment}' , payment_term = ${payment_term}, interest = ${interest}, updated_at = '${dataFormatada} ' where id_sale = ${id_sale}`,
        res
      );
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});

route.delete("/:id_sale", (req, res, next) => {
  try {
    if (req.params.id_sale != null) {
      logger.info("delete sale", req.params.req.body.id_sale);
      db(`delete from sale where id_sale = ${req.params.id_sale}`, res);
    } else {
      throw new Error("Parâmetros inválidos!");
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
