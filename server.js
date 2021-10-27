const mysql = require('mysql2');
const express = require("express");


const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// get all employees
// app.get('/api/employees', (req, res) => {
//     const sql = 'SELECT * FROM employees';

//     connection.query(sql, (err, row) => {
//         if (err) {
//             res.status(500).json({ error : err.message });
//             return;
//         }
//         res.json({
//             message: 'Success',
//             data: row
//         });
//     });
// });

// get a single employee
// app.get("/api/employee/:id", (req, res) => {
//     const sql = "SELECT * FROM employees WHERE id = ?";
//     const params = [req.params.id];
  
//     db.query(sql, params, (err, rows) => {
//       if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: "Success",
//         data: rows,
//       });
//     });
// });

// Delete an employee
// app.delete('/api/employee/:id', (req,res) => {
//     const sql = 'DELETE FROM employees WHERE id = ?';
//     const params = [req.params.id];
    
//     db.query(sql, params, (err, result) => {
//       if(err) {
//         res.statusMessage(400).json({ error: err.message });
//       } else if (!result.affectedRows) {
//         res.json({
//           message: 'No employee found',
//         });
//         } else {
//           res.json({
//             message: 'Deleted',
//             changes: result.affectedRows,
//             id: req.params.id
//           });
//         }
//     });
// });

// Create a employee
// app.post("/api/employee", ({ body }, res) => {
//     // const errors = SOMEWHERE(
//     //   "first_name",
//     //   "last_name",
//     //   "role_id",
//     //   "manager_id"
//     // );
//     if (errors) {
//       res.status(400).json({ error: errors });
//       return;
//     }
//     const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
//      VALUES (?, ?, ?, ?)`;
//     const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

//     db.query(sql, params, (err, result) => {
//       if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: "success",
//         data: body,
//       });
//     });
//   });

app.use((req, res) => {
    res.status(404).send();
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
