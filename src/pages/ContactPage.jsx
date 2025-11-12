import React from "react";

export default function ContactPage() {
  return (
    <section className="contact-page">
      <h1>Contact Us</h1>

      <div className="contact-card">
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" placeholder="Your name" />

          <label htmlFor="email">Email:</label>
          <input id="email" type="email" placeholder="you@example.com" />

          <label htmlFor="message">Message:</label>
          <textarea id="message" rows="5" placeholder="Type your message..." />

          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
}
