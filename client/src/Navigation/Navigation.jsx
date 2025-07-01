import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout.jsx";
import SavedScreen from "../pages/SavedScreen.jsx";
import Onboarding from "../pages/Onboarding.jsx";
import Home from "../pages/Home.jsx";
import ProtectedRoute from "@/context/ProtectedRoute.jsx";

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Onboarding />} />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/saved" element={<SavedScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
