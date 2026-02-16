export const isLoggedIn = () => {
  return localStorage.getItem("adminLoggedIn") === "true";
};

export const login = (email, password) => {
  if (email === "admin@gmail.com" && password === "admin123") {
    localStorage.setItem("adminLoggedIn", "true");
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem("adminLoggedIn");
};
