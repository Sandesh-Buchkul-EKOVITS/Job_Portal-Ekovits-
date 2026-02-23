const pool = require("../config/db");

/* ================= APPLY JOB ================= */

exports.applyJob = async (req, res) => {
  try {
    const userId = req.user.id; // JWT se
    const jobId = req.params.jobId;

    // Check already applied
    const existing = await pool.query(
      "SELECT * FROM applications WHERE user_id=$1 AND job_id=$2",
      [userId, jobId]
    );

    if (existing.rows.length > 0) {
      return res.json({
        success: false,
        message: "You already applied for this job",
      });
    }

    // Check 50 limit
    const total = await pool.query(
      "SELECT COUNT(*) FROM applications WHERE job_id=$1",
      [jobId]
    );

    if (parseInt(total.rows[0].count) >= 50) {
      return res.json({
        success: false,
        message: "Application limit reached",
      });
    }

    await pool.query(
      `INSERT INTO applications 
      (job_id, user_id, status) 
      VALUES ($1,$2,'applied')`,
      [jobId, userId]
    );

    res.json({ success: true });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};


/* ================= JOB APPLICATION INFO ================= */

exports.getJobApplicationInfo = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user.id;

    const total = await pool.query(
      "SELECT COUNT(*) FROM applications WHERE job_id=$1",
      [jobId]
    );

    const existing = await pool.query(
      "SELECT * FROM applications WHERE job_id=$1 AND user_id=$2",
      [jobId, userId]
    );

    res.json({
      success: true,
      total: parseInt(total.rows[0].count),
      alreadyApplied: existing.rows.length > 0,
      status: existing.rows[0]?.status || null,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};


exports.getEmployerApplications = async (req, res) => {
  try {
    const employerId = req.user.id;

    const result = await pool.query(
      `SELECT a.*, j.title, u.name, u.email
       FROM applications a
       JOIN jobs j ON a.job_id = j.id
       JOIN users u ON a.user_id = u.id
       WHERE j.employer_id = $1
       ORDER BY a.applied_at DESC`,
      [employerId]
    );

    res.json({ success: true, applications: result.rows });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};



exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    await pool.query(
      "UPDATE applications SET status=$1 WHERE id=$2",
      [status, applicationId]
    );

    res.json({ success: true });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};

// ✅ Candidate Applications
exports.getCandidateApplications = async (req, res) => {
  try {
    const candidateId = req.user.id;

      console.log("Logged in candidate ID:", candidateId);

    const result = await pool.query(
      `SELECT applications.*, jobs.title, jobs.location, jobs.work_mode
       FROM applications
       JOIN jobs ON jobs.id = applications.job_id
       WHERE applications.user_id = $1
        ORDER BY applications.applied_at DESC`,
      [candidateId]
    );

    res.json({ success: true, applications: result.rows });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};
