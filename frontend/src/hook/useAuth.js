/*
File Purpose:
Small hook for reading shared auth state from AuthContext.

Connected With:
- frontend/src/context/authContext.js
*/
import { useContext } from "react";
import AuthContext from "../context/authContext.js";

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
 
