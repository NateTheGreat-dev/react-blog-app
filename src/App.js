import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BlogPostsPage from "./pages/BlogPostsPage";
import IndividualPostPage from "./pages/IndividualPostPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  //Each page is responsible for fetching its own data.
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="page">
          <Header />
          <main className="container content">
            <Routes>
              {/*home page*/}
              <Route path="/" element={<BlogPostsPage />} />

              {/*individual post page shows one post, its author, and comments*/}
              <Route path="/post/:id" element={<IndividualPostPage />} />

              {/*contact page*/}
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
