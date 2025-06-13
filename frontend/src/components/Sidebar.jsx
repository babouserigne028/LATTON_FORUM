import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaComments,
  FaUsers,
  FaBook,
  FaFolder,
  FaBell,
  FaUsersCog,
  FaCog,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function Sidebar({ isOpen, toggleSidebar }) {
  const menuItems = [
    { to: "/Dashboard", icon: FaTachometerAlt, label: "Dashboard" },
    { to: "/Forums", icon: FaComments, label: "Forums" },
    { to: "/Utilisateurs", icon: FaUsers, label: "Utilisateurs" },
    { to: "/Matières", icon: FaBook, label: "Matières" },
    { to: "/Ressources", icon: FaFolder, label: "Ressources" },
    { to: "/Notifications", icon: FaBell, label: "Notifications" },
    { to: "/Groupes", icon: FaUsersCog, label: "Groupes" },
    { to: "/Paramètres", icon: FaCog, label: "Paramètres" },
    { to: "/Déconnexion", icon: FaSignOutAlt, label: "Déconnexion" },
  ];

  return (
    <div
      className={`h-screen shadow-2xl flex flex-col transition-all duration-500 ease-in-out fixed left-0 top-0 z-50 ${
        isOpen ? "w-72" : "w-20"
      }`}
      style={{
        background: `linear-gradient(180deg, 
          rgb(18, 36, 44) 0%, 
          rgb(22, 44, 54) 50%, 
          rgb(18, 36, 44) 100%)`,
      }}
    >
      {/* Header avec logo */}
      <div
        className={`p-2 ${isOpen ? "" : "px-4"}`}
        style={{ borderBottom: "1px solid rgba(245, 222, 179, 0.2)" }}
      >
        <div className="flex items-center justify-between">
          {isOpen ? (
            <div className="flex items-center space-x-3 w-full justify-center">
              {/* Logo réel */}
              <div className="w-50 h-20 rounded-xl overflow-hidden shadow-lg">
                <img
                  src="/src/assets/LogoLattonForum.jpg"
                  alt="Latton Forum Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg mx-auto">
              <img
                src="/src/assets/favicon.png"
                alt="Latton Forum Logo"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{
          background: `linear-gradient(135deg, rgb(245, 222, 179), rgb(235, 212, 169))`,
          color: "rgb(18, 36, 44)",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = `linear-gradient(135deg, rgb(235, 212, 169), rgb(225, 202, 159))`;
        }}
        onMouseLeave={(e) => {
          e.target.style.background = `linear-gradient(135deg, rgb(245, 222, 179), rgb(235, 212, 169))`;
        }}
        aria-label="Ouvrir/Fermer le menu"
      >
        {isOpen ? <FaChevronLeft size={10} /> : <FaChevronRight size={10} />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 min-h-0 px-4 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `group flex items-center ${
                    isOpen ? "justify-start px-4" : "justify-center px-2"
                  } py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    isActive
                      ? "" // Style actif géré via style inline
                      : ""
                  }`
                }
                style={({ isActive }) => ({
                  backgroundColor: isActive
                    ? "rgba(245, 222, 179, 0.15)"
                    : "transparent",
                  borderRight: isActive
                    ? "3px solid rgb(245, 222, 179)"
                    : "none",
                  boxShadow: isActive
                    ? "0 4px 12px rgba(245, 222, 179, 0.2)"
                    : "none",
                })}
                onMouseEnter={(e) => {
                  if (!e.target.classList.contains("active")) {
                    e.target.style.backgroundColor =
                      "rgba(245, 222, 179, 0.08)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!e.target.classList.contains("active")) {
                    e.target.style.backgroundColor = "transparent";
                  }
                }}
              >
                <span
                  className={`${isOpen ? "mr-4" : ""} transition-all duration-300`}
                  style={{ color: "rgb(200, 210, 220)" }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "rgb(245, 222, 179)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "rgb(200, 210, 220)";
                  }}
                >
                  <item.icon size={18} />
                </span>
                {isOpen && (
                  <span
                    className="font-medium transition-all duration-300"
                    style={{ color: "rgb(220, 230, 240)" }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "rgb(245, 222, 179)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "rgb(220, 230, 240)";
                    }}
                  >
                    {item.label}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      {isOpen && (
        <div
          className="p-4"
          style={{ borderTop: "1px solid rgba(245, 222, 179, 0.2)" }}
        >
          <div
            className="text-xs text-center"
            style={{ color: "rgba(245, 222, 179, 0.7)" }}
          >
            <p className="font-medium">Version 2.0</p>
            <p>© 2025 Latton Forum</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
