import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="home-page">
      <div className="home-inner">
        <h1>Welcome to The Blog Party </h1>

        <p className="home-tagline">
          This is a place where you can talk about anything. Please keep it respectful! and remain as interactive as possible.
        </p>

        <p className="home-description">
          Use the buttons below to log in.
          You must login to view and create blog posts.
        </p>

        <div className="home-actions">
          <Link to="/login" className="btn">
            Login
          </Link>
          <Link to="/posts" className="btn btn-outline">
            Explore Blog
          </Link>
        </div>
      </div>
    </section>
  );
}
