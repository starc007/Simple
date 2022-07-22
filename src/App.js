import jwtDecode from "jwt-decode";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import CreateDoc from "./pages/Private/CreateDoc";
import Dashboard from "./pages/Private/Dashboard";
import Docs from "./pages/Private/Docs";
import EditDocs from "./pages/Private/EditDocs";
import ReadDocs from "./pages/Private/ReadDocs";
import PrivateRoute from "./Routes/PrivateRoute";

const App = () => {
  const isValid = () => {
    let token = localStorage.getItem("Stoken");
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } else {
      return false;
    }
  };

  return (
    <div className="px-4 max-w-screen-xl mx-auto">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/doc"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route
              path="/doc"
              element={
                <PrivateRoute>
                  <Docs />
                </PrivateRoute>
              }
            />
            <Route
              path="/doc/create"
              element={
                <PrivateRoute>
                  <CreateDoc />
                </PrivateRoute>
              }
            />
            {isValid() && (
              <Route
                path="/doc/:hash"
                element={
                  <PrivateRoute>
                    <ReadDocs />
                  </PrivateRoute>
                }
              />
            )}
            <Route
              path="/doc/edit/:hash"
              element={
                <PrivateRoute>
                  <EditDocs />
                </PrivateRoute>
              }
            />
          </Route>
          {!isValid() && <Route path="/doc/:hash" element={<ReadDocs />} />}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
