import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    //try to load a saved user from localStorage so refresh keeps you logged in
    const saved = localStorage.getItem("auth-user");
    return saved ? JSON.parse(saved) : null;
  });

  //keep localStorage in sync whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("auth-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth-user");
    }
  }, [user]);

  //simple login function
  function login(username, password) {
    //basic validation because there is no server to check logins
    if (!username || !password) {
      return { success: false, message: "Please enter a username and password." };
    }

    //for this project, ANY non-empty username/password logs in.
    const fakeUser = { username };
    setUser(fakeUser);

    return { success: true };
  }

  //logout: clear the user
  function logout() {
    setUser(null);
  }

  //helper boolean
  const isAuthenticated = !!user;

  //value that all components can read
  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

//helper hook so components can do: const auth = useAuth();
export function useAuth() {
  return useContext(AuthContext);
}
