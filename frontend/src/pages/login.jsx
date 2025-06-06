import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Eye, EyeOff, MessageCircle } from "lucide-react";
import { login, register } from "../components/auth";
import logo from "../assets/favicon.png"; // adapte le chemin si besoin

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Décommente ce bloc pour créer un utilisateur de test au premier chargement
  // React.useEffect(() => {
  //   register("admin", "admin");
  // }, []);

  const handleLogin = () => {
    const ok = login(formData.email, formData.password);
    if (ok) {
      setError("");
      navigate("/dashboard");
    } else {
      setError("Email ou mot de passe incorrect");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //const handleSubmit = async () => {
  //setIsLoading(true);

  // Simulation d'une requête de connexion
  // setTimeout(() => {
  //setIsLoading(false);
  //alert('Démonstration - Connexion réussie !');
  // }, 2000);
  // };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgb(18, 36, 44) 0%, rgba(18, 36, 44, 0.9) 50%, rgb(18, 36, 44) 100%)",
      }}
    >
      {/* Éléments d'animation flottants */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-10 h-10 rounded-full opacity-30 animate-pulse"
          style={{
            background: "rgba(245, 222, 179, 0.1)",
            top: "20%",
            left: "10%",
            animation: "float 20s infinite linear",
          }}
        ></div>
        <div
          className="absolute w-30 h-30 rounded-full opacity-20 animate-pulse"
          style={{
            background: "rgba(245, 222, 179, 0.1)",
            top: "60%",
            right: "15%",
            animation: "float 20s infinite linear 7s",
          }}
        ></div>
        <div
          className="absolute w-15 h-15 rounded-full opacity-25 animate-pulse"
          style={{
            background: "rgba(245, 222, 179, 0.1)",
            bottom: "20%",
            left: "20%",
            animation: "float 20s infinite linear 14s",
          }}
        ></div>
      </div>

      {/* Conteneur principal */}
      <div className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
        <div
          className="backdrop-blur-xl rounded-3xl p-2 shadow-2xl transform transition-transform duration-300 hover:-translate-y-1"
          style={{
            background: "rgba(18, 36, 44, 0.95)",
            border: "1px solid rgba(245, 222, 179, 0.2)",
            boxShadow:
              "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(245, 222, 179, 0.1)",
          }}
        >
          {/* Section Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, rgb(245, 222, 179), rgba(245, 222, 179, 0.8))",
                  boxShadow: "0 8px 16px rgba(245, 222, 179, 0.3)",
                }}
              >
                <img
                  src={logo}
                  alt="Logo Latton Forum"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                LATTON FORUM
              </h1>
            </div>
            <p className="text-gray-300 text-base mb-2">
              Bon retour parmi nous
            </p>
            <p
              className="text-sm font-medium"
              style={{ color: "rgb(245, 222, 179)" }}
            >
              Connectez-vous à votre espace communautaire
            </p>
          </div>

          {/* Formulaire */}
          <div className="space-y-4">
            {/* Champ Email */}
            <div className="relative group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Adresse email"
                required
                className="w-full px-5 py-4 rounded-xl text-white text-base transition-all duration-300 outline-none group-hover:-translate-y-0.5"
                style={{
                  background: "rgba(18, 36, 44, 0.6)",
                  border: "1px solid rgba(245, 222, 179, 0.2)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgb(245, 222, 179)";
                  e.target.style.background = "rgba(18, 36, 44, 0.8)";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(245, 222, 179, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(245, 222, 179, 0.2)";
                  e.target.style.background = "rgba(18, 36, 44, 0.6)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Champ Mot de passe */}
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Mot de passe"
                required
                className="w-full px-5 py-4 pr-12 rounded-xl text-white text-base transition-all duration-300 outline-none group-hover:-translate-y-0.5"
                style={{
                  background: "rgba(18, 36, 44, 0.6)",
                  border: "1px solid rgba(245, 222, 179, 0.2)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgb(245, 222, 179)";
                  e.target.style.background = "rgba(18, 36, 44, 0.8)";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(245, 222, 179, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(245, 222, 179, 0.2)";
                  e.target.style.background = "rgba(18, 36, 44, 0.6)";
                  e.target.style.boxShadow = "none";
                }}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                style={{ color: "rgba(255, 255, 255, 0.5)" }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "rgb(245, 222, 179)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(255, 255, 255, 0.5)")
                }
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Options du formulaire */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-white transition-colors duration-300">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleInputChange}
                  className="rounded border-gray-600 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-0"
                  style={{ accentColor: "rgb(245, 222, 179)" }}
                />
                Se souvenir de moi
              </label>
              <a
                href="#"
                className="font-medium transition-all duration-300 hover:underline"
                style={{ color: "rgb(245, 222, 179)" }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "rgba(245, 222, 179, 0.8)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgb(245, 222, 179)")
                }
              >
                Mot de passe oublié ?
              </a>
            </div>

            {/* Bouton de connexion */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-xl font-semibold text-base transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgb(245, 222, 179), rgba(245, 222, 179, 0.9))",
                color: "rgb(18, 36, 44)",
                boxShadow: "0 4px 15px rgba(245, 222, 179, 0.2)",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.boxShadow =
                    "0 8px 25px rgba(245, 222, 179, 0.3)";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow =
                  "0 4px 15px rgba(245, 222, 179, 0.2)";
              }}
            >
              <div className="flex items-center justify-center">
                {isLoading && (
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                )}
                <span>
                  {isLoading ? "Connexion en cours..." : "Se connecter"}
                </span>
              </div>
            </button>
          </div>

          {/* Affichage de l'erreur */}
          {error && (
            <div className="mb-4 text-red-400 text-center font-semibold">
              {error}
            </div>
          )}

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className="px-4 text-gray-400"
                style={{ background: "rgba(18, 36, 44, 0.95)" }}
              >
                ou
              </span>
            </div>
          </div>

          {/* Lien d'inscription */}
          <div className="text-center text-sm text-gray-300">
            Nouveau sur Latton Forum ?{" "}
            <a
              href="#"
              className="font-semibold transition-all duration-300 hover:underline"
              style={{ color: "rgb(245, 222, 179)" }}
              onMouseEnter={(e) =>
                (e.target.style.color = "rgba(245, 222, 179, 0.8)")
              }
              onMouseLeave={(e) =>
                (e.target.style.color = "rgb(245, 222, 179)")
              }
            >
              Créer un compte
            </a>
          </div>
        </div>
      </div>

      {/* Styles CSS personnalisés */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) rotate(90deg);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-40px) rotate(180deg);
            opacity: 0.2;
          }
          75% {
            transform: translateY(-20px) rotate(270deg);
            opacity: 0.1;
          }
        }

        input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
