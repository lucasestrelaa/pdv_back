import express from "express";
import db from "./../db/db.js";

const route = express.Router();

route.get("/", async (req, res, next) => {
  try {
    logger.info("get all profile");
    db(`Select * from profile`, res);
  } catch (error) {
    next(error);
  }
});
route.get("/:id_profile", async function (req, res) {
  try {
    if (req.params.id_profile != null) {
      logger.info("get profile_id: ", req.params.id_profile);
      const id_profile = req.params.id_profile;
      db(`SELECT * FROM profile where id_profile = ${id_profile}`, res);
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
      logger.info("create name profile: ", req.body.name);
      const document = req.body.document;
      const name = req.body.name;
      const description = req.body.description;
      const phone_1 = req.body.phone_1;
      const phone_2 = req.body.phone_2;
      const email_1 = req.body.email_1;
      const email_2 = req.body.email_2;
      const address = req.body.address;

      //validationprofile
      const dataNFormatada = new Date();
      const dataFormatada =
        dataNFormatada.toISOString().split("T")[0] +
        " " +
        dataNFormatada.getHours() +
        ":" +
        dataNFormatada.getMinutes().toFixed(2);
      db(
        `Insert into profile (document ,name, description, phone_1, phone_2, email_1, email_2, address, created_at, updated_at) values ('${document}' ,'${name}', '${description}', '${phone_1}', '${phone_2}', '${email_1}', '${email_2}', '${address}', '${dataFormatada}', '${dataFormatada}')`,
        res
      );
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});

route.put("/:id_profile", (req, res) => {
  try {
    if (req.params.id_profile != null) {
      logger.info("edit product_sale_id: ", req.params.id_profile);
      const document = req.body.document;
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
        `update profile set document = '${document}' ,name ='${name}', description = '${description}',phone_1 = '${phone_1}',phone_2= '${phone_2}',email_1= '${email_1}',email_2= '${email_2}', address= '${address}', updated_at = '${dataFormatada} ' where id_profile = ${id_profile}`,
        res
      );
    } else {
      throw new Error("Parametros inválidos!");
    }
  } catch (error) {
    next(error);
  }
});

route.delete("/:id_profile", (req, res) => {
  try {
    if (req.params.id_profile != null) {
      logger.info("delete profile_id: ", req.params.id_profile);
      db(
        `delete from profile where id_profile = ${req.params.id_profile}`,
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
