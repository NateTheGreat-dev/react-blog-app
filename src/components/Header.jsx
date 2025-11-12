import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export default function Header() {
  //read the current theme from context and a function to toggle it.
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">Nate's Blog Party</div>

        <nav className="nav">
          {/* Normal links to the routes */}
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
          {/* Button change for light and dark */}
          <button onClick={toggleTheme} className="btn btn-outline">
            Toggle {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </nav>
      </div>
    </header>
  );
}
