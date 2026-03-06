





const pool = require("../config/db");

/* ================= CREATE JOB ================= */

exports.createJob = async (req, res) => {
  try {
    const {
      title,
      experience,
      industry,
      workMode,
      location,
      salaryFrom,
      salaryTo,
      salaryType,
      description,
      qualification,
      gender,
      skills,
      benefits,
      languages,
      questions,
      aboutCompany,
    } = req.body;

       const employerId = req.user.id;

    // 🔹 1️⃣ Get Employer Plan
    const userResult = await pool.query(
      "SELECT plan FROM users WHERE id=$1",
      [employerId]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Employer not found"
      });
    }

    const plan = userResult.rows[0].plan || "FREE";

    // 🔹 2️⃣ Define Plan Limits
    const PLAN_LIMITS = {
      FREE: 1,
      BASIC: 5,
      ENTERPRISE: 10,
    };

    const maxJobsAllowed = PLAN_LIMITS[plan] || 1;

    // 🔹 3️⃣ Count Active Jobs (excluding closed)
    const jobCountResult = await pool.query(
      "SELECT COUNT(*) FROM jobs WHERE employer_id=$1 AND status!='closed'",
      [employerId]
    );

    const activeJobsCount = parseInt(jobCountResult.rows[0].count);

    // 🔹 4️⃣ Check Limit
    if (activeJobsCount >= maxJobsAllowed) {
      return res.status(400).json({
        success: false,
        message: `Your ${plan} plan allows only ${maxJobsAllowed} active job(s). Please upgrade to post more jobs.`
      });
    }

    const result = await pool.query(
      `INSERT INTO jobs 
      (title, experience, industry, work_mode, location, 
       salary_from, salary_to, salary_type, description,
       qualification, gender, skills, benefits, languages,
       questions, about_company, employer_id, status)
      VALUES ($1,$2,$3,$4,$5,
              $6,$7,$8,$9,
              $10,$11,$12,$13,$14,
              $15,$16,$17,'pending')
      RETURNING *`,
      [
        title,
        experience,
        industry,
        workMode,
        location,
        salaryFrom,
        salaryTo,
        salaryType,
        description,
        qualification,
        gender,
        skills || [],
        benefits || [],
        languages || [],
        questions || [],
        aboutCompany,
        employerId,
      ]
    );

    res.json({ success: true, job: result.rows[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Job creation failed" });
  }
};

/* ================= GET EMPLOYER JOBS ================= */

exports.getEmployerJobs = async (req, res) => {
  try {
    const employerId = req.user.id; // ✅ THIS LINE BACK

    const result = await pool.query(
      "SELECT * FROM jobs WHERE employer_id=$1 ORDER BY created_at DESC",
      [employerId]
    );

    res.json({ success: true, jobs: result.rows });

  } catch (err) {
    console.log("GET EMPLOYER JOBS ERROR:", err);
    res.status(500).json({ success: false });
  }
};


/* ================= UPDATE JOB ================= */

exports.updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const employerId = req.user.id;

    const {
      title,
      experience,
      industry,
      workMode,
      location,
      salaryFrom,
      salaryTo,
      salaryType,
      description,
      qualification,
      gender,
      skills,
      benefits,
      languages,
      questions,
      aboutCompany,
    } = req.body;

    await pool.query(
      `UPDATE jobs SET
        title=$1,
        experience=$2,
        industry=$3,
        work_mode=$4,
        location=$5,
        salary_from=$6,
        salary_to=$7,
        salary_type=$8,
        description=$9,
        qualification=$10,
        gender=$11,
        skills=$12,
        benefits=$13,
        languages=$14,
        questions=$15,
        about_company=$16
       WHERE id=$17 AND employer_id=$18`,
      [
        title,
        experience,
        industry,
        workMode,
        location,
        salaryFrom,
        salaryTo,
        salaryType,
        description,
        qualification,
        gender,
        skills || [],
        benefits || [],
        languages || [],
        questions || [],
        aboutCompany,
        jobId,
        employerId,
      ]
    );

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Job update failed" });
  }
};

/* ================= DELETE JOB ================= */

exports.deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const employerId = req.user.id;

    await pool.query(
      "DELETE FROM jobs WHERE id=$1 AND employer_id=$2",
      [jobId, employerId]
    );

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Job delete failed" });
  }
};



exports.closeJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const employerId = req.user.id;

    await pool.query(
      "UPDATE jobs SET status='closed' WHERE id=$1 AND employer_id=$2",
      [jobId, employerId]
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};


// ✅ Get All Active Jobs (Public)
exports.getAllJobs = async (req, res) => {
  try {

    const result = await pool.query(
      "SELECT * FROM jobs WHERE status='approved' ORDER BY created_at DESC"
    );

    res.json({
      success: true,
      jobs: result.rows
    });

  } catch (err) {
    res.status(500).json({ success:false });
  }
};




exports.getSingleJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const result = await pool.query(
      "SELECT * FROM jobs WHERE id=$1",
      [jobId]
    );

    if (result.rows.length === 0) {
      return res.json({ success: false });
    }

    res.json({
      success: true,
      job: result.rows[0]
    });

  } catch (err) {
    res.status(500).json({ success: false });
  }
};





/* ================= GET SINGLE JOB ================= */
exports.getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT 
          j.*,
          e.company_name,
          e.logo,
          e.location AS company_location,
          e.website,
          e.phone,
          e.industry AS company_industry
       FROM jobs j
       LEFT JOIN employer_profile e 
       ON j.employer_id = e.employer_id
       WHERE j.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.json({ success: false });
    }

    res.json({ success: true, job: result.rows[0] });

  } catch (err) {
    console.log("JOB FETCH ERROR:", err.message);
    res.status(500).json({ success: false });
  }
};
