import mysql from 'mysql2'

export default function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
        host     : 'localhost',
        port     : 3306,
        user     : 'id21317572_root',
        password : 'PassareiemConcursos@1',
        database : 'id21317572_addtech_sistema'
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