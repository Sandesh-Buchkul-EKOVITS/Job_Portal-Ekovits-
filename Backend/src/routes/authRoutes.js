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


module.exports = router;
