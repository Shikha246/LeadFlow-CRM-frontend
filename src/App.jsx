import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SalesPage from "./pages/Sales";
import LeadsPage from "./pages/LeadsPage";
import CreateLeadPage from "./pages/CreateLeadPage";
import LeadDetails from "./pages/LeadDetails";
import LeadStatusPage from "./pages/LeadStatusPage";
import SalesAgentView from "./pages/SalesAgentView";
import SalesAgentManagementPage from "./pages/SalesAgentManagementPage";
import Layout from "./components/Layout";
import AddAgentPage from "./pages/AddAgentPage";
import DashboardPage from "./pages/DashboardPage";
import { SalesAgentProvider } from "./context/SalesAgentContext";
import ReportsPage from "./pages/ReportsPage";
import Settings from "./pages/Settings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SalesAgentProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Layout wrapper */}
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/sales" element={<SalesPage />} />
              <Route path="leads" element={<LeadsPage />} />
              <Route path="/leads/new" element={<CreateLeadPage />} />
              <Route path="/leads/:id" element={<LeadDetails />} />
              <Route path="/add/agents" element={<AddAgentPage />} />
              <Route path="/leads/status" element={<LeadStatusPage />} />
              <Route path="/agents" element={<SalesAgentManagementPage />} />
              <Route path="/agent-view/:id" element={<SalesAgentView />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </SalesAgentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;