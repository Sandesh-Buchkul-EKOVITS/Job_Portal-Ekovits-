export function getRecommendedJobs(candidate, jobs, applications) {
  if (!candidate || !candidate.skills?.length) return [];

  const appliedJobIds = applications.map((a) => a.jobId);

  return jobs
    .filter(
      (job) =>
        job.status === "approved" &&
        !appliedJobIds.includes(job.id)
    )
    .map((job) => {
      const matchCount = job.skills?.filter((skill) =>
        candidate.skills.includes(skill)
      ).length || 0;

      return { ...job, matchScore: matchCount };
    })
    .filter((job) => job.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);
}
