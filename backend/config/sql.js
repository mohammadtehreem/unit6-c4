const mysql = require("mysql2");
require("dotenv").config();
const sqlConnect = mysql.createConnection({
  host: "mysql-3f05fa9b-tehreemmohammad-3cff.i.aivencloud.com",
  port: "19589",
  user: "avnadmin",
  password: process.env.SQL_PASS,
  database: "bookstore",
});

sqlConnect.connect();
module.exports = sqlConnect;
