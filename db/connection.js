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
    console.log("Connected to the employees database.")
  );

  module.exports = connection;