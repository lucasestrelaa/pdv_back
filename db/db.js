import mysql from 'mysql2'
import jwt from './../jwt/jwt.js'

export default async function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
        host     : process.env.DB_HOST,
        port     : 3306,
        user     : process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DBNAME
    });
 
  connection.query(sqlQry, async (error, results, fields) => {

      // if(error) 
      //   return error;
      // else
        connection.end();
        // console.log(results[0])
        try {
          if(results[0] != undefined){ 
            if(results[0].token){
              console.log('email', results)
              const token = jwt({ email: results[0].token });
              res.json({"status": "autorizado!", "token": token, "id_user": results[0].id_user, "id_store": results[0].id_store});
            }else{
              res.json(results)
            }
            logger.info("Success!")
          }else{
            logger.error("Dados não encontrados")
            res.send("dados não encontrados!")
          }

        } catch (error) {
          logger.error(error)
        }
        
      console.log('executou!');
  });
}