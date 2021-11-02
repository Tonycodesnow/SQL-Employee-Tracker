// const express = require('express');
// const router = express.Router();
// const db = require('../../db/connection');

// // get all employees
// router.get("/employees", (req, res) => {
//     const sql = "SELECT * FROM employees";
  
//     db.query(sql, (err, row) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: "Success",
//         data: row,
//       });
//     });
//   });

//   // get a single employee
// router.get("/employee/:id", (req, res) => {
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
//   });

//   // Delete an employee
// router.delete("/employee/:id", (req, res) => {
//     const sql = "DELETE FROM employees WHERE id = ?";
//     const params = [req.params.id];
  
//     db.query(sql, params, (err, result) => {
//       if (err) {
//         res.statusMessage(400).json({ error: err.message });
//       } else if (!result.affectedRows) {
//         res.json({
//           message: "No employee found",
//         });
//       } else {
//         res.json({
//           message: "Deleted",
//           changes: result.affectedRows,
//           id: req.params.id,
//         });
//       }
//     });
//   });

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
// });

// module.exports = router;