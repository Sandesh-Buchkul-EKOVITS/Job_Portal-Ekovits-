const pool = require("../config/db");
const generateOtp = require("../utils/generateOtp");
const sendOtpEmail = require("../utils/SendEmail");

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
if (!email) {
  return res.status(400).json({ success: false, message: "Email required" });
}

  try {
    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await pool.query(
      "INSERT INTO email_otps (email, otp, expires_at) VALUES ($1, $2, $3)",
      [email, otp, expiresAt]
    );

    await sendOtpEmail(email, otp);

    res.json({ success: true, message: "OTP sent successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const result = await pool.query(
      `SELECT * FROM email_otps
       WHERE email=$1 AND otp=$2
       ORDER BY created_at DESC
       LIMIT 1`,
      [email, otp]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    const record = result.rows[0];

    if (new Date() > record.expires_at) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    // 🔥 DELETE OTP after success
    await pool.query(
      "DELETE FROM email_otps WHERE email=$1",
      [email]
    );

    res.json({ success: true, message: "OTP verified" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Verification failed" });
  }
};
