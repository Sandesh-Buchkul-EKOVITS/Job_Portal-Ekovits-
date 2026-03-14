// const pool = require("../config/db");
// const bcrypt = require("bcrypt");
// const generateResetToken = require("../utils/generateResetToken");
// const sendOtpEmail = require("../utils/SendEmail"); // same email service use karenge

// // ================= FORGOT PASSWORD =================
// exports.forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   if (!email)
//     return res.status(400).json({ success: false, message: "Email required" });

//   try {
//     const user = await pool.query(
//       "SELECT * FROM users WHERE email=$1",
//       [email]
//     );

//     if (user.rows.length === 0) {
//       return res.json({ success: true }); // security reason
//     }

//     const token = generateResetToken();
//     const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

//     await pool.query(
//       "INSERT INTO password_resets (email, token, expires_at) VALUES ($1, $2, $3)",
//       [email, token, expiresAt]
//     );

//     const resetLink = `http://localhost:5174/reset-password?token=${token}`;

//     await sendOtpEmail(
//       email,
//       `Click below to reset password:<br/><a href="${resetLink}">${resetLink}</a>`
//     );

//     res.json({ success: true });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false });
//   }
// };

// // ================= RESET PASSWORD =================
// exports.resetPassword = async (req, res) => {
//   const { token, password } = req.body;

//   try {
//     const result = await pool.query(
//       "SELECT * FROM password_resets WHERE token=$1",
//       [token]
//     );

//     if (result.rows.length === 0)
//       return res.status(400).json({ success: false, message: "Invalid token" });

//     const record = result.rows[0];

//     if (new Date() > record.expires_at)
//       return res.status(400).json({ success: false, message: "Token expired" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await pool.query(
//       "UPDATE users SET password=$1 WHERE email=$2",
//       [hashedPassword, record.email]
//     );

//     await pool.query(
//       "DELETE FROM password_resets WHERE email=$1",
//       [record.email]
//     );

//     res.json({ success: true });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false });
//   }
// };






























const pool = require("../config/db");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendOtpEmail = require("../utils/SendEmail");

/* ================= REGISTER ================= */
exports.register = async (req, res) => {

  const { role, email, password, name, companyName, phone, industry, companySize } = req.body;

  try {

    const existing = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (role, email, password, name) VALUES ($1,$2,$3,$4) RETURNING id",
      [role, email, hashedPassword, name]
    );

    const userId = newUser.rows[0].id;

    /* EMPLOYER PROFILE */
    if (role === "employer") {
      await pool.query(
        `INSERT INTO employer_profile 
        (employer_id, company_name, phone, industry, company_size)
        VALUES ($1,$2,$3,$4,$5)`,
        [
          userId,
          companyName,
          phone,
          industry,
          companySize
        ]
      );
    }

    /* 🔐 TOKEN GENERATE */
    const token = jwt.sign(
      {
        id: userId,
        role: role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    /* RESPONSE */
    res.json({
      success: true,
      token,
      user: {
        id: userId,
        email: email,
        role: role,
        name: name
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

/* ================= LOGIN ================= */

// exports.login = async (req, res) => {
//   const { email, password, role } = req.body;

//   try {
//     const result = await pool.query(
//       "SELECT * FROM users WHERE email=$1 AND role=$2",
//       [email, role]
//     );

//     if (result.rows.length === 0) {
//       return res.status(400).json({ success: false, message: "User not found" });
//     }

//     const user = result.rows[0];

//     const match = await bcrypt.compare(password, user.password);

//     if (!match) {
//       return res.status(400).json({ success: false, message: "Wrong password" });
//     }

//     res.json({
//       success: true,
//       user: {
//         id: user.id,
//         email: user.email,
//         role: user.role,
//         name: user.name
//       }
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false });
//   }
// };




exports.login = async (req, res) => {
  console.log("LOGIN BODY:", req.body);
 const { email, password, role } = req.body;

  try {
   const result = await pool.query(
 "SELECT id, email, role, name, password, plan, blocked FROM users WHERE email=$1",
 [email]
);

console.log("DB USER:", result.rows);
    if (result.rows.length === 0) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

const user = result.rows[0];

/* 🔐 ADMIN LOGIN PROTECTION */

if (user.role === "admin" && role !== "admin") {
  return res.status(403).json({
    success: false,
    message: "User not found"
  });
}

if (user.role !== "admin" && role === "admin") {
  return res.status(403).json({
    success: false,
    message: "Invalid admin credentials"
  });
}


/* 🚫 BLOCKED USER CHECK */
if (user.blocked) {
  return res.status(403).json({
    success: false,
    message: "Your account has been blocked"
  });
}

console.log("PASSWORD ENTERED:", password);
console.log("HASH FROM DB:", user.password);

const match = await bcrypt.compare(password, user.password);

console.log("PASSWORD MATCH:", match);
    if (!match) {
      return res.status(400).json({ success: false, message: "Wrong password" });
    }

    // 🔐 NORMAL JWT LOGIN (ALL ROLES)
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        plan: user.plan || "FREE"
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};






// exports.verifyEmployerOtp = async (req, res) => {
//   const { userId, otp } = req.body;

//   try {
//     const result = await pool.query(
//       "SELECT * FROM users WHERE id=$1 AND otp=$2 AND otp_expiry > NOW()",
//       [userId, otp]
//     );

//     if (result.rows.length === 0) {
//       return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
//     }

//     const user = result.rows[0];

//     const token = jwt.sign(
//       { id: user.id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     await pool.query(
//       "UPDATE users SET otp=NULL, otp_expiry=NULL WHERE id=$1",
//       [user.id]
//     );

//     res.json({
//       success: true,
//       token,
//       user: {
//         id: user.id,
//         email: user.email,
//         role: user.role,
//         name: user.name,
//         plan: user.plan || "FREE"
//       }
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false });
//   }
// };






/* ================= FORGOT PASSWORD ================= */

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 15 * 60 * 1000);

    await pool.query(
      "UPDATE users SET reset_token=$1, reset_token_expiry=$2 WHERE email=$3",
      [resetToken, expiry, email]
    );

    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;

    await sendOtpEmail(email, `
      Click below link to reset password:
      ${resetLink}
    `);
res.json({
  success: true,
  message: "Password updated successfully"
});


  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

/* ================= RESET PASSWORD ================= */

exports.resetPassword = async (req, res) => {
 const { token, password } = req.body;


  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE reset_token=$1 AND reset_token_expiry > NOW()",
      [token]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }

   const hashedPassword = await bcrypt.hash(password, 10);


    await pool.query(
      `UPDATE users
       SET password=$1,
           reset_token=NULL,
           reset_token_expiry=NULL
       WHERE reset_token=$2`,
      [hashedPassword, token]
    );

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};
