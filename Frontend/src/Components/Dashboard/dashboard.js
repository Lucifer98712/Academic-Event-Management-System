// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, getEvents } from "../../Utils/ClientApi";
import "./Dashboard.css";
import EventManagement from "./EventManagement";
import UserManagement from "./UserManagement";

// SVG Icons as components
const BellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16ZM16 17H8V11C8 8.52 9.51 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17Z"
      fill="currentColor"
    />
  </svg>
);

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
      fill="currentColor"
    />
  </svg>
);

const DashboardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z"
      fill="currentColor"
    />
  </svg>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    totalRequests: 0,
    activeEvents: 0,
  });

  // Add ref for click outside handling
  const userDropdownRef = React.useRef(null);

  useEffect(() => {
    // Handle clicks outside of dropdown
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Add logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    // Check user authentication
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/login");
    }

    // Fetch dashboard stats
    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      // Replace with your actual API calls
      const usersCount = await getAllUsers();
      const eventsCount = await getEvents();

      setStats({
        totalUsers: usersCount.data?.users?.length || 0,
        totalEvents: eventsCount.data?.events?.length || 0,
        totalRequests:eventsCount.data?.events?.filter((e) => e.status === "pending").length || 0,
        activeEvents: eventsCount.data?.events?.filter((e) => e.status === "active").length || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "events":
        return <EventManagement onUpdate={fetchStats} />;
      case "users":
        return <UserManagement onUpdate={fetchStats} />;
      default:
        return (
          <div className="dashboard-stats">
            <div className="stats-card">
              <h3>Total Users</h3>
              <p>{stats.totalUsers}</p>
            </div>
            <div className="stats-card">
              <h3>Total Events</h3>
              <p>{stats.totalEvents}</p>
            </div>
            <div className="stats-card">
              <h3>Active Events</h3>
              <p>{stats.activeEvents}</p>
            </div>
            <div className="stats-card">
              <h3>Pending Requests</h3>
              <p>{stats.totalRequests}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-logo">Admin Dashboard</div>
        <div className="nav-icons">
          <button className="icon-button">
            <BellIcon />
          </button>
          <div className="user-dropdown" ref={userDropdownRef}>
            <button className="icon-button" onClick={() => setShowUserDropdown(!showUserDropdown)}>
              <UserIcon />
            </button>
            {showUserDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <span className="user-name">
                    {JSON.parse(localStorage.getItem("user"))?.name || "Admin"}
                  </span>
                  <span className="user-role">Administrator</span>
                </div>
                <button className="dropdown-item" onClick={handleLogout}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
                      fill="currentColor"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <button
            className={`sidebar-item ${activeSection === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveSection("dashboard")}
          >
            <DashboardIcon />
            Dashboard
          </button>
          <button
            className={`sidebar-item ${activeSection === "events" ? "active" : ""}`}
            onClick={() => setActiveSection("events")}
          >
            Event Management
          </button>
          <button
            className={`sidebar-item ${activeSection === "users" ? "active" : ""}`}
            onClick={() => setActiveSection("users")}
          >
            User Management
          </button>
          <button
            className={`sidebar-item ${activeSection === "reports" ? "active" : ""}`}
            onClick={() => setActiveSection("reports")}
          >
            Reports
          </button>
          <button
            className={`sidebar-item ${activeSection === "feedback" ? "active" : ""}`}
            onClick={() => setActiveSection("feedback")}
          >
            Feedback
          </button>
        </aside>

        <main className="dashboard-main">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Dashboard;
