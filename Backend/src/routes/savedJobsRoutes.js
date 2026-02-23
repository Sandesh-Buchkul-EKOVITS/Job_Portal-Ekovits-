const express = require("express");
const router = express.Router();

const { verifyToken, requireRole } = require("../middleware/authMiddleware");
const controller = require("../controllers/savedJobsController");

/* SAVE JOB */
router.post(
  "/:jobId",
  verifyToken,
  requireRole("candidate"),
  controller.saveJob
);

/* GET SAVED JOBS */
router.get(
  "/",
  verifyToken,
  requireRole("candidate"),
  controller.getSavedJobs
);

/* REMOVE SAVED JOB */
router.delete(
  "/:jobId",
  verifyToken,
  requireRole("candidate"),
  controller.removeSavedJob
);

module.exports = router;
