// const express = require("express");
// const db = require("./db/connection");
const inquirer = require("inquirer");
// const apiRoutes = require("./routes/apiRoutes");
const cTable = require("console.table");
const connection = require("./db/connection");

connection.connect(function (err) {
  if (err) throw err;
  begin();
});

var roleArray = [];
var managerArray = [];

// function which Begins the prompts for the user
function begin() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: [
          "View All the employees",
          "View All the employees By Department",
          "View All the employees by Role",
          "Add An employee",
          "Add A Department",
          "Add A Role",
          "Update the employee Role",
          "Quit",
        ],
      },
    ])
    .then(function (answer) {
      switch (answer.action) {
        case "View All the employees":
          viewAll();
          break;
        case "View All the employees By Department":
          viewDept();
          break;
        case "View All the employees by Role":
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
        case "Update the employee Role":
          updateEmployee();
          break;
        case "Quit":
          return;
      }
    });
}

// View the list of all employees
function viewAll() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, CONCAT(manager.first_name, ' ' ,manager.last_name) AS manager FROM employee INNER JOIN role on employee.role_id = role.id INNER JOIN department on department.id = role.department_id left join employee manager on employee.manager_id = employee.id;",
    function (err, res) {
      if (err) throw err;

      console.table(res);
      begin();
    }
  );
}

// viewRole
function viewRole() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "list",
          name: "role",
          message: "Which role would you like to see?",
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
        connection.query(
          "SELECT employee.first_name, employee.last_name, role.title, role.salary, CONCAT(manager.first_name, ' ' ,manager.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department on department.id = role.department_id left join employee manager on employee.manager_id = employee.id;",
          function (err, res) {
            var roleArray = [];
            for (var i = 0; i < res.length; i++) {
              if (answer.role === res[i].title) {
                roleArray.push(res[i]);
              }
            }
            console.table(roleArray);
            begin();
          }
        );
      });
  });
}

// Add a department
function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the department ?",
      },
    ])
    .then(function (res) {
      connection.query("INSERT INTO department SET ?", {
        department: res.department,
      });
      console.log("Department Added");
      begin();
    });
}

// View the list of all employees by department
function viewDept() {
  // Select all departments from database
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "list",
          name: "department",
          message: "Which department's employee would you like to see?",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              console.log(choiceArray);
              choiceArray.push(res[i].department);
            }
            return choiceArray;
          },
        },
      ])
      .then(function (answer) {
        connection.query(
          "SELECT employee.first_name, employee.last_name, role.title, role.salary, FROM employee INNER JOIN dempartment ON employee.role_id = role.id INNER JOIN department on department.id = role.department_id",
          function (err, res) {
            var deptArray = [];
            for (var i = 0; i < res.length; i++) {
              if (answer.department === res[i].department) {
                deptArray.push(res[i]);
              }
            }
            console.table(deptArray);
            begin();
          }
        );
      });
  });
}

// add a new role
// ask user for role title, salary, and department
function addRole() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the title of the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the role?",
        },
        {
          type: "list",
          name: "department",
          message: "Which department does the role belong to?",
          // choices will be populated by the readDept function
          choices: readDept(),
        },
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.department,
          },
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " role inserted!\n");
            begin();
          }
        );
      });
  });
}

// Select types of roles from database
function readRole() {
  connection.query("SELECT * FROM role", function () {});
  return roleArray;
}

// Select managers from database
function readManager() {
  connection.query(
    "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL",
    function () {}
  );
  return managerArray;
}

// Add an employees
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employees's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employees's last name?",
      },
      {
        type: "list",
        name: "role",
        message: "What is the employees's role?",
        choices: readRole(),
        // make a list where the user can choose a role
      },
      {
        type: "list",
        name: "manager",
        message:
          "Who is the employees's manager?(may be Null if There is no manager)",
        choices: readManager(),
      },
    ])
    .then(function (answers) {
      var roleId = readRole().indexOf(answers.role) + 1;
      var managerId = readManager().indexOf(answers.manager) + 1;
      connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          role_id: roleId,
          manager_id: managerId,
        },
        function (err) {
          if (err) throw err;
          console.log("Added employee!");
          begin();
        }
      );
    });
}

// Add a role
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What is the name of the role ?",
        choices: [],
      },
    ])
    .then(function (res) {
      connection.query("INSERT INTO role SET ?", res);
      console.log("Role Added");
      begin();
    });
}

// Update the employees's role
function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employees's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employees's last name?",
      },
      // {
      //   type: "list",
      //   name: "role",
      //   message: "What is the employees's role?",
      //   choices: readRole(),
      // },
      {
        type: "list",
        name: "manager",
        message:
          "Who is the employees's manager?(may be Null if There is no manager)",
        choices: readManager(),
      },
    ])
    .then(function (answers) {
      console.log(readRole());
      var roleId = readRole().indexOf(answers.role) + 1;
      var managerId = readManager().indexOf(answers.manager) + 1;
      connection.query(
        "UPDATE employee SET ? WHERE ?",
        [
          {
            role_id: roleId,
            manager_id: managerId,
          },
          {
            first_name: answers.firstName,
            last_name: answers.lastName,
          },
        ],
        function (err) {
          if (err) throw err;
          console.log("Updated employee!");
          begin();
        }
      );
    });
}