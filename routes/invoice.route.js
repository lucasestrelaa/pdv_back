import express from "express";
import db from "./../db/db.js";

const route = express.Router();

route.get("/", async (req, res, next) => {
    try {
      logger.info("get all invoices");
      db(`Select * from invoice`, res);
    } catch (error) {
      next(error);
    }
  });

route.post("/", (req, res) => {
    try {
        //fatura da loja
        //pegar a tabela de preços
        //pegar todas as lojas e armazenar com o valor da tabela de preço/pelo numero de dias do mês utilizado
        //gerar boleto
        //salvar no banco (cliente, referencia, valor, data de geração de fatura, data de vencimento, codigo de barras, paga ou não, criado, updated)


    } catch (error) {
        next(error);
    }
})

export default route;