export function calculateProfileCompletion(profile) {
  if (!profile) return 0;

  let score = 0;

  if (profile.name) score += 10;
  if (profile.email) score += 10;
  if (profile.contact) score += 10;
  if (profile.location) score += 10;
  if (profile.photo) score += 10;
  if (profile.resume) score += 10;
  if (profile.skills && profile.skills.length > 0) score += 20;
  if (profile.ctc) score += 10;
  if (profile.profileCompleted) score += 10;

  return Math.min(score, 100);
}
