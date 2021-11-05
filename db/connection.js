const mysql = require("mysql2");


const connection = mysql.createConnection(
    {
      host: "localhost",
      // Your MySQL username,
      user: "root",
      // Your MySQL password
      password: "#Lun8#K8i#D0m1?",
      database: "employees_db",
    },
    console.log("Welcome now you are Connected to the Employees Database.")
  );

  module.exports = connection;