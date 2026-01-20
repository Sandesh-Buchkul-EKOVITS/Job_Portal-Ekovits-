export function getSavedJobs(candidateId) {
  const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
  return saved.filter((j) => j.candidateId === candidateId);
}

export function isJobSaved(candidateId, jobId) {
  const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
  return saved.some(
    (j) => j.candidateId === candidateId && j.jobId === jobId
  );
}

export function toggleSaveJob(candidateId, jobId) {
  let saved = JSON.parse(localStorage.getItem("savedJobs")) || [];

  const exists = saved.some(
    (j) => j.candidateId === candidateId && j.jobId === jobId
  );

  if (exists) {
    saved = saved.filter(
      (j) => !(j.candidateId === candidateId && j.jobId === jobId)
    );
  } else {
    saved.push({
      candidateId,
      jobId,
      savedAt: new Date().toISOString(),
    });
  }

  localStorage.setItem("savedJobs", JSON.stringify(saved));
}
