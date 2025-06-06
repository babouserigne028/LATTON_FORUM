// Enregistre un utilisateur localement (à appeler une seule fois pour créer un compte de test)
export const register = (email, password) => {
  localStorage.setItem("user", JSON.stringify({ email, password }));
};

// Authentifie l'utilisateur avec email et mot de passe
export const login = (email, password) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.email === email && user.password === password) {
    localStorage.setItem("auth", "true");
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem("auth");
};

export const isAuthenticated = () => {
  return localStorage.getItem("auth") === "true";
};