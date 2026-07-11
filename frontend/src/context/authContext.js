/*
File Purpose:
Shared React context object for authenticated user state.

Connected With:
- frontend/src/context/AuthContext.jsx
- frontend/src/hook/useAuth.js
*/
import { createContext } from "react";

const AuthContext = createContext(null);

export default AuthContext;
