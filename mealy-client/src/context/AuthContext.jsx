import { createContext, useContext, useState, useEffect } from "react";
import { attachToken } from "../api"; // ✅ make sure path is correct

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("meally-user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // ✅ Attach token to Axios headers on app start
      if (parsedUser.token) {
        attachToken(parsedUser.token);
      }
    }
  }, []);

  const login = (email, role = "user", token) => {
    const userData = { email, role, token };
    setUser(userData);
    localStorage.setItem("meally-user", JSON.stringify(userData));

    // ✅ Attach token to Axios requests
    if (token) {
      attachToken(token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("meally-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
