import { useMemo } from "react";

export function useCurrentUser() {
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser"));
    } catch {
      return null;
    }
  }, []);

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const profile = users.find((u) => u.id === user?.id) || null;

  return {
    user,
    profile,
    isAuthenticated: !!user,
    isCandidate: user?.role === "candidate",
  };
}
