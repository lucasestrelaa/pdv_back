import express from "express";
import db from "./../db/db.js";

const route = express.Router();

route.get("/", async (req, res, next) => {
  try {
    logger.info("get all balances");
    db(`Select * from balance`, res);
  } catch (error) {
    next(error);
  }
});
route.get("/:id_balance", async function (req, res) {
  try {
    if (req.params.id_balance != null) {
      logger.info("get balance_id: ", req.params.id_balance);
      const id_balance = req.params.id_balance;
      db(`SELECT * FROM balance where id_balance = ${id_balance}`, res);
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});

route.post("/", (req, res) => {
  try {
    if (req.body.description) {
      logger.info("create description: ", req.body.description);
      const description = req.body.description;
      const amount = req.body.amount;
      const id_store = req.body.id_store;
      //validationbalance
      const dataNFormatada = new Date();
      const dataFormatada =
        dataNFormatada.toISOString().split("T")[0] +
        " " +
        dataNFormatada.getHours() +
        ":" +
        dataNFormatada.getMinutes().toFixed(2);
      db(
        `Insert into balance (description, amount, id_store, created_at, updated_at) values ('${description}',${amount}, ${id_store}, '${dataFormatada}', '${dataFormatada}')`,
        res
      );
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});

route.put("/:id_balance", (req, res) => {
  try {
    if (req.params.id_balance != null) {
      logger.info("edit product_sale_id: ", req.params.id_balance);
      const id_balance = req.params.id_balance;
      const description = req.body.description;
      const amount = req.body.amount;
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
        `update balance set description = '${description}', amount = ${amount}, id_store =  ${id_store}, updated_at = '${dataFormatada} ' where id_balance = ${id_balance}`,
        res
      );
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});

route.delete("/:id_balance", (req, res) => {
  try {
    if (req.params.id_balance != null) {
      logger.info("delete balance_id: ", req.params.id_balance);
      db(
        `delete from balance where id_balance = ${req.params.id_balance}`,
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
