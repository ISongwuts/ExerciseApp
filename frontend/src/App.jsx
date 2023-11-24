import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar.jsx"
import HomePage from "./Pages/HomePage/HomePage.jsx";
import ContentPage from "./Pages/ContentPage/ContentPage.jsx";
import ContactPage from "./Pages/ContactPage/ContactPage.jsx";

function App() {
  return (
    <div className="h-screen bg-PrimaryBG ">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/content" element={<ContentPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
