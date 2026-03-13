const pool = require("../config/db");

/* ================= GET PROFILE ================= */
exports.getProfile = async (req, res) => {
  try {
    const employerId = req.user.id;

    const result = await pool.query(
      "SELECT * FROM employer_profile WHERE employer_id=$1",
      [employerId]
    );

    if (result.rows.length === 0) {
      return res.json({ success: true, profile: null });
    }

  const dbProfile = result.rows[0];

const formattedProfile = {
  companyName: dbProfile.company_name,
  phone: dbProfile.phone,
  website: dbProfile.website,
  location: dbProfile.location,
  description: dbProfile.about_company,
  logo: dbProfile.logo,
  industry: dbProfile.industry,
  companySize: dbProfile.company_size,
  foundedYear: dbProfile.founded_year,
  linkedin: dbProfile.linkedin,
  twitter: dbProfile.twitter,
  gstNumber: dbProfile.gst_number,
  verified: dbProfile.verified
};

res.json({ success: true, profile: formattedProfile });


  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};



exports.saveProfile = async (req, res) => {
  try {
    const employerId = req.user.id;
    const data = req.body;

    console.log("USER:", req.user);
    console.log("BODY:", data);
    console.log("Updating profile for employerId:", employerId);

    const existing = await pool.query(
      "SELECT * FROM employer_profile WHERE employer_id=$1",
      [employerId]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        `UPDATE employer_profile SET
          company_name=$1,
          phone=$2,
          website=$3,
          location=$4,
          about_company=$5,
          logo=$6,
          industry=$7,
          company_size=$8,
          founded_year=$9,
          linkedin=$10,
          twitter=$11,
          gst_number=$12,
          updated_at=NOW()
         WHERE employer_id=$13`,
        [
          data.companyName,
          data.phone,
          data.website,
          data.location,
          data.description,
          data.logo,
          data.industry,
          data.companySize,
          data.foundedYear,
          data.linkedin,
          data.twitter,
          data.gstNumber,
          employerId
        ]
      );
    } else {
      await pool.query(
        `INSERT INTO employer_profile
        (employer_id, company_name, phone, website, location,
         about_company, logo, industry, company_size, founded_year,
         linkedin, twitter, gst_number)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
        [
          employerId,
          data.companyName,
          data.phone,
          data.website,
          data.location,
          data.description,
          data.logo,
          data.industry,
          data.companySize,
          data.foundedYear,
          data.linkedin,
          data.twitter,
          data.gstNumber
        ]
      );
    }

    console.log("Profile saved successfully");

    res.json({ success: true });

  } catch (err) {
    console.error("SAVE PROFILE ERROR:", err);
    res.status(500).json({ success: false });
  }
};






















/* ================= REQUEST VERIFICATION ================= */
exports.requestVerification = async (req, res) => {
  try {
    const employerId = req.user.id;

    await pool.query(
      "UPDATE employer_profile SET verification_requested=true WHERE employer_id=$1",
      [employerId]
    );

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ success: false });
  }
};


exports.getEmployerDashboardStats = async (req, res) => {
  try {
    const employerId = req.user.id; // JWT se aayega

    const totalJobs = await pool.query(
      "SELECT COUNT(*) FROM jobs WHERE employer_id=$1",
      [employerId]
    );

    const activeJobs = await pool.query(
      "SELECT COUNT(*) FROM jobs WHERE employer_id=$1 AND status='approved'",
      [employerId]
    );

    const pendingJobs = await pool.query(
      "SELECT COUNT(*) FROM jobs WHERE employer_id=$1 AND status='pending'",
      [employerId]
    );

    const totalApplicants = await pool.query(
      `SELECT COUNT(*) 
       FROM applications a
       JOIN jobs j ON a.job_id = j.id
       WHERE j.employer_id=$1`,
      [employerId]
    );

    res.json({
      success: true,
      stats: {
        totalJobs: Number(totalJobs.rows[0].count),
        activeJobs: Number(activeJobs.rows[0].count),
        pendingJobs: Number(pendingJobs.rows[0].count),
        totalApplicants: Number(totalApplicants.rows[0].count),
      }
    });

  } catch (err) {
    console.error("Dashboard Stats Error:", err);
    res.status(500).json({ success: false });
  }
};



/* ================= REQUEST PLAN UPGRADE ================= */
exports.requestPlanUpgrade = async (req, res) => {
  try {
    const employerId = req.user.id;
    const { requestedPlan } = req.body;

    // Safety check
    if (!requestedPlan) {
      return res.status(400).json({
        success: false,
        message: "Requested plan is required"
      });
    }

    // Only allow BASIC or ENTERPRISE
    if (!["BASIC", "ENTERPRISE"].includes(requestedPlan)) {
      return res.status(400).json({
        success: false,
        message: "Invalid plan selected"
      });
    }

    await pool.query(
      "UPDATE employer_profile SET plan_request=$1 WHERE employer_id=$2",
      [requestedPlan, employerId]
    );

    res.json({ success: true });

  } catch (err) {
    console.error("PLAN REQUEST ERROR:", err);
    res.status(500).json({ success: false });
  }
};
