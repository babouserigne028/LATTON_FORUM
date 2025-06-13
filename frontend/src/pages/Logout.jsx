import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../components/auth";

const Logout = () => {
  const navigate = useNavigate();
  const [showModal] = useState(true);

  const handleConfirm = async () => {
    await logout();
    navigate("/");
  };

  const handleCancel = () => {
    navigate(-1); // Retour à la page précédente
  };

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(18,36,44,0.85)]">
        <div className="bg-[rgba(18,36,44,0.98)] rounded-3xl shadow-2xl p-8 min-w-[320px] text-center border border-[rgba(245,222,179,0.2)]">
          <h2 className="text-xl font-bold text-[rgb(245,222,179)] mb-2">
            Confirmer la déconnexion
          </h2>
          <p className="text-gray-200 mb-6">
            Voulez-vous vraiment vous déconnecter&nbsp;?
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleConfirm}
              className="px-6 py-2 rounded-xl font-semibold bg-[rgb(245,222,179)] text-[rgb(18,36,44)] hover:opacity-90 transition"
            >
              Oui, me déconnecter
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-2 rounded-xl font-semibold bg-transparent border border-[rgb(245,222,179)] text-[rgb(245,222,179)] hover:bg-[rgba(245,222,179,0.1)] transition"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Logout;