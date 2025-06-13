import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/favicon.png"; // Assurez-vous que le chemin est correct
//import { login } from "../pages/login.jsx"; // Import de la vraie fonction login

const Register = () => {
  const [form, setForm] = useState({
    prenom: "", // Added prenom field
    nom: "",
    email: "",
    password: "",
    password_confirmation: "",
    indicatif: "+221", // Valeur par défaut
    numero_telephone: "", // Nom cohérent
    niveau_id: "",
    date_naissance: "", // Added date_naissance field
    photo: null, // Added photo field
  });
  const [niveaux, setNiveaux] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedNiveau, setSelectedNiveau] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Comment out for artifact demo

  useEffect(() => {
    // Récupérer la liste des niveaux depuis l'API
    fetch("http://127.0.0.1:8000/api/niveaux")
      .then((res) => res.json())
      .then((data) => setNiveaux(data))
      .catch(() => setNiveaux([]));
  }, []);

  // Fermer le dropdown si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setForm({ ...form, [e.target.name]: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleNiveauSelect = (niveau) => {
    setSelectedNiveau(niveau);
    setForm({ ...form, niveau_id: niveau.id });
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Vérification que les champs obligatoires ne sont pas vides
      if (!form.prenom.trim()) {
        setError("Le prénom est obligatoire");
        setIsLoading(false);
        return;
      }

      if (!form.nom.trim()) {
        setError("Le nom est obligatoire");
        setIsLoading(false);
        return;
      }

      // Vérification de la taille de la photo
      if (form.photo && form.photo.size > 2048 * 1024) {
        setError("La photo ne doit pas dépasser 2MB");
        setIsLoading(false);
        return;
      }

      // Concaténation de l'indicatif et du numéro (optionnel)
      let telephoneComplet = null;
      if (form.numero_telephone.trim()) {
        telephoneComplet = form.indicatif + form.numero_telephone;
      }

      // Création du FormData pour gérer le fichier photo
      const formDataToSend = new FormData();
      formDataToSend.append("prenom", form.prenom.trim());
      formDataToSend.append("nom", form.nom.trim());
      formDataToSend.append("email", form.email.trim());
      formDataToSend.append("password", form.password);
      formDataToSend.append(
        "password_confirmation",
        form.password_confirmation
      );
      if (telephoneComplet) {
        formDataToSend.append("telephone", telephoneComplet);
      }
      formDataToSend.append("niveau_id", form.niveau_id);
      if (form.date_naissance) {
        formDataToSend.append("date_naissance", form.date_naissance);
      }
      if (form.photo) {
        formDataToSend.append("photo", form.photo);
      }

      console.log("FormData to send:", Object.fromEntries(formDataToSend));

      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          // Ne pas définir Content-Type pour FormData, le navigateur le fait automatiquement
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setShowModal(true); // Affiche le modal de confirmation
      } else {
        // Handle validation errors
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat();
          setError(errorMessages.join(" "));
        } else {
          setError(data.message || "Erreur lors de l'inscription");
        }
      }
    } catch (error) {
      console.error("Erreur:", error);
      setError("Erreur réseau ou serveur");
    }
    setIsLoading(false);
  };

  const handleGoToLogin = () => {
    setShowModal(false);
    navigate("/"); // Comment out for artifact demo
  };

  // Gestion clavier pour le menu déroulant personnalisé
  const handleDropdownKeyDown = (e) => {
    if (!isDropdownOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev < niveaux.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : niveaux.length - 1));
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault();
      handleNiveauSelect(niveaux[focusedIndex]);
      setFocusedIndex(-1);
    } else if (e.key === "Escape") {
      setIsDropdownOpen(false);
      setFocusedIndex(-1);
    }
  };

  useEffect(() => {
    if (isDropdownOpen && focusedIndex >= 0 && dropdownRef.current) {
      const optionNodes =
        dropdownRef.current.querySelectorAll(".niveau-option");
      if (optionNodes[focusedIndex]) {
        optionNodes[focusedIndex].scrollIntoView({ block: "nearest" });
      }
    }
  }, [focusedIndex, isDropdownOpen]);

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-2"
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
            background: "rgba(245, 222,179, 0.1)",
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

      <div className="relative z-10 w-full flex justify-center items-center">
        <div
          className="w-full max-w-xs mx-auto backdrop-blur-xl rounded-2xl p-1 shadow-2xl"
          style={{
            background: "rgba(18, 36, 44, 0.95)",
            border: "1px solid rgba(245, 222,179, 0.2)",
            boxShadow:
              "0 12px 24px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(245, 222, 179, 0.1)",
          }}
        >
          {/* Logo + Titre */}
          <div className="text-center mb-4">
            <div className="flex justify-center gap-3 mb-2">
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
                  className="w-10 h-10 object-contain rounded-lg"
                />
              </div>
              <h1 className="text-2xl font-bold text-white">LATTON FORUM</h1>
            </div>
            <p className="text-gray-300 mb-1">Créer un compte</p>
            <p className="text-sm text-[rgb(245,222,179)]">
              Rejoignez la communauté Latton Forum
            </p>
          </div>

          {/* Formulaire */}
          <div className="space-y-2">
            {/* Prénom et Nom côte à côte */}
            <div className="flex gap-2">
              <input
                type="text"
                name="prenom"
                placeholder="Prénom"
                value={form.prenom}
                onChange={handleChange}
                required
                className="w-1/2 px-4 py-2 rounded-xl text-white bg-[rgba(18,36,44,0.6)] border border-[rgba(245,222,179,0.2)] outline-none transition focus:border-[rgb(245,222,179)] focus:bg-[rgba(18,36,44,0.8)] text-sm"
              />

              <input
                type="text"
                name="nom"
                placeholder="Nom"
                value={form.nom}
                onChange={handleChange}
                required
                className="w-1/2 px-4 py-2 rounded-xl text-white bg-[rgba(18,36,44,0.6)] border border-[rgba(245,222,179,0.2)] outline-none transition focus:border-[rgb(245,222,179)] focus:bg-[rgba(18,36,44,0.8)] text-sm"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Adresse email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl text-white bg-[rgba(18,36,44,0.6)] border border-[rgba(245,222,179,0.2)] outline-none transition focus:border-[rgb(245,222,179)] focus:bg-[rgba(18,36,44,0.8)] text-sm"
            />

            <input
              type="password"
              name="password"
              placeholder="Mot de passe (min. 6 caractères)"
              value={form.password}
              onChange={handleChange}
              required
              minLength="6"
              className="w-full px-4 py-2 rounded-xl text-white bg-[rgba(18,36,44,0.6)] border border-[rgba(245,222,179,0.2)] outline-none transition focus:border-[rgb(245,222,179)] focus:bg-[rgba(18,36,44,0.8)] text-sm"
            />

            <input
              type="password"
              name="password_confirmation"
              placeholder="Confirmer le mot de passe"
              value={form.password_confirmation}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl text-white bg-[rgba(18,36,44,0.6)] border border-[rgba(245,222,179,0.2)] outline-none transition focus:border-[rgb(245,222,179)] focus:bg-[rgba(18,36,44,0.8)] text-sm"
            />

            {/* Date de naissance field */}
            <input
              type="date"
              name="date_naissance"
              value={form.date_naissance}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]} // Max today's date
              className="w-full px-4 py-2 rounded-xl text-white bg-[rgba(18,36,44,0.6)] border border-[rgba(245,222,179,0.2)] outline-none transition focus:border-[rgb(245,222,179)] focus:bg-[rgba(18,36,44,0.8)] text-sm"
              placeholder="Date de naissance (optionnel)"
            />

            {/* Photo field */}

            {/* Section téléphone avec indicatif et numéro */}
            <div className="flex gap-2">
              <select
                name="indicatif"
                value={form.indicatif}
                onChange={handleChange}
                className="w-1/3 px-3 py-2 rounded-xl bg-[rgba(18,36,44,0.6)] text-white border border-[rgba(245,222,179,0.2)] focus:border-[rgb(245,222,179)] text-sm"
              >
                <option value="+221">+221 (SN)</option>
                <option value="+225">+225 (CI)</option>
                <option value="+226">+226 (BF)</option>
                <option value="+237">+237 (CM)</option>
                <option value="+33">+33 (FR)</option>
                <option value="+216">+216 (TN)</option>
                <option value="+213">+213 (DZ)</option>
                <option value="+1">+1 (US/CA)</option>
              </select>
              <input
                type="tel"
                name="numero_telephone"
                placeholder="Numéro (optionnel)"
                value={form.numero_telephone}
                onChange={handleChange}
                className="w-2/3 px-4 py-2 rounded-xl text-white bg-[rgba(18,36,44,0.6)] border border-[rgba(245,222,179,0.2)] outline-none transition focus:border-[rgb(245,222,179)] focus:bg-[rgba(18,36,44,0.8)] text-sm"
              />
            </div>

            {/* Menu déroulant personnalisé */}
            <div className="relative" ref={dropdownRef}>
              <label htmlFor="niveau-dropdown" className="sr-only">
                Sélectionnez un niveau
              </label>
              <div
                id="niveau-dropdown"
                role="button"
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
                aria-controls="niveau-listbox"
                className={`w-full px-4 py-2 rounded-xl text-white bg-[rgba(18,36,44,0.6)] border cursor-pointer outline-none transition text-sm flex items-center justify-between ${
                  isDropdownOpen
                    ? "border-[rgb(245,222,179)] bg-[rgba(18,36,44,0.8)]"
                    : "border-[rgba(245,222,179,0.2)] hover:border-[rgba(245,222,179,0.4)]"
                }`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                tabIndex={0}
                type="button"
                onKeyDown={handleDropdownKeyDown}
              >
                <span
                  className={selectedNiveau ? "text-white" : "text-gray-400"}
                >
                  {selectedNiveau
                    ? selectedNiveau.code
                    : "Sélectionnez un niveau *"}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="rgb(245,222,179)"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Liste déroulante */}
              {isDropdownOpen && (
                <div
                  id="niveau-listbox"
                  role="listbox"
                  className="absolute bottom-full left-0 right-0 mb-1 rounded-xl overflow-y-auto z-50 shadow-2xl border border-[rgba(245,222,179,0.3)]"
                  style={{
                    background: "rgba(18, 36, 44, 0.98)",
                    backdropFilter: "blur(10px)",
                    boxShadow:
                      "0 8px 25px rgba(0,0,0,0.3), 0 0 0 1px rgba(245,222,179,0.1)",
                    maxHeight: "16rem",
                    width: "100%",
                    left: "0",
                    transform: "none",
                    maxWidth: "320px",
                  }}
                >
                  <div className="max-h-64 overflow-y-auto">
                    {niveaux.map((niveau, index) => (
                      <div
                        key={niveau.id}
                        role="option"
                        aria-selected={selectedNiveau?.id === niveau.id}
                        tabIndex={-1}
                        className={`niveau-option px-4 py-3 text-white text-sm cursor-pointer transition-all duration-200 border-b border-[rgba(245,222,179,0.1)] last:border-b-0
                          ${
                            selectedNiveau?.id === niveau.id
                              ? "bg-[rgba(245,222,179,0.15)] text-[rgb(245,222,179)]"
                              : ""
                          }
                          ${
                            focusedIndex === index
                              ? "ring-2 ring-[rgb(245,222,179)] bg-[rgba(245,222,179,0.10)]"
                              : ""
                          }
                          hover:bg-[rgba(245,222,179,0.1)] hover:text-[rgb(245,222,179)]`}
                        onClick={() => handleNiveauSelect(niveau)}
                        onMouseEnter={() => setFocusedIndex(index)}
                        style={{
                          outline: "none",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{niveau.code}</span>
                          {selectedNiveau?.id === niveau.id && (
                            <svg
                              className="w-4 h-4 text-[rgb(245,222,179)]"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="text-red-400 text-center text-xs bg-red-900/20 p-2 rounded-lg border border-red-500/30">
                {error}
              </div>
            )}
            <button
              onClick={handleSubmit}
              disabled={isLoading || !form.niveau_id}
              className="w-full py-2 rounded-xl font-semibold bg-[rgb(245,222,179)] text-[rgb(18,36,44)] hover:opacity-90 transition disabled:opacity-50 text-sm"
            >
              {isLoading ? "Inscription..." : "S'inscrire"}
            </button>
            <div className="text-center mt-1">
              <button
                onClick={handleGoToLogin}
                className="text-[rgb(245,222,179)] hover:underline text-xs bg-transparent border-none cursor-pointer"
              >
                Déjà un compte ? Se connecter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmation */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-xs w-full text-center">
            <h2 className="text-xl font-bold text-[rgb(18,36,44)] mb-4">
              Inscription réussie !
            </h2>
            <p className="mb-6 text-[rgb(18,36,44)]">
              Votre compte a été créé avec succès.
            </p>
            <button
              onClick={handleGoToLogin}
              className="w-full py-2 rounded-xl font-semibold bg-[rgb(245,222,179)] text-[rgb(18,36,44)] hover:opacity-90 transition text-sm"
            >
              Aller à la page de connexion
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
