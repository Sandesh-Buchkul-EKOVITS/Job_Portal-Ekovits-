// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../middleware/authMiddleware");
// const applicationController = require("../controllers/applicationController");

// /* ================= ROUTES ================= */

// router.post("/apply/:jobId", authMiddleware, applicationController.applyJob);

// router.get("/job/:jobId", authMiddleware, applicationController.getJobApplicationInfo);
// router.get("/employer", authMiddleware, applicationController.getEmployerApplications);
// router.get("/candidate", authMiddleware, getCandidateApplications);

// router.put("/:applicationId", authMiddleware, applicationController.updateApplicationStatus);

// module.exports = router;










const express = require("express");
const router = express.Router();

const applicationController = require("../controllers/applicationController");
const { verifyToken } = require("../middleware/authMiddleware");

/* APPLY JOB */
router.post("/apply/:jobId", verifyToken, applicationController.applyJob);

/* EMPLOYER VIEW APPLICATIONS */
router.get("/employer", verifyToken, applicationController.getEmployerApplications);

router.get(
  "/job/:jobId",
  verifyToken,
  applicationController.getJobApplicationInfo
);

/* UPDATE STATUS */
router.put("/:applicationId", verifyToken, applicationController.updateApplicationStatus);

 router.get("/candidate", verifyToken, applicationController.getCandidateApplications);
module.exports = router;
