// const express = require("express");
// const router = express.Router();
// const jobController = require("../controllers/jobController");
// const authMiddleware = require("../middleware/authMiddleware");
// const auth = require("../middleware/authMiddleware");
// const { createJob } = require("../controllers/jobController");
// // only loged in user will cretae a job 
// router.post("/create", auth, jobController.createJob);
// // Create Job
// router.post("/create", authMiddleware, jobController.createJob);

// // Get My Jobs
// router.get("/my-jobs", authMiddleware, jobController.getEmployerJobs);
// // ✅ Update Job
// router.put("/:id", authMiddleware, jobController.updateJob);
// router.put("/close/:id", authMiddleware, jobController.closeJob);
// // get all jobs 
// router.get("/", jobController.getAllJobs);
// router.post("/", authMiddleware, createJob);

// // ✅ Delete Job
// router.delete("/:id", authMiddleware, jobController.deleteJob);
// // ✅ Get Employer Jobs
// router.get("/my-jobs", authMiddleware, jobController.getEmployerJobs);
// module.exports = router;





const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");
const { verifyToken } = require("../middleware/authMiddleware");

/* CREATE JOB */
router.post("/", verifyToken, jobController.createJob);

/* GET EMPLOYER JOBS */
router.get("/my-jobs", verifyToken, jobController.getEmployerJobs);

/* UPDATE JOB */
router.put("/:id", verifyToken, jobController.updateJob);

/* CLOSE JOB */
router.put("/close/:id", verifyToken, jobController.closeJob);

/* DELETE JOB */
router.delete("/:id", verifyToken, jobController.deleteJob);

/* GET ALL JOBS */
router.get("/", jobController.getAllJobs);
router.get("/:id", jobController.getJobById);

router.get("/:jobId", verifyToken, jobController.getJobById);

module.exports = router;
