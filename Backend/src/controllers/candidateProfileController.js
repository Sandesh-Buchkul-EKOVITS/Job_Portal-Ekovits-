const pool = require("../config/db");

/* ================= GET PROFILE ================= */

exports.getCandidateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      "SELECT * FROM candidate_profile WHERE user_id=$1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.json({ success: true, profile: null });
    }

   const row = result.rows[0];

const profile = {
  contact: row.contact,
  location: row.location,
  currentCTC: row.current_ctc,
  summary: row.summary,
  education: row.education || [],
  experience: row.experience || [],
  skills: row.skills || [],
  resume: row.resume || null,
  photo: row.photo
};

res.json({ success: true, profile });

  } catch (err) {
    console.error("Get Candidate Profile Error:", err);
    res.status(500).json({ success: false });
  }
};

///////employeerrr view candiate profile ////////////

exports.getCandidateProfileById = async (req, res) => {
  try {
    const candidateId = req.params.id;

    console.log("👉 Candidate ID from URL:", candidateId);
console.log("👉 Type of candidateId:", typeof candidateId);


   const result = await pool.query(
  `
  SELECT 
    u.id,
    u.name,
    u.email,
    cp.contact,
    cp.location,
    cp.current_ctc,
    cp.summary,
    cp.education,
    cp.experience,
    cp.skills,
    cp.resume,
    cp.photo
  FROM users u
  LEFT JOIN candidate_profile cp
    ON u.id = cp.user_id
  WHERE u.id = $1
  `,
  [candidateId]
);

console.log("👉 Rows returned from DB:", result.rows);
console.log("👉 Row count:", result.rowCount);



    if (result.rows.length === 0) {
      return res.json({ success: false });
    }

    const row = result.rows[0];
    console.log("👉 Raw row data:", row);


    const profile = {
      id: row.id,
      name: row.name,
      email: row.email,
      contact: row.contact,
      location: row.location,
      currentCTC: row.current_ctc,
      summary: row.summary,
     education: row.education || [],
experience: row.experience || [],
skills: row.skills || [],
resume: row.resume || null,

      photo: row.photo
    };

    res.json({ success: true, profile });

  } catch (err) {
    console.error("Employer Candidate View Error:", err);
    res.status(500).json({ success: false });
  }
};












/* ================= SAVE PROFILE ================= */

exports.saveCandidateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    const existing = await pool.query(
      "SELECT * FROM candidate_profile WHERE user_id=$1",
      [userId]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        `UPDATE candidate_profile SET
          contact=$1,
          location=$2,
          current_ctc=$3,
          summary=$4,
          education=$5,
          experience=$6,
          skills=$7,
          resume=$8,
          photo=$9,
          updated_at=NOW()
         WHERE user_id=$10`,
        [
          data.contact,
          data.location,
          data.currentCTC,
          data.summary,
          JSON.stringify(data.education || []),
          JSON.stringify(data.experience || []),
          JSON.stringify(data.skills || []),
          JSON.stringify(data.resume || null),
          data.photo,
          userId
        ]
      );
    } else {
      await pool.query(
        `INSERT INTO candidate_profile
        (user_id, contact, location, current_ctc, summary,
         education, experience, skills, resume, photo)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        [
          userId,
          data.contact,
          data.location,
          data.currentCTC,
          data.summary,
          JSON.stringify(data.education || []),
          JSON.stringify(data.experience || []),
          JSON.stringify(data.skills || []),
          JSON.stringify(data.resume || null),
          data.photo
        ]
      );
    }

    res.json({ success: true });

  } catch (err) {
    console.error("Save Candidate Profile Error:", err);
    res.status(500).json({ success: false });
  }
};
