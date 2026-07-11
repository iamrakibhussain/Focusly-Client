/*
File Purpose:
Public-facing shell for landing and auth pages.

Connected With:
- frontend/src/routes/AppRoutes.jsx
*/
import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/landingpagecomponent/Headercontent";

export default function PublicLayout() {
  return (
    <main className="flex min-h-screen flex-col pt-20 pb-10">
      <HeaderComponent />
      <Outlet />
    </main>
  );
}
