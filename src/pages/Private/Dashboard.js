import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ContentProvider } from "../../context/ContentContext";

const Dashboard = () => {
  const { GetProfile } = useAuth();
  useEffect(() => {
    GetProfile();
  }, []);
  return (
    <div className="w-full">
      <ContentProvider>
        <Outlet />
      </ContentProvider>
    </div>
  );
};

export default Dashboard;
