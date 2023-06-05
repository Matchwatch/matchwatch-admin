import React, { useState, useEffect, Suspense } from "react";
import "./Dashboard.scss";

import dashboard from "../../Assets/dashboard.svg";
import events from "../../Assets/Events.svg";
import orders from "../../Assets/orders.svg";
import profile from "../../Assets/profile.svg";
import sales from "../../Assets/Overview/sales.svg";
// import orders from "../../Assets/Overview/orders.svg";
import productsicon from "../../Assets/Overview/products.svg";

import AddNewModal from "../Events/AddNewModal";

import { UserContext } from "../../App";
import { useContext } from "react";

import Events from "../Events/Events";
import Users from "../Users/Users";

const Dashboard = () => {
  const Auth = useContext(UserContext);
  const [page, setPage] = useState("Overview");

  console.log(Auth);

  return (
    <>
      {Auth.user.isAuthenticated ? (
        <div className="dashboard">
          <div className="left-panel">
            {/* <a href="/dashboard"> */}
            <button
              autoFocus="true"
              className="a"
              onClick={() => setPage("Overview")}
            >
              <img src={dashboard} alt="dashboard-icon" />
              Dashboard
            </button>
            {/* </a> */}

            <button className="a" onClick={() => setPage("Events")}>
              <img src={events} alt="events-icon" />
              Events
            </button>

            <button className="a" onClick={() => setPage("Users")}>
              <img src={profile} alt="profile-icon" />
              Users
            </button>
            {/* <button className="a" onClick={() => setPage("Profile")}>
            <img src={profile} alt="orders-icon" />
            Profile
          </button> */}
          </div>
          <div className="right-panel">
            {page == "Overview" && (
              <div className="overview">
                <div className="header">
                  <h1 className="header-text">Overview</h1>
                </div>
                <div className="opacity">
                  <div className="stat-cards">
                    <div className="card">
                      <img src={sales} alt="sales" />
                      <div className="text">
                        <p className="total">Total Users</p>
                        <p className="amount">1,374</p>
                      </div>
                    </div>
                    <div className="card">
                      <img src={orders} alt="sales" />
                      <div className="text">
                        <p className="total">Total Events</p>
                        <p className="amount">37</p>
                      </div>
                    </div>
                    <div className="card">
                      <img src={productsicon} alt="sales" />
                      <div className="text">
                        <p className="total">Total Subscribers</p>
                        <p className="amount">1,219</p>
                      </div>
                    </div>
                  </div>
                </div>
                <h1 className="soon">Coming soon! 🚀</h1>
              </div>
            )}
            {page == "Events" && <Events />}
            {page == "Users" && <Users />}
            {/* {page == "Profile" && <Profile />} */}
          </div>
        </div>
      ) : (
        <h1 className="loginpls">Please Log in 🔐</h1>
      )}
    </>
  );
};

export default Dashboard;
