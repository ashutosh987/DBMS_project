require('dotenv').config();
var mysql=require('mysql');
var mysqlConnection=mysql.createConnection({
    host: "localhost",
  user: "root",
  password: "alokgarg#01",
  database: "dbms",
    multipleStatements:true
});

mysqlConnection.connect((err)=>{
    if (err) throw err;
   else console.log('Connected!');
   
})
module.exports=mysqlConnection;