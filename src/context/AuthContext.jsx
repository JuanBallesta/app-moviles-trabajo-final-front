import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null); // Estado para almacenar el token

  // Configurar el token de autorización en los headers de axios
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Función para manejar el login
  const login = async (username, password) => {
    console.log("Login iniciado con:", username, password);
    const response = await axios.post("http://localhost:3000/auth/login", {
      username,
      password,
    });
    const accessToken = response.data.accessToken;
    setToken(accessToken);
    localStorage.setItem("accessToken", accessToken); // Guardar token en localStorage
  };

  // Función para manejar el registro
  const register = async (username, password) => {
    console.log("Registro iniciado con:", username, password);
    await axios.post("http://localhost:3000/auth/register", {
      username,
      password,
    });
  };

  // Función para refrescar el token
  const refreshToken = async () => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/refresh",
          { token: storedToken }
        );
        const newAccessToken = response.data.accessToken;
        setToken(newAccessToken);
        localStorage.setItem("accessToken", newAccessToken);
      } catch (error) {
        console.error("Error al refrescar el token", error);
        logout();
      }
    }
  };

  // Función para manejar el logout
  const logout = () => {
    setToken(null);
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common["Authorization"];
  };

  // Intentar refrescar el token al cargar la app
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken && !token) {
      refreshToken();
    }
  }, []);

  // Proveer el contexto
  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
