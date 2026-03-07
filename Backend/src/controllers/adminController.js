// const pool = require("../config/db");

// /* ================= DASHBOARD STATS ================= */
// exports.getDashboardStats = async (req, res) => {
//   try {
//     const users = await pool.query("SELECT COUNT(*) FROM users");
//     const employers = await pool.query("SELECT COUNT(*) FROM users WHERE role='employer'");
//     const candidates = await pool.query("SELECT COUNT(*) FROM users WHERE role='candidate'");
//     const jobs = await pool.query("SELECT COUNT(*) FROM jobs");

//     res.json({
//       success: true,
//       stats: {
//         totalUsers: users.rows[0].count,
//         employers: employers.rows[0].count,
//         candidates: candidates.rows[0].count,
//         jobs: jobs.rows[0].count
//       }
//     });

//   } catch (err) {
//     res.status(500).json({ success: false });
//   }
// };

// /* ================= GET ALL EMPLOYERS ================= */
// exports.getAllEmployers = async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT u.id, u.name, u.email,
//              ep.company_name,
//              ep.verified,
//              ep.verification_requested
//       FROM users u
//       LEFT JOIN employer_profile ep
//       ON u.id = ep.employer_id
//       WHERE u.role='employer'
//     `);

//     res.json({ success: true, employers: result.rows });

//   } catch (err) {
//     res.status(500).json({ success: false });
//   }
// };

// /* ================= VERIFY EMPLOYER ================= */
// exports.verifyEmployer = async (req, res) => {
//   try {
//     const employerId = req.params.id;

//     await pool.query(
//       "UPDATE employer_profile SET verified=true, verification_requested=false WHERE employer_id=$1",
//       [employerId]
//     );

//     res.json({ success: true });

//   } catch (err) {
//     res.status(500).json({ success: false });
//   }
// };































const pool = require("../config/db");


/* ================= DASHBOARD STATS ================= */
const getDashboardStats = async (req, res) => {
  try {
    const users = await pool.query("SELECT COUNT(*) FROM users");
    const employers = await pool.query("SELECT COUNT(*) FROM users WHERE role='employer'");
    const candidates = await pool.query("SELECT COUNT(*) FROM users WHERE role='candidate'");
    const jobs = await pool.query("SELECT COUNT(*) FROM jobs");

    const pending = await pool.query("SELECT COUNT(*) FROM jobs WHERE status='pending'");
    const approved = await pool.query("SELECT COUNT(*) FROM jobs WHERE status='approved'");
    const rejected = await pool.query("SELECT COUNT(*) FROM jobs WHERE status='rejected'");

    res.json({
      success: true,
      stats: {
        totalUsers: Number(users.rows[0].count),
        employers: Number(employers.rows[0].count),
        candidates: Number(candidates.rows[0].count),
        jobs: Number(jobs.rows[0].count),
        pendingJobs: Number(pending.rows[0].count),
        approvedJobs: Number(approved.rows[0].count),
        rejectedJobs: Number(rejected.rows[0].count)
      }
    });

  } catch (err) {
    console.error("Dashboard Stats Error:", err);
    res.status(500).json({ success: false });
  }
};


/* ================= GET ALL EMPLOYERS ================= */
const getAllEmployers = async (req, res) => {
  try {
const result = await pool.query(`
  SELECT 
    u.id,
    u.name,
    u.email,
    u.plan,  -- 🔥 THIS IS MISSING
    u.blocked,
    ep.company_name,
    COALESCE(ep.verified, false) AS verified,
    COALESCE(ep.verification_requested, false) AS verification_requested
  FROM users u
  LEFT JOIN employer_profile ep
  ON u.id = ep.employer_id
  WHERE u.role='employer'
  ORDER BY u.id DESC
`);


    res.json({
      success: true,
      employers: result.rows
    });

  } catch (err) {
    console.error("Get Employers Error:", err);
    res.status(500).json({ success: false });
  }
};

const updateEmployerPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { plan } = req.body;

    // 🔥 1️⃣ Update plan in users table
    await pool.query(
      "UPDATE users SET plan=$1 WHERE id=$2",
      [plan, id]
    );

    // 🔥 2️⃣ Optional: clear plan_request if you want
    await pool.query(
      "UPDATE employer_profile SET plan_request=NULL WHERE employer_id=$1",
      [id]
    );

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};


/* ================= VERIFY EMPLOYER ================= */
// const verifyEmployer = async (req, res) => {
//   try {
//     const employerId = req.params.id;

//     // Check profile exists
//     const existing = await pool.query(
//       "SELECT * FROM employer_profile WHERE employer_id=$1",
//       [employerId]
//     );

//     if (existing.rows.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Employer profile not found"
//       });
//     }

//     await pool.query(
//       `UPDATE employer_profile
//        SET verified=true,
//            verification_requested=false,
//            updated_at=NOW()
//        WHERE employer_id=$1`,
//       [employerId]
//     );

//     res.json({ success: true });

//   } catch (err) {
//     console.error("Verify Employer Error:", err);
//     res.status(500).json({ success: false });
//   }
// };



const verifyEmployer = async (req, res) => {
  try {
    const employerId = req.params.id;
    const { verified } = req.body;

    await pool.query(
      `UPDATE employer_profile
       SET verified=$1,
           verification_requested=false,
           updated_at=NOW()
       WHERE employer_id=$2`,
      [verified, employerId]
    );

    res.json({ success: true });

  } catch (err) {
    console.error("Verify Employer Error:", err);
    res.status(500).json({ success: false });
  }
};









