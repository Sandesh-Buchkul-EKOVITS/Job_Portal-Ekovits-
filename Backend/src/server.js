// const express = require("express");
// require("dotenv").config();
// require("./config/db");

// const cors = require("cors");
// const otpRoutes = require("./routes/otpRoutes");
// const authRoutes = require("./routes/authRoutes");


// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/otp", otpRoutes);

// app.get("/", (req, res) => {
//   res.send("Server Running 🚀");
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });














const express = require("express");
require("dotenv").config();
require("./config/db");

const cors = require("cors");
const otpRoutes = require("./routes/OtpRoutes");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
// const jobRoutes = require("./routes/jobRoutes");
const employerProfileRoutes = require("./routes/employerProfileRoutes");
const candidateProfileRoutes = require("./routes/candidateProfileRoutes");
const savedJobsRoutes = require("./routes/savedJobsRoutes");


const adminRoutes = require("./routes/adminRoutes");

const app = express();

/* ✅ CORS FIRST */
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());


app.use("/api/saved-jobs", savedJobsRoutes);

app.use("/api/applications", applicationRoutes);

app.use("/api/jobs", jobRoutes);
// app.use("/api/applications", applicationRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/auth", authRoutes);   // ✅ ADDED
// app.use("/api/jobs", jobRoutes);
app.use("/api/employer-profile", employerProfileRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/candidate-profile", candidateProfileRoutes);

app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
