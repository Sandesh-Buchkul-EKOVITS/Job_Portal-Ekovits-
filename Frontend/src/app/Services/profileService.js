const KEY_PREFIX = "candidate_profile_";

function getEmptyProfile(baseUser = {}) {
  return {
    id: baseUser.id || "",
    name: baseUser.name || "",
    email: baseUser.email || "",
    phone: baseUser.phone || "",
    location: "",
    currentCTC: "",
    summary: "",
    skills: [],
    experience: [],
    education: [],
    resume: null,
    photo: "",
    profileCompleted: false,
  };
}

export function getCandidateProfile(userId) {
  if (!userId) return null;

  try {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const baseUser = users.find(
      (u) => u.id === userId
    );

    const data = localStorage.getItem(
      KEY_PREFIX + userId
    );

    if (!data) {
      // 🔑 AUTO-CREATE EMPTY PROFILE
      const emptyProfile = getEmptyProfile(
        baseUser
      );
      localStorage.setItem(
        KEY_PREFIX + userId,
        JSON.stringify(emptyProfile)
      );
      return emptyProfile;
    }

    return JSON.parse(data);
  } catch (e) {
    console.error(
      "Failed to read profile",
      e
    );
    return null;
  }
}

export function saveCandidateProfile(
  userId,
  profile
) {
  if (!userId) return;

  try {
    const updatedProfile = {
      ...profile,
      profileCompleted:
        profile.skills.length > 0 ||
        profile.experience.length > 0 ||
        profile.education.length > 0 ||
        !!profile.resume,
    };

    localStorage.setItem(
      KEY_PREFIX + userId,
      JSON.stringify(updatedProfile)
    );
  } catch (e) {
    console.error(
      "Failed to save profile",
      e
    );
  }
}
