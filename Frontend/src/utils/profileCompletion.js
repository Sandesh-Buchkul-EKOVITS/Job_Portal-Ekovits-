export function calculateProfileCompletion(profile) {
  if (!profile) return 0;

  const fields = [
    profile.name,
    profile.contact,
    profile.location,
    profile.skills?.length > 0,
    profile.resume,
    profile.expectedCTC,
    profile.noticePeriod,
  ];

  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

export function isProfileComplete(profile) {
  return calculateProfileCompletion(profile) >= 70;
}