/* ================= GET ALL JOBS ================= */
const getAllJobs = async (req, res) => {
  try {

    const { status } = req.query;

    let query = `
      SELECT 
        j.*,
        ep.company_name
      FROM jobs j
      LEFT JOIN employer_profile ep
      ON j.employer_id = ep.employer_id
    `;

    let values = [];

    if (status && status !== "all") {
      query += " WHERE LOWER(j.status) = LOWER($1)";
      values.push(status);
    }

    query += " ORDER BY j.id DESC";

    const result = await pool.query(query, values);

    res.json({
      success: true,
      jobs: result.rows
    });

  } catch (err) {
    console.error("Get Jobs Error:", err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

/* ================= UPDATE JOB STATUS ================= */
const updateJobStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await pool.query(
      "UPDATE jobs SET status=$1 WHERE id=$2",
      [status, id]
    );

    res.json({ success: true });

  } catch (err) {
    console.error("Update Job Error:", err);
    res.status(500).json({ success: false });
  }
};












/* ================= GET ALL USERS ================= */
const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, role, blocked FROM users ORDER BY id DESC"
    );

    res.json({
      success: true,
      users: result.rows
    });

  } catch (err) {
    console.error("Get Users Error:", err);
    res.status(500).json({ success: false });
  }
};

/* ================= GET ALL CANDIDATES ================= */
const getAllCandidates = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, blocked FROM users WHERE role='candidate' ORDER BY id DESC"
    );

    res.json({
      success: true,
      candidates: result.rows
    });

  } catch (err) {
    console.error("Get Candidates Error:", err);
    res.status(500).json({ success: false });
  }
};

const toggleUserBlock = async (req, res) => {
  try {

    const { id } = req.params;

    const result = await pool.query(
      "SELECT blocked FROM users WHERE id=$1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.json({ success:false });
    }

    const blocked = result.rows[0].blocked;

    await pool.query(
      "UPDATE users SET blocked=$1 WHERE id=$2",
      [!blocked, id]
    );

    res.json({ success:true });

  } catch (err) {
    console.log("BLOCK USER ERROR:", err);
    res.status(500).json({ success:false });
  }
};



const bcrypt = require("bcrypt");

const resetUserPassword = async (req, res) => {
  try {

    const { id } = req.params;

    const tempPassword = Math.random().toString(36).slice(-8);

    const hash = await bcrypt.hash(tempPassword, 10);

    await pool.query(
      "UPDATE users SET password=$1 WHERE id=$2",
      [hash, id]
    );

    res.json({
      success:true,
      tempPassword
    });

  } catch (err) {
    console.log("RESET PASSWORD ERROR:", err);
    res.status(500).json({ success:false });
  }
};



// const deleteUser = async (req, res) => {
//   try {

//     const { id } = req.params;

//     await pool.query(
//       "DELETE FROM users WHERE id=$1",
//       [id]
//     );

//     res.json({ success:true });

//   } catch (err) {
//     console.log("DELETE USER ERROR:", err);
//     res.status(500).json({ success:false });
//   }
// };




// exports.deleteUser = async (req, res) => {

//   try {

//     const userId = req.params.id;

//     await pool.query(
//       "DELETE FROM users WHERE id=$1",
//       [userId]
//     );

//     res.json({
//       success: true,
//       message: "User deleted"
//     });

//   } catch (err) {

//     console.log(err);

//     res.status(500).json({
//       success:false
//     });

//   }

// };

const deleteUser = async (req, res) => {

  try {

    const userId = req.params.id;

    await pool.query(
      "DELETE FROM users WHERE id=$1",
      [userId]
    );

    res.json({
      success: true,
      message: "User deleted"
    });

  } catch (err) {

    console.log("DELETE USER ERROR:", err);

    res.status(500).json({
      success:false
    });

  }

};




const getSingleEmployer = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT 
        u.id,
        u.email,
        ep.company_name,
        ep.phone,
        ep.website,
        ep.location,
        ep.industry,
        ep.company_size,
        ep.founded_year,
        ep.gst_number,
        ep.about_company,
        ep.logo,
        ep.linkedin,
        ep.twitter,
        ep.verified,
        ep.verification_status,
        ep.created_at
      FROM users u
      LEFT JOIN employer_profile ep 
        ON u.id = ep.employer_id
      WHERE u.id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.json({ success: false });
    }

    res.json({
      success: true,
      employer: result.rows[0],
    });

  } catch (err) {
    console.error("GET SINGLE EMPLOYER ERROR:", err);
    res.status(500).json({ success: false });
  }
};




/* ================= GET PLAN UPGRADE REQUESTS ================= */
const getPlanUpgradeRequests = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        u.id,
        u.email,
        ep.company_name,
        ep.plan_request
      FROM users u
      JOIN employer_profile ep
        ON u.id = ep.employer_id
      WHERE ep.plan_request IS NOT NULL
      ORDER BY u.id DESC
    `);

    res.json({
      success: true,
      requests: result.rows
    });

  } catch (err) {
    console.error("PLAN REQUEST FETCH ERROR:", err);
    res.status(500).json({ success: false });
  }
};

const deleteJob = async (req, res) => {
  try {

    const { id } = req.params;

    await pool.query(
      "DELETE FROM jobs WHERE id=$1",
      [id]
    );

    res.json({
      success: true,
      message: "Job deleted"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success:false
    });
  }
};

module.exports = {
  getDashboardStats,
  getAllEmployers,
  updateEmployerPlan,
  verifyEmployer,
  getAllJobs,
updateJobStatus,
  getAllUsers,
  getSingleEmployer,
  getAllCandidates,
  getPlanUpgradeRequests,
   toggleUserBlock,
  resetUserPassword,
  deleteJob,
  deleteUser

};