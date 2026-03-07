// const express = require("express");
// const router = express.Router();

// const {
//   forgotPassword,
//   resetPassword
// } = require("../controllers/authController");

// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);

// module.exports = router;








const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const pool = require("../config/db");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  // verifyEmployerOtp
} = require("../controllers/authController");


router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
// router.post("/verify-employer-otp", verifyEmployerOtp);
router.get("/me", verifyToken, async (req, res) => {

  try {

    const result = await pool.query(
   "SELECT id,name,email,role,blocked FROM users WHERE id=$1",
      [req.user.id]
    );

    if(result.rows.length === 0){
      return res.status(404).json({success:false});
    }
/* 🚫 BLOCKED USER AUTO LOGOUT */
if(result.rows[0].blocked){
  return res.status(401).json({
    success:false,
    message:"Account blocked"
  });
}
    res.json({
      success:true,
      user:result.rows[0]
    });

  } catch(err){
    res.status(500).json({success:false});
  }

});

module.exports = router;
