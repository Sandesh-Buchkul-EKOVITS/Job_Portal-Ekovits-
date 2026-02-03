const KEY_PREFIX = "employer_profile_";

export function getEmployerProfile(employerId) {
  if (!employerId) return null;

  try {
    const data = localStorage.getItem(
      KEY_PREFIX + employerId
    );
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Failed to load employer profile", e);
    return null;
  }
}

export function saveEmployerProfile(
  employerId,
  profile
) {
  if (!employerId) return;

  try {
    localStorage.setItem(
      KEY_PREFIX + employerId,
      JSON.stringify(profile)
    );
  } catch (e) {
    console.error("Failed to save employer profile", e);
  }
}
