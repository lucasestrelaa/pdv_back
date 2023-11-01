import express from "express";
import db from "./../db/db.js";

const route = express.Router();

route.get("/", async (req, res, next) => {
  try {
    logger.info("product geral");
    db(`Select * from products`, res);
  } catch (error) {
    next(error);
  }
});

route.get("/store/:id_store", async function (req, res, next) {
  console.log('id_store: ', req.params.id_store)
  try {
    if (req.params.id_store != null) {
      logger.info("search store_id", req.params.id_store);
      const id_store = req.params.id_store;
      db(`SELECT * FROM products where id_store = ${id_store}`, res);
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});
route.get("/product/:id_product", async function (req, res, next) {
  try {
    if (req.params.id_product != null) {
      logger.info("search product_id", req.params.id_product);
      const id_product = req.params.id_product;
      db(`SELECT * FROM products where id_product = ${id_product}`, res);
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});
route.post("/", (req, res, next) => {
  try {
    console.log(req.body)
    if (req.body.name != null) {
      logger.info("create Name", req.body.name);
      const name = "" + req.body.name;
      const category = req.body.category;
      const amount = req.body.amount;
      const price = req.body.price;
      const id_store = req.body.id_store;
      const color = req.body.color;
      const hex = req.body.hex;
      //validation
      const dataNFormatada = new Date();
      const dataFormtatada =
        dataNFormatada.toISOString().split("T")[0] +
        " " +
        dataNFormatada.getHours() +
        ":" +
        dataNFormatada.getMinutes().toFixed(2);
      const image = null;

      db(
        `Insert into products (name, category, amount, price, id_store, color,hex, image, created_at, updated_at) values ('${name}', '${category}', '${amount}', '${price}', ${id_store}, '${color}','${hex}','${image}', '${dataFormtatada}', '${dataFormtatada}')`,
        res
      );
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});
route.put("/:id_product", (req, res, next) => {
  try {
    if (req.params.id_product != null) {
      logger.info(
        "edit product_id: ",
        req.params.id_product,
        " - Name:",
        req.body.name
      );
      const id_product = req.params.id_product;
      const name = "" + req.body.name;
      const category = req.body.category;
      const amount = req.body.amount;
      const price = req.body.price;
      const id_store = req.body.id_store;
      const color = req.body.color;
      const hex = req.body.hex;
      //validation
      const dataNFormatada = new Date();
      const dataFormtatada =
        dataNFormatada.toISOString().split("T")[0] +
        " " +
        dataNFormatada.getHours() +
        ":" +
        dataNFormatada.getMinutes().toFixed(2);
      logger.info(
        "put",
        `update products set name = '${name}', category = '${category}', amount = ${amount} , price = ${price} , id_store = ${id_store}, color = '${color}', hex = '${hex}', updated_at = '${dataFormtatada} ' where id_product = ${id_product}`
      );
      db(
        `update products set name = '${name}', category = '${category}', amount = ${amount} , price = ${price} , id_store = ${id_store}, color = '${color}', hex = '${hex}', updated_at = '${dataFormtatada} ' where id_product = ${id_product}`,
        res
      );
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});

route.delete("/:id_product", (req, res, next) => {
  try {
    if (req.params.id_product != null) {
      logger.info("delet product_id: ", req.params.id_product);
      db(
        `delete from products where id_product = ${req.params.id_product}`,
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
