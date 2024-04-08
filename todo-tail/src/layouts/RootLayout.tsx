import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="container flex-grow grid grid-cols-1">
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
