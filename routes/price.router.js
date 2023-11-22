import express from "express";
import db from "../db/db.js";

const route = express.Router();

route.get("/", (req, res, next) => {
  try {
    logger.info("get all prices");
    db(`Select price from price where status = 'A'`, res);
  } catch (error) {
    next(error);
  }
});
route.use((err, req, res, next) => {
    logger.error(`${err.message}`);
    res.status(400).send({ error: err.message });
  });
  
  export default route;