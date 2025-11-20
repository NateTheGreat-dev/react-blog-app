import React from "react";
import { Link } from "react-router-dom";
import Slideshow from "../components/Slideshow";

export default function HomePage() {
  return (
    <section className="home-page">
      <div className="home-inner">
        <Slideshow
          images={[
            "assets/pexels-hungtran-3699434.jpg",
            "assets/pexels-jplenio-1423600.jpg",
            "assets/pexels-pixabay-247599.jpg"
          ]}
        />
        <h1>Welcome to The Blog Party </h1>

        <p className="home-tagline">
          This is a place where you can talk about anything. Please keep it respectful! Try to remain as interactive as possible.
        </p>

        <p className="home-description">
          Use the buttons below to log in.
          You must log in to comment on blog posts!
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
