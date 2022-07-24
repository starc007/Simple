import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ContentProvider } from "../../context/ContentContext";

const Dashboard = () => {
  const { GetProfile } = useAuth();
  useEffect(() => {
    GetProfile();
  }, []);

  // const isValid = () => {
  //   let token = localStorage.getItem("Stoken");
  //   if (token) {
  //     const decoded = jwtDecode(token);
  //     const currentTime = Date.now() / 1000;
  //     return decoded.exp > currentTime;
  //   } else {
  //     return false;
  //   }
  // };

  return (
    <div className="w-full">
      {/* {isValid() && <Navigate to="/doc" />} */}
      <ContentProvider>
        <Outlet />
      </ContentProvider>
    </div>
  );
};

export default Dashboard;
