export function getApplications(candidateId) {
  const apps = JSON.parse(localStorage.getItem("applications")) || [];
  return apps.filter((a) => a.candidateId === candidateId);
}

export function hasApplied(candidateId, jobId) {
  const apps = JSON.parse(localStorage.getItem("applications")) || [];
  return apps.some(
    (a) => a.candidateId === candidateId && a.jobId === jobId
  );
}

export function applyToJob(candidateId, jobId) {
  const apps = JSON.parse(localStorage.getItem("applications")) || [];

  const exists = apps.some(
    (a) => a.candidateId === candidateId && a.jobId === jobId
  );

  if (exists) return false;

  apps.push({
    id: Date.now(),
    candidateId,
    jobId,
    status: "Applied",
    appliedAt: new Date().toISOString(),
  });

  localStorage.setItem("applications", JSON.stringify(apps));
  return true;
}
