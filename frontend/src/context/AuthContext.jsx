/*
File Purpose:
Auth provider that loads and shares the current user across the app.

Connected With:
- frontend/src/services/authService.js
- frontend/src/context/authContext.js
- frontend/src/hook/useAuth.js
*/
import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService.js";
import AuthContext from "./authContext.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      return currentUser;
    } catch (error) {
      setUser(null);
      throw error;
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (!isMounted) return;
        setUser(currentUser);
      } catch {
        if (!isMounted) return;
        setUser(null);
      }

      if (!isMounted) return;
      setIsLoading(false);
    };

    loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    refreshUser,
    isAuthenticated: Boolean(user),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
