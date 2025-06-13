export async function login(code_permanent, password) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json", // Important pour Laravel
      },
      body: JSON.stringify({ code_permanent, password }),
    });

    const data = await response.json();
    console.log("Réponse API:", data); // Pour débugger

    // Ton API renvoie 'access_token' et 'utilisateur'
    if (response.ok && data.access_token) {
      const token = data.access_token;
      
      // Stocke le token dans le localStorage
      localStorage.setItem("access_token", token);
      
      // CORRECTION ICI: Ton API renvoie 'utilisateur', pas 'user'
      if (data.utilisateur) {
        localStorage.setItem("user", JSON.stringify(data.utilisateur));
      }
      
      return {
        success: true,
        token: token,
        user: data.utilisateur || null, // Utilise 'utilisateur'
      };
    } else {
      // Gestion des erreurs plus détaillée
      let errorMessage = "Email ou mot de passe incorrect";
      
      if (data.message) {
        errorMessage = data.message;
      } else if (data.errors) {
        // Si Laravel renvoie des erreurs de validation
        const firstError = Object.values(data.errors)[0];
        errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
      }
      
      return {
        success: false,
        error: errorMessage,
      };
    }
  } catch (err) {
    console.error("Erreur fetch:", err);
    return {
      success: false,
      error: "Erreur réseau ou serveur indisponible",
    };
  }
}

// Fonction de déconnexion
export async function logout() {
  try {
    const token = localStorage.getItem("access_token");
    
    if (token) {
      await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
    }
    
    // Nettoie le localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    // Nettoie quand même le localStorage même en cas d'erreur
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    return { success: false, error: error.message };
  }
}

// Vérifie si l'utilisateur est connecté
export const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};

// Récupère l'utilisateur courant
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    return null;
  }
};

// Récupère le token
export const getAuthToken = () => {
  return localStorage.getItem("access_token");
};