const express = require("express");
const db = require("./db/connection");
const inquirer = require("inquirer");
const apiRoutes = require("./routes/apiRoutes");
const cTable = require("console.table");

const app = express();
const PORT = process.env.PORT || 3001;

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use api routes
app.use("/api", apiRoutes);

app.use((req, res) => {
  res.status(404).send();
});

// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// function which Begins the prompts for the user 
function begin() {
  inquirer
  .prompt([
    {
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: [
          "View All the Employees",
          "View All the Employees By Department",
          "View All the Employees by Role",
          "Add An Employee",
          "Add A Department",
          "Add A Role",
          "Update the Employee Role",
          "Quit",
        ],
      },
    ])
    .then(function (res) {
      switch (res.action) {
        case "View All the Employees":
          viewAll();
          break;
          case "View All the Employees By Department":
            viewDept();
            break;
            case "View All the Employees by Role":
              viewRole();
          break;
          case "Add An Employee":
            addEmployee();
            break;
            case "Add A Department":
          addDept();
          break;
          case "Add A Role":
            addRole();
          break;
          case "Update the Employee Role":
            updateEmployee();
            break;
            case "Quit":
              return;
            }
    });
  }
  
  // View the list of all employees
  function viewAll() {
    db.query(
      "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
      function (err, res) {
        if (err) throw err;
  
        console.table(res);
        begin();
      }
    );
  }

  // View the list of all employees by department
  function viewDept() {
    db.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    
    inquirer
    .prompt([
      {
        type: "list",
        name: "department",
        message: "Which department's employees would you like to see?",
        choices: function () {
          var choiceArray = [];
          for (var i = 0; i < res.length; i++) {
              choiceArray.push(res[i].department);
            }
            return choiceArray;
          },
        },
      ])
      .then(function (answer) {
        db.query(
          "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id",
          function (err, res) {
            var deptArr = [];
            for (var i = 0; i < res.length; i++) {
              if (answer.department === res[i].department) {
                deptArr.push(res[i]);
              }
            }
            console.table(deptArr);
            begin();
          }
        );
      });
  });
}

// View list of employees by role
function viewRole() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "list",
          name: "role",
          message: "Which role's employees would you like to see?",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push(res[i].title);
            }
            return choiceArray;
          },
        },
      ])
      .then(function (answer) {
        db.query(
          "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id",
          function (err, res) {
            var roleArr = [];
            for (var i = 0; i < res.length; i++) {
              if (answer.role === res[i].title) {
                roleArr.push(res[i]);
              }
            }
            console.table(roleArr);
            begin();
          }
        );
      });
  });
}

// Select types of roles from database
var roleArr = [];
function readRoles() {
  db.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
  });
  return roleArr;
}

// Select managers from database
var managerArr = [];
function readManager() {
  db.query(
    "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL",
    function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        managerArr.push(res[i].first_name + " " + res[i].last_name);
      }
    }
  );
  return managerArr;
}

// Add employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: readRoles(),
      },
      {
        type: "list",
        name: "manager",
        message: "Who is the employee's manager?",
        choices: readManager(),
      },
    ])
    .then(function (answers) {
      var roleId = readRoles().indexOf(answers.role) + 1;
      var managerId = readManager().indexOf(answers.manager) + 1;
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          manager_id: managerId,
          role_id: roleId,
        },
        function (err) {
          if (err) throw err;
          console.log("Added Employee!");
          begin();
        }
      );
    });
}

// Add departments
function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the department?",
      },
    ])
    .then(function (res) {
      db.query("INSERT INTO department SET ?", {
        department: res.department,
      });
      console.log("Department Added");
      begin();
    });
}

// Add role
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What is the name of the role?",
      },
    ])
    .then(function (res) {
      connection.query("INSERT INTO role SET?", {
        title: res.role,
      });
      console.log("Role Added");
      begin();
    });
}

// Update the employee's role
function updateEmployee() {
  db.query(
    "SELECT employee.first_name, role.title FROM employee INNER JOIN role on role.id = employee.role_id ",
    function (err, res) {
      if (err) throw err;

      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Which employee's role will you update?",
            choices: function () {
              var employeeArr = [];
              for (var i = 0; i < res.length; i++) {
                employeeArr.push(res[i].first_name);
              }
              return employeeArr;
            },
          },
          {
            type: "list",
            name: "role",
            message: "Which role will you assign the selected employee?",
            choices: function () {
              var roleArr = [];
              for (var i = 0; i < res.length; i++) {
                roleArr.push(res[i].title);
              }
              return roleArr;
            },
          },
        ])
        .then(function (answer) {
          var roleId = readRoles().indexOf(answer.role) + 1;
          db.query(
            "UPDATE employee SET ? WHERE ? ",
            [
              {
                role_id: roleId,
              },
              {
                first_name: answer.employee,
              },
            ],
            function (err, res) {
              if (err) throw err;
              console.log("Role Updated!");
              begin();
            }
          );
        });
    }
  );
}

