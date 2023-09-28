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

      if(error) 
        return error;
      else
        connection.end();
        console.log(results[0])
        if(results[0]){
          if(results[0].token){
            const token = jwt({ email: results[0].token });
            console.log("token",token)
            res.json({"status": "autorizado!", "token": token});
          }else{
            res.json(results)
          }
        }else{
          res.json(results)
        }
      console.log('executou!');
  });
}