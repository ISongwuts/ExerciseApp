import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/footer.jsx";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import ContentPage from "./Pages/ContentPage/ContentPage.jsx";
import ContactPage from "./Pages/ContactPage/ContactPage.jsx";

function App() {
  return (
    <div className=" CollapseCard-xl:h-screen  bg-PrimaryBG flex flex-col justify-between">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/content" element={<ContentPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
