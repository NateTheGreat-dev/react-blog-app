// Header.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  // Read the current theme from context and a function to toggle it.
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Read auth info from our new AuthContext
  const { isAuthenticated, user, logout } = useAuth();

  function handleLogout() {
    logout();
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">The Blog Party</div>

        <nav className="nav">
          {/* Normal links to the routes */}
          <Link to="/">Home</Link>
          <Link to="/posts">Blog Posts</Link>
          <Link to="/contact">Contact</Link>

          {/* Show login / logout links based on auth state */}
          {isAuthenticated ? (
            <>
              <span className="user-label">
                Logged in as <b>{user?.username}</b>
              </span>
              <button onClick={handleLogout} className="btn btn-outline">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-outline">
              Login
            </Link>
          )}

          {/* Button change for light and dark */}
          <button onClick={toggleTheme} className="btn btn-outline">
            Toggle {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </nav>
      </div>
    </header>
  );
}
