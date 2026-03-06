const express = require("express");
const router = express.Router();

const { verifyToken, requireRole } = require("../middleware/authMiddleware");
const controller = require("../controllers/candidateProfileController");

router.get(
  "/",
  verifyToken,
  requireRole("candidate"),
  controller.getCandidateProfile
);

router.post(
  "/",
  verifyToken,
  requireRole("candidate"),
  controller.saveCandidateProfile
);


router.get(
  "/view/:id",
  verifyToken,
requireRole(["employer", "admin"]),
  controller.getCandidateProfileById
);


module.exports = router;
