// const KEY_PREFIX = "candidate_profile_";

// function getEmptyProfile(baseUser = {}) {
//   return {
//     id: baseUser.id || "",
//     name: baseUser.name || "",
//     email: baseUser.email || "",
//     phone: baseUser.phone || "",
//     location: "",
//     currentCTC: "",
//     summary: "",
//     skills: [],
//     experience: [],
//     education: [],
//     resume: null,
//     photo: "",
//     profileCompleted: false,
//   };
// }

// export function getCandidateProfile(userId) {
//   if (!userId) return null;

//   try {
//     const users =
//       JSON.parse(localStorage.getItem("users")) || [];

//     const baseUser = users.find(
//       (u) => u.id === userId
//     );

//     const data = localStorage.getItem(
//       KEY_PREFIX + userId
//     );

//     if (!data) {
//       // 🔑 AUTO-CREATE EMPTY PROFILE
//       const emptyProfile = getEmptyProfile(
//         baseUser
//       );
//       localStorage.setItem(
//         KEY_PREFIX + userId,
//         JSON.stringify(emptyProfile)
//       );
//       return emptyProfile;
//     }

//     return JSON.parse(data);
//   } catch (e) {
//     console.error(
//       "Failed to read profile",
//       e
//     );
//     return null;
//   }
// }

// export function saveCandidateProfile(
//   userId,
//   profile
// ) {
//   if (!userId) return;

//   try {
//     const updatedProfile = {
//       ...profile,
//       profileCompleted:
//         profile.skills.length > 0 ||
//         profile.experience.length > 0 ||
//         profile.education.length > 0 ||
//         !!profile.resume,
//     };

//     localStorage.setItem(
//       KEY_PREFIX + userId,
//       JSON.stringify(updatedProfile)
//     );
//   } catch (e) {
//     console.error(
//       "Failed to save profile",
//       e
//     );
//   }
// }























const API_BASE = "http://localhost:5000/api/candidate-profile";

// GET PROFILE FROM BACKEND
export async function getCandidateProfile(id) {
  try {
    const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}/view/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.success) {
      return data.profile;
    }

    return null;
  } catch (err) {
    console.error("Error fetching profile:", err);
    return null;
  }
}

// SAVE PROFILE TO BACKEND
export async function saveCandidateProfile(profile) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profile),
    });

    const data = await res.json();

    return data.success;
  } catch (err) {
    console.error("Error saving profile:", err);
    return false;
  }
}
