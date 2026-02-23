



// import adminAuth from "../middleware/adminAuth.js";
// const adminAuth = require("../middleware/adminAuth");


const express = require("express");
const router = express.Router();

const adminAuth = require("../middleware/adminAuth");


// const { getEmployers, updateEmployerPlan } = require("../controllers/adminController");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");
const controller = require("../controllers/adminController");

/* ================= DASHBOARD ================= */
router.get(
  "/dashboard",
  verifyToken,
  requireRole("admin"),
  controller.getDashboardStats
);

/* ================= GET ALL EMPLOYERS ================= */
router.get(
  "/employers",
  verifyToken,
  requireRole("admin"),
  controller.getAllEmployers
);

/* ================= VERIFY EMPLOYER ================= */
router.put(
  "/employers/:id/verify",
  verifyToken,
  requireRole("admin"),
  controller.verifyEmployer
);

router.get(
  "/jobs",
  verifyToken,
  requireRole("admin"),
  controller.getAllJobs
);

router.put(
  "/jobs/:id/status",
  verifyToken,
  requireRole("admin"),
  controller.updateJobStatus
);


/* ================= GET ALL USERS ================= */
router.get(
  "/users",
  verifyToken,
  requireRole("admin"),
  controller.getAllUsers
);

/* ================= GET ALL CANDIDATES ================= */
router.get(
  "/candidates",
  verifyToken,
  requireRole("admin"),
  controller.getAllCandidates
);




////////////// plan upgrade route///////
router.put(
  "/employers/:id/plan",
  verifyToken,
  requireRole("admin"),
  controller.updateEmployerPlan
);

router.get(
  "/employers/:id",
  verifyToken,
  requireRole("admin"),
  controller.getSingleEmployer
);


// router.get(
//   "/dashboard-stats",
//   verifyToken,
//   requireRole("employer"),
//   controller.getDashboardStats
// );
router.get(
  "/plan-requests",
  verifyToken,
  requireRole("admin"),
  controller.getPlanUpgradeRequests
);




module.exports = router;
