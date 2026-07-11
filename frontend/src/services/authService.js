/*
File Purpose:
Frontend auth API layer for current-user lookup and future auth requests.

Connected With:
- frontend/src/context/AuthContext.jsx
- frontend/src/hook/useAuth.js
*/

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";


export async function getCurrentUser() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
            credentials: "include",
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to fetch current user.");
        }
        return result.user;
    }
    catch (error) {
        console.error("Error fetching current user:", error.message);
        throw error;
    }
}

export async function login() {

}

export async function register() {

}

export async function logout() {

}
