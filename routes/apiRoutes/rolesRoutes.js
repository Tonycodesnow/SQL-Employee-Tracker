const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

router.get("/roles", (req, res) => {
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "Success",
      data: rows,
    });
  });
});

router.get("/role/:id", (req, res) => {
  const sql = `SELECT * FROM roles WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Success",
      data: rows,
    });
  });
});

router.delete("/role/:id", (req, res) => {
  const sql = `DELETE FROM roles WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "No role found",
      });
    } else {
      res.json({
        message: "Deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

module.exports = router;