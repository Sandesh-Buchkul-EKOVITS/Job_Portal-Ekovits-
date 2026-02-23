const pool = require("../config/db");

/* ================= SAVE JOB ================= */

exports.saveJob = async (req, res) => {
  try {

    const userId = req.user.id;
     console.log("Logged User ID:", req.user.id);  
    const jobId = req.params.jobId;

    // Check already saved
    const existing = await pool.query(
      "SELECT * FROM saved_jobs WHERE user_id=$1 AND job_id=$2",
      [userId, jobId]
    );

    if (existing.rows.length > 0) {
      return res.json({ success: false, message: "Already saved" });
    }

    await pool.query(
      "INSERT INTO saved_jobs (user_id, job_id) VALUES ($1,$2)",
      [userId, jobId]
    );

    res.json({ success: true });

  } catch (err) {
    console.error("Save Job Error:", err);
    res.status(500).json({ success: false });
  }
};


/* ================= GET SAVED JOBS ================= */
exports.getSavedJobs = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT j.*
       FROM saved_jobs s
       JOIN jobs j ON s.job_id = j.id
       WHERE s.user_id = $1
       ORDER BY s.created_at DESC`,
      [userId]
    );

    res.json({
      success: true,
      savedJobs: result.rows
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};


/* ================= REMOVE SAVED JOB ================= */

exports.removeSavedJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const jobId = req.params.jobId;

    await pool.query(
      "DELETE FROM saved_jobs WHERE user_id=$1 AND job_id=$2",
      [userId, jobId]
    );

    res.json({ success: true });

  } catch (err) {
    console.error("Remove Saved Job Error:", err);
    res.status(500).json({ success: false });
  }
};
