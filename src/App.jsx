import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";   // ← add this
import Nav from "./pages/Nav";
import Projects from "./pages/Projects";
import ScrollToTop from "./pages/ScrollToTop";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />  {/* ← add */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;