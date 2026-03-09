const express = require("express");
const router = express.Router();
const pool = require("../config/db");

/* CREATE QUERY */
router.post("/", async (req, res) => {
  try {
    const { userType, email, phone, description } = req.body;

    await pool.query(
      `INSERT INTO contact_queries (user_type,email,phone,description)
       VALUES ($1,$2,$3,$4)`,
      [userType, email, phone, description]
    );

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;