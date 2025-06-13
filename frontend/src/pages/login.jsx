import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/favicon.png";
import { login as apiLogin } from "../components/auth"; // Import de la vraie fonction login

const LoginPage = () => {
  const [formData, setFormData] = useState({
    code_permanent: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Correction ici
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await apiLogin(formData.code_permanent, formData.password);
      if (result.success) {
        setError("");
        setIsLoading(false);
        navigate("/dashboard");
      } else {
        setError(result.error || "Email ou mot de passe incorrect");
        setIsLoading(false);
      }
    } catch {
      setError("Erreur réseau ou serveur");
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgb(18, 36, 44) 0%, rgba(18, 36, 44, 0.9) 50%, rgb(18, 36, 44) 100%)",
      }}
    >
      {/* Animation flottante */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-10 h-10 rounded-full opacity-30 animate-pulse"
          style={{
            background: "rgba(245, 222, 179, 0.1)",
            top: "20%",
            left: "10%",
            animation: "float 20s infinite linear",
          }}
        />
        <div
          className="absolute w-30 h-30 rounded-full opacity-20 animate-pulse"
          style={{
            background: "rgba(245, 222, 179, 0.1)",
            top: "60%",
            right: "15%",
            animation: "float 20s infinite linear 7s",
          }}
        />
        <div
          className="absolute w-15 h-15 rounded-full opacity-25 animate-pulse"
          style={{
            background: "rgba(245, 222, 179, 0.1)",
            bottom: "20%",
            left: "20%",
            animation: "float 20s infinite linear 14s",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-sm mx-auto">
        <div
          className="backdrop-blur-xl rounded-3xl p-6 shadow-2xl"
          style={{
            background: "rgba(18, 36, 44, 0.95)",
            border: "1px solid rgba(245, 222, 179, 0.2)",
            boxShadow:
              "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(245, 222, 179, 0.1)",
          }}
        >
          {/* Logo + Titre */}
          <div className="text-center mb-8">
            <div className="flex justify-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, rgb(245, 222, 179), rgba(245, 222, 179, 0.8))",
                  boxShadow: "0 8px 16px rgba(245, 222, 179, 0.3)",
                }}
              >
                <img
                  src={logo}
                  alt="Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold text-white">LATTON FORUM</h1>
            </div>
            <p className="text-gray-300 mb-1">Bon retour parmi nous</p>
            <p className="text-sm text-[rgb(245,222,179)]">
              Connectez-vous à votre espace communautaire
            </p>
          </div>

          {/* Formulaire */}
          <div className="space-y-4">
            {/* Email */}
            <input
              type="text"
              name="code_permanent"
              value={formData.code_permanent}
              onChange={handleInputChange}
              placeholder="Code Permanent"
              className="w-full px-5 py-4 rounded-xl text-white bg-[rgba(18,36,44,0.6)] border border-[rgba(245,222,179,0.2)] outline-none transition focus:border-[rgb(245,222,179)] focus:bg-[rgba(18,36,44,0.8)]"
              required
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Mot de passe"
                className="w-full px-5 py-4 pr-12 rounded-xl text-white bg-[rgba(18,36,44,0.6)] border border-[rgba(245,222,179,0.2)] outline-none transition focus:border-[rgb(245,222,179)] focus:bg-[rgba(18,36,44,0.8)]"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.5)] hover:text-[rgb(245,222,179)]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Options */}
            <div className="flex justify-between text-sm text-gray-300">
              <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleInputChange}
                  className="accent-[rgb(245,222,179)]"
                />
                Se souvenir de moi
              </label>
              <a href="#" className="text-[rgb(245,222,179)] hover:underline">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Bouton de connexion */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full py-4 rounded-xl font-semibold bg-[rgb(245,222,179)] text-[rgb(18,36,44)] hover:opacity-90 transition disabled:opacity-50"
            >
              {isLoading ? "Connexion..." : "Connexion"}
            </button>

            {/* Message d'erreur */}
            {error && (
              <p className="text-red-400 text-center text-sm">{error}</p>
            )}
            {/* Bouton vers inscription */}
            <div className="text-center mt-2">
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-[rgb(245,222,179)] hover:underline text-sm"
              >
                Pas encore de compte ? S'inscrire
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
