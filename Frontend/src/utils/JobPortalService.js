/* =========================================================
   AUTH & USER HELPERS
========================================================= */

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};

export const getAllUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
};

const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

/* =========================================================
   EMPLOYER LIMIT HELPERS
========================================================= */

const MAX_JOBS_FREE = 5;
const MAX_SEARCH_VIEWS_FREE = 50;

const ensureEmployerCounters = (employer) => {
  return {
    ...employer,
    jobsPostedCount: employer.jobsPostedCount || 0,
    searchViewCount: employer.searchViewCount || 0,
    isSubscribed: employer.isSubscribed || false,
  };
};

export const canEmployerPostJob = (employer) => {
  const emp = ensureEmployerCounters(employer);
  return emp.isSubscribed || emp.jobsPostedCount < MAX_JOBS_FREE;
};

export const canEmployerViewCandidate = (employer) => {
  const emp = ensureEmployerCounters(employer);
  return emp.isSubscribed || emp.searchViewCount < MAX_SEARCH_VIEWS_FREE;
};

/* =========================================================
   JOB HELPERS
========================================================= */

export const getAllJobs = () => {
  return JSON.parse(localStorage.getItem("jobs")) || [];
};

export const getApprovedJobs = () => {
  return getAllJobs().filter((job) => job.status === "approved");
};

export const getEmployerJobs = (employerId) => {
  return getAllJobs().filter(
    (job) => job.employerId === employerId
  );
};

export const createJob = (jobData) => {
  const currentUser = getCurrentUser();
  const users = getAllUsers();
  const jobs = getAllJobs();

  if (!currentUser || currentUser.role !== "employer") {
    throw new Error("Unauthorized");
  }

  const employerIndex = users.findIndex(
    (u) => u.id === currentUser.id
  );

  const employer = ensureEmployerCounters(users[employerIndex]);

  if (!canEmployerPostJob(employer)) {
    throw new Error("Job posting limit reached (5 jobs)");
  }

  const newJob = {
    id: Date.now(),
    employerId: employer.id,
    status: "pending",
    ...jobData,
  };

  // increment job count
  users[employerIndex] = {
    ...employer,
    jobsPostedCount: employer.jobsPostedCount + 1,
  };

  saveUsers(users);

  localStorage.setItem(
    "jobs",
    JSON.stringify([newJob, ...jobs])
  );

  return newJob;
};

/* =========================================================
   APPLICATION HELPERS
========================================================= */

export const getAllApplications = () => {
  return JSON.parse(localStorage.getItem("applications")) || [];
};

export const applyToJob = (jobId) => {
  const currentUser = getCurrentUser();
  const applications = getAllApplications();

  if (!currentUser || currentUser.role !== "candidate") {
    throw new Error("Only candidates can apply");
  }

  const alreadyApplied = applications.find(
    (a) =>
      a.jobId === jobId &&
      a.candidateId === currentUser.id
  );

  if (alreadyApplied) {
    throw new Error("Already applied");
  }

  const newApplication = {
    id: Date.now(),
    jobId,
    candidateId: currentUser.id,
    status: "Applied",
    appliedAt: new Date().toISOString(),
  };

  localStorage.setItem(
    "applications",
    JSON.stringify([newApplication, ...applications])
  );

  return newApplication;
};

export const getCandidateApplications = (candidateId) => {
  return getAllApplications().filter(
    (app) => app.candidateId === candidateId
  );
};

export const getEmployerApplications = (employerId) => {
  const jobs = getAllJobs();
  const applications = getAllApplications();

  const employerJobIds = jobs
    .filter((job) => job.employerId === employerId)
    .map((job) => job.id);

  return applications.filter((app) =>
    employerJobIds.includes(app.jobId)
  );
};

export const updateApplicationStatus = (
  applicationId,
  status
) => {
  const applications = getAllApplications();

  const updated = applications.map((app) =>
    app.id === applicationId
      ? { ...app, status }
      : app
  );

  localStorage.setItem(
    "applications",
    JSON.stringify(updated)
  );
};

/* =========================================================
   EMPLOYER SEARCH VIEW LIMIT
========================================================= */

export const recordCandidateProfileView = (candidateId) => {
  const currentUser = getCurrentUser();
  const users = getAllUsers();

  if (!currentUser || currentUser.role !== "employer") {
    return;
  }

  const employerIndex = users.findIndex(
    (u) => u.id === currentUser.id
  );

  const employer = ensureEmployerCounters(users[employerIndex]);

  if (!canEmployerViewCandidate(employer)) {
    throw new Error("Candidate view limit reached (50 profiles)");
  }

  users[employerIndex] = {
    ...employer,
    searchViewCount: employer.searchViewCount + 1,
  };

  saveUsers(users);
};

/* =========================================================
   ADMIN HELPERS
========================================================= */

export const approveJob = (jobId) => {
  const jobs = getAllJobs();

  const updatedJobs = jobs.map((job) =>
    job.id === jobId
      ? { ...job, status: "approved" }
      : job
  );

  localStorage.setItem(
    "jobs",
    JSON.stringify(updatedJobs)
  );
};

export const rejectJob = (jobId) => {
  const jobs = getAllJobs();

  const updatedJobs = jobs.map((job) =>
    job.id === jobId
      ? { ...job, status: "rejected" }
      : job
  );

  localStorage.setItem(
    "jobs",
    JSON.stringify(updatedJobs)
  );
};
