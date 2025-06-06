import "./styles/App.css";
import Sidebar from "./components/Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Login from "./pages/login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <div>
                <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <main>
                  <Routes>
                    <Route path="/dashboard" element={<div>Dashboard</div>} />
                    <Route path="/Forums" element={<div>Forums</div>} />
                    <Route path="/Utilisateurs" element={<div>Utilisateurs</div>} />
                    <Route path="/Matières" element={<div>Matières</div>} />
                    <Route path="/Ressources" element={<div>Ressources</div>} />
                    <Route path="/Notifications" element={<div>Notifications</div>} />
                    <Route path="/Groupes" element={<div>Groupes</div>} />
                    <Route path="/Paramètres" element={<div>Paramètres</div>} />
                    <Route path="/Déconnexion" element={<div>Déconnexion</div>} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </main>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
