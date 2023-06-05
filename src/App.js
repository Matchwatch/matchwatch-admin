import logo from "./logo.svg";
import "./App.scss";
import React, { useState, createContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Navigate,
  Routes,
} from "react-router-dom";

import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Components/Login/Login";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({
    token: localStorage.getItem("token"),
    email: "",
    isAuthenticated: false,
    id: "",
    type: "",
  });
  const handleLogin = (token, email, id, type) => {
    localStorage.setItem("token", token);
    const newUser = {
      token,
      email: email,
      isAuthenticated: true,
      id: id,
      type: type,
    };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser({
      token: null,
      email: "",
      isAuthenticated: false,
      id: "",
      type: "",
    });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider>
      <div className="App">
        {/* <Navigation></Navigation> */}
        <Router>
          <UserContext.Provider value={{ user, handleLogin }}>
            <div className="bar">
              {!user.isAuthenticated && (
                <>
                  <Link className="head-text" to="/login">
                    Login
                  </Link>
                  {/* <Link className="head-text" to="/register">
                    Register
                  </Link> */}
                </>
              )}

              {user.isAuthenticated && (
                <Link className="head-text" to="/dashboard">
                  Dashboard
                </Link>
              )}
              {user.isAuthenticated && (
                <button className="logout-btn head-text" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </div>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              {/* <Route path="/register" element={<Register />} /> */}
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </UserContext.Provider>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
