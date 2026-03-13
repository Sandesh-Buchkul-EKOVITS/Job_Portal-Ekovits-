const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOtpEmail(email, otp) {
  await transporter.sendMail({
     from: `"JobPortal Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `JobPortal Email Verification - ${Date.now()}`,  // 🔥 unique subject
    html: `
       <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f3f4f6;">
        <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 25px; border-radius: 8px;">

          <h2 style="color:#111827; margin-bottom: 10px;">
            JobPortal Email Verification
          </h2>

          <p style="color:#374151; font-size:14px;">
            Hello,
          </p>

          <p style="color:#374151; font-size:14px;">
            Thank you for choosing <strong>JobPortal</strong>.
            Please use the OTP below to verify your email address and continue your registration.
          </p>

          <div style="text-align:center; margin:25px 0;">
            <div style="
              display:inline-block;
              font-size:26px;
              font-weight:bold;
              letter-spacing:5px;
              padding:14px 25px;
              background-color:#111827;
              color:#ffffff;
              border-radius:6px;
            ">
              ${otp}
            </div>
          </div>

          <p style="color:#6b7280; font-size:13px;">
            This verification code will expire in 5 minutes.
          </p>

          <hr style="margin:20px 0;" />

          <p style="color:#9ca3af; font-size:12px;">
            If you did not request this verification, please ignore this email.
          </p>

          <p style="color:#374151; font-size:13px; margin-top:20px;">
            Regards,<br/>
            <strong>JobPortal Team</strong>
          </p>

        </div>
      </div>
    `,
  });
}

module.exports = sendOtpEmail;
