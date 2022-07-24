import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

const Navbar = () => {
  const { login, loading, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="py-5 flex justify-between">
      <Link
        to={user ? "/doc" : "/"}
        className="text-3xl font-bold text-gray-800"
      >
        Simple
      </Link>
      {user ? (
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center border border-gray-400 py-2 rounded-3xl sm:w-40 w-28"
          >
            <img
              src={user.avatar}
              className="sm:w-7 sm:h-7 w-4 h-4 ml-1 rounded-full"
            />
            <p className="sm:w-32 w-28 truncate text-sm">
              {user.wallet_address}
            </p>
          </button>

          {isOpen && (
            <div className="absolute w-28 sm:w-32 right-4">
              <div className="bg-white rounded-2xl flex justify-center py-2 text-gray-700 shadow-lg">
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="sm:text-xl text-base w-full"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={async () => {
            let res = await login();
            if (res) {
              navigate("/doc");
            }
          }}
          className="w-24 h-12 bg-gray-800 rounded-2xl font-medium text-white flex justify-center items-center"
        >
          {loading ? <Loader /> : "Login"}
        </button>
      )}
    </div>
  );
};

export default Navbar;
