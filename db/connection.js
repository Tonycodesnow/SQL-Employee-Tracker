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
    console.log("Welcome now you are Connected to the Employees Database.")
  );

  module.exports = connection;