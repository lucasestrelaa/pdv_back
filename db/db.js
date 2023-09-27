import mysql from 'mysql2'

export default function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
        host     : process.env.DB_HOST,
        port     : 3306,
        user     : process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DBNAME
    });
 
  connection.query(sqlQry, (error, results, fields) => {
      if(error) 
        return error;
      else
      res.json(results);
      console.log('executou!');
      connection.end();
  });
}