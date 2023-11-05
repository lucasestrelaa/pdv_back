import express from "express";
import db from "./../db/db.js";

const route = express.Router();

route.get("/", async (req, res, next) => {
  try {
    logger.info("select all products of sales");
    db(`Select * from product_sale`, res);
  } catch (error) {
    next(error);
  }
});
route.get("/productsale/:id_product_sale", async function (req, res, next) {
  try {
    if (req.params.id_product_sale != null) {
      logger.info("search product_sale_id: ", req.params.id_product_sale);
      const id_product_sale = req.params.id_product_sale;
      db(
        `SELECT * FROM product_sale where id_product_sale = ${id_product_sale}`,
        res
      );
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
      logger.info("search product_id: ", req.params.id_product);
      const id_product = req.params.id_product;
      db(`SELECT * FROM product_sale where id_product = ${id_product}`, res);
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});
route.get("/sale/:id_sale", async function (req, res, next) {
  try {
    if (req.params.id_product_sale != null) {
      logger.info("search sale_id: ", req.params.id_sale);
      const id_sale = req.params.id_sale;
      db(`SELECT * FROM product_sale where id_sale = ${id_sale}`, res);
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});

route.post("/", (req, res, next) => {
  try {
    if (req.body.name != null) {
      logger.info("create Name:", req.body.name);
      //const id_sale = req.body.id_sale;
      const id_product = req.body.id_product;
      const id_store = req.body.id_store;
      const keytransaction = req.body.keytransaction
      //validationproduct_sale
      const dataNFormatada = new Date();
      const dataFormtatada =
        dataNFormatada.toISOString().split("T")[0] +
        " " +
        dataNFormatada.getHours() +
        ":" +
        dataNFormatada.getMinutes().toFixed(2);
      db(
        `Insert into product_sale ( id_product, id_store,keytransaction, created_at, updated_at) values ( ${id_product}, ${id_store},${keytransaction},'${dataFormtatada}', '${dataFormtatada}')`,
        res
      );
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});

route.put("/:id_product_sale", (req, res, next) => {
  try {
    if (req.params.id_product_sale != null) {
      logger.info("edit product_sale_id: ", req.params.id_product_sale);
      const id_product_sale = req.body.id_product_sale;
      const id_sale = req.body.id_sale;
      const id_product = req.body.id_product;
      //validation
      const dataNFormatada = new Date();
      const dataFormtatada =
        dataNFormatada.toISOString().split("T")[0] +
        " " +
        dataNFormatada.getHours() +
        ":" +
        dataNFormatada.getMinutes().toFixed(2);
      db(
        `update product_sale set id_sale = ${id_sale}, id_product = ${id_product}, id_store = ${id_store}, updated_at = '${dataFormtatada} ' where id_product_sale = ${id_product_sale}`,
        res
      );
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});

route.delete("/:id_product_sale", (req, res, next) => {
  try {
    if (req.params.id_product_sale != null) {
      logger.info("delete product_sale_id: ", req.params.id_product_sale);
      db(
        `delete from product_sale where id_product_sale = ${req.params.id_product_sale}`,
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
