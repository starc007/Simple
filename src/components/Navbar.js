import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="py-5 flex justify-between">
      <Link to="/" className="text-3xl font-bold">
        Simple
      </Link>
      <button className="px-3 py-3 bg-gray-800 rounded-xl font-medium text-white">
        Connect your wallet
      </button>
    </div>
  );
};

export default Navbar;
