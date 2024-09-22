import { createContext, useContext, useState, useEffect } from "react";
import axios from "../utils/axios";
import { toast } from "react-toastify";

// Initialize the AuthContext
const AuthContext = createContext();

// Custom hook for accessing the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [account, setAccount] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Register a new user
  const register = async (formData = {}) => {
    try {
      const response = await axios.post("/auth/register", formData);
      const {
        data: { data: accountData, token: accessToken },
      } = response;
      toast.success("Registration successful");
      handleAuthSuccess(accountData, accessToken);
      return true;
    } catch (error) {
      toast.error(`Registration failed:${error}`);
      handleAuthError(error);
    }
  };

  // Log in an existing user
  const login = async (formData = {}) => {
    try {
      const response = await axios.post("/auth/login", formData);
      const {
        data: { data: accountData, token: accessToken },
      } = response;
      toast.success("Login successful");
      handleAuthSuccess(accountData, accessToken);
      return true;
    } catch (error) {
      handleAuthError(error);
    }
  };

  // Log out the current user
  const logout = () => {
    setIsLoggedIn(false);
    setAccount(null);
    setToken(null);
    localStorage.removeItem("token");
    toast.success("Logout successful");
  };

  // Authenticate user with existing token
  const loginWithToken = async () => {
    try {
      const response = await axios.get("/auth/login", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const {
        data: { data: accountData, token: accessToken },
      } = response;
      handleAuthSuccess(accountData, accessToken);
    } catch (error) {
      if (error?.response?.status === 401) {
        setToken(null);
        localStorage.removeItem("token");
      }
      console.error("Token login failed:", error);
    }
  };

  // Handle successful authentication
  const handleAuthSuccess = (accountData, accessToken) => {
    setAccount(accountData);
    setToken(accessToken);
    setIsLoggedIn(true);
    localStorage.setItem("token", accessToken);
  };

  // Handle authentication errors
  const handleAuthError = (error) => {
    console.error("Authentication error:", error);
    throw new Error(error?.response?.data?.message || error.message);
  };

  // Sync token with localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Attempt to log in with token if not logged in
  useEffect(() => {
    if (!isLoggedIn && !account && token) {
      loginWithToken();
    }
  }, [isLoggedIn, account, token]);

  // Provide the auth context to the children
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, account, token, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
