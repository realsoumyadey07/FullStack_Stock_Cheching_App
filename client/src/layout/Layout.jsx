import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";

export default function Layout() {
  return (
    <>
      <div className="flex flex-col lg:w-[1000px] mx-auto">
        <Header />
        <Outlet />
      </div>
    </>
  );
}
