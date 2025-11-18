import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import BlogPostsPage from "./pages/BlogPostsPage";
import IndividualPostPage from "./pages/IndividualPostPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  // Each page is responsible for fetching its own data.
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="page">
            <Header />
            <main className="container content">
              <Routes>
                {/* Landing / Home page */}
                <Route path="/" element={<HomePage />} />

                {/* Login page */}
                <Route path="/login" element={<LoginPage />} />

                {/* Protected blog posts page */}
                <Route
                  path="/posts"
                  element={
                    <ProtectedRoute>
                      <BlogPostsPage />
                    </ProtectedRoute>
                  }
                />

                {/* Protected individual post page */}
                <Route
                  path="/post/:id"
                  element={
                    <ProtectedRoute>
                      <IndividualPostPage />
                    </ProtectedRoute>
                  }
                />

                {/* Contact page (public) */}
                <Route path="/contact" element={<ContactPage />} />

                {/* Catch-all */}
                <Route path="*" element={<p>Page not found.</p>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
