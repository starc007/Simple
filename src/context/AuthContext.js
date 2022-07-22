import React, { useContext, useState, createContext } from "react";
import { Login, getProfile } from "../api/index";
const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async () => {
    setLoading(true);
    try {
      const { ethereum } = window;
      if (!ethereum) return setError("Please install MetaMask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      let userdata = {
        wallet_address: accounts[0].toLowerCase(),
      };
      const { data } = await Login(userdata);
      setUser(data.user);
      localStorage.setItem("Stoken", data.token);
      window.location.href = "/doc";
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("Stoken");
    setUser(null);
    window.location.href = "/";
  };

  const GetProfile = async () => {
    const token = localStorage.getItem("Stoken");
    if (!token) {
      window.location.href = "/";
      return;
    }
    try {
      const { data } = await getProfile();
      setUser(data.user);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const value = {
    login,
    user,
    loading,
    error,
    logout,
    GetProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
