import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import SavedScreen from "../pages/Savedscreen";
import Onboarding from "../pages/Onboarding";
import Home from "../pages/Home";
import ProtectedRoute from "@/context/ProtectedRoute";

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
