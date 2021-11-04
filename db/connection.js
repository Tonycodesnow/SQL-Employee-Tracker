const mysql = require("mysql2");


const connection = mysql.createConnection(
    {
      host: "localhost",
      // Your MySQL username,
      user: "root",
      // Your MySQL password
      password: "",
      database: "employees_db",
    },
    console.log("Connected to the employees database.")
  );

  module.exports = connection;