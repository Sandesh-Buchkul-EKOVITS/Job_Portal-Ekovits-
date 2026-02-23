// const KEY_PREFIX = "employer_profile_";

// export function getEmployerProfile(employerId) {
//   if (!employerId) return null;

//   try {
//     const data = localStorage.getItem(
//       KEY_PREFIX + employerId
//     );
//     return data ? JSON.parse(data) : null;
//   } catch (e) {
//     console.error("Failed to load employer profile", e);
//     return null;
//   }
// }

// export function saveEmployerProfile(
//   employerId,
//   profile
// ) {
//   if (!employerId) return;

//   try {
//     localStorage.setItem(
//       KEY_PREFIX + employerId,
//       JSON.stringify(profile)
//     );
//   } catch (e) {
//     console.error("Failed to save employer profile", e);
//   }
// }







// const BASE_URL = "http://localhost:5000/api/employer-profile";

// /* ================= GET EMPLOYER PROFILE ================= */

// export async function getEmployerProfile(employerId) {
//   if (!employerId) return null;

//   try {
//     const token = localStorage.getItem("token");

//     const res = await fetch(`${BASE_URL}/${employerId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await res.json();

//     if (data.success) {
//       return data.profile;
//     }

//     return null;

//   } catch (e) {
//     console.error("Failed to load employer profile", e);
//     return null;
//   }
// }

// /* ================= SAVE / UPDATE PROFILE ================= */

// export async function saveEmployerProfile(employerId, profile) {
//   if (!employerId) return;

//   try {
//     const token = localStorage.getItem("token");

//     const res = await fetch(`${BASE_URL}`, {
//       method: "POST",   // upsert (create or update)
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(profile),
//     });

//     const data = await res.json();

//     if (!data.success) {
//       console.error("Profile save failed");
//     }

//   } catch (e) {
//     console.error("Failed to save employer profile", e);
//   }
// }












// const KEY_PREFIX = "employer_profile_";

// /* ================= GET EMPLOYER PROFILE ================= */

// export function getEmployerProfile(employerId) {
//   if (!employerId) return null;

//   try {
//     const data = localStorage.getItem(
//       KEY_PREFIX + employerId
//     );
//     return data ? JSON.parse(data) : null;
//   } catch (e) {
//     console.error("Failed to load employer profile", e);
//     return null;
//   }
// }

// /* ================= SAVE / UPDATE PROFILE ================= */

// export function saveEmployerProfile(
//   employerId,
//   profile
// ) {
//   if (!employerId) return;

//   try {
//     localStorage.setItem(
//       KEY_PREFIX + employerId,
//       JSON.stringify(profile)
//     );
//   } catch (e) {
//     console.error("Failed to save employer profile", e);
//   }
// }












const BASE_URL = "http://localhost:5000/api/employer-profile";

/* ================= GET EMPLOYER PROFILE ================= */

export async function getEmployerProfile() {
  try {
    const token = localStorage.getItem("token");

    if (!token) return null;

    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.success) {
      return data.profile;
    }

    return null;
  } catch (error) {
    console.error("Failed to fetch employer profile:", error);
    return null;
  }
}

/* ================= SAVE / UPDATE PROFILE ================= */

export async function saveEmployerProfile(profile) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profile),
    });

    const data = await res.json();

    return data.success;
  } catch (error) {
    console.error("Failed to save employer profile:", error);
    return false;
  }
}

/* ================= REQUEST VERIFICATION ================= */

export async function requestVerification() {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${BASE_URL}/request-verification`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    return data.success;
  } catch (error) {
    console.error("Verification request failed:", error);
    return false;
  }
}
