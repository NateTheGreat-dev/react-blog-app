import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  //if already logged in, go to blog page
  if (isAuthenticated) {
    return <Navigate to="/posts" replace />;
  }

  function handleSubmit(e) {
    e.preventDefault();

    //clear previous error
    setErrorMsg("");

    const result = login(username.trim(), password.trim());

    if (!result.success) {
      setErrorMsg(result.message || "Login failed.");
      return;
    }
    navigate("/posts");
  }

  return (
    <section className="login-page">
      <h1>Login</h1>
      <p className="muted">
        Use any username and password or leave blank to login as guest.
        if you can come up with a random username and password use: Admin, Password: 1
      </p>

      <form className="form-stack login-form" onSubmit={handleSubmit}>
        <label>
          Username
          <input
            className="comment-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </label>

        <label>
          Password
          <input
            className="comment-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </label>

        {errorMsg && <p style={{ color: "crimson" }}>{errorMsg}</p>}

        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </section>
  );
}
