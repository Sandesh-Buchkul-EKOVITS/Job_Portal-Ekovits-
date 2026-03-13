const express = require("express");
const router = express.Router();
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

const controller = require("../controllers/employerProfileController");

router.get("/", verifyToken, controller.getProfile);
router.post("/", verifyToken, controller.saveProfile);
router.put("/request-verification", verifyToken, controller.requestVerification);
router.get(
  "/dashboard-stats",
  verifyToken,
  requireRole("employer"),
  controller.getEmployerDashboardStats
);


router.put(
  "/request-plan-upgrade",
  verifyToken,
  requireRole("employer"),
  controller.requestPlanUpgrade
);


module.exports = router;
