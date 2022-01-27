import { HashRouter, Route, Routes } from "react-router-dom";

// Import page
import Home from "./pages/visitor/Home";
import PresentationRecruteur from "./pages/visitor/PresentationRecruteur";
import PresentationCandidat from "./pages/visitor/PresentationCandidat";
import EmployerDashboard from "pages/employer/EmployerDashboard";
import EmployerProfil from "pages/employer/EmployerProfil";
import CandidatProfil from "pages/candidat/CandidatProfil";
import PageNotFound from "pages/PageNotFound";
import AdminPage from "pages/admin/AdminPage";
import EmployerAddOffer from "pages/employer/EmployerAddOffer";
import CandidatDashboard from "pages/candidat/CandidatDashboard";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/recruteur" exact element={<PresentationRecruteur />} />
        <Route path="/candidat" exact element={<PresentationCandidat />} />
        <Route path="/Employer/dashboard" exact element={<EmployerDashboard />}        />
        <Route path="/Employer/profil" exact element={<EmployerProfil />} />
        <Route path="/Employer/addOffer" exact element={<EmployerAddOffer />} />
        <Route path="/Candidat/profil" exact element={<CandidatProfil />} />
        <Route path="/Candidat/dashboard" exact element={<CandidatDashboard />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/admin" exact element={<AdminPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
