import React, { createContext, useEffect, useMemo, useState } from "react";

// Simple theme context with persistence
export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  // Load saved theme once; default to light
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  // Flip between "light" and "dark"
  function toggleTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  // Apply theme and persist it
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
