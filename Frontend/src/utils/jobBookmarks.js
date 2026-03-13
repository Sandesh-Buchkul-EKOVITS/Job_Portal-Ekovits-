const STORAGE_KEY = "savedJobs";

export function getSavedJobs(userId) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  return data.filter((j) => j.userId === userId);
}

export function isJobSaved(userId, jobId) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  return data.some(
    (j) => j.userId === userId && j.jobId === jobId
  );
}

export function toggleSaveJob(userId, jobId) {
  let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const exists = data.some(
    (j) => j.userId === userId && j.jobId === jobId
  );

  if (exists) {
    data = data.filter(
      (j) => !(j.userId === userId && j.jobId === jobId)
    );
  } else {
    data.push({ userId, jobId });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
