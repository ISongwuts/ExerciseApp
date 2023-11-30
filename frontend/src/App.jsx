import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/footer.jsx";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import ContentPage from "./Pages/ContentPage/ContentPage.jsx";
import ContactPage from "./Pages/ContactPage/ContactPage.jsx";
import ArticlePage from "./Pages/ArticlePage/ArticlePage.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-PrimaryBG">
      <Router>
        <Navbar />
        <div className="flex-grow overflow-auto ">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/content" element={<ContentPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/content/article/:articleId" element={<ArticlePage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
