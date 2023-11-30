import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/footer.jsx";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import ContentPage from "./Pages/ContentPage/ContentPage.jsx";
import ContactPage from "./Pages/ContactPage/ContactPage.jsx";
import ArticlePage from "./Pages/ArticlePage/ArticlePage.jsx";

function App() {
  const [isThemeMode, setIsThemeMode] = useState("light")

  const themeModeHandler = () => {
        setIsThemeMode(isThemeMode === "light" ? "dark" : "light")
        console.log(isThemeMode)
  }

  return (
    <div className={`flex flex-col min-h-screen ${isThemeMode === "light" ? "bg-[#fff7ed]" : "bg-PrimaryBG"}`}>
      <Router>
        <Navbar themeModeHandler={themeModeHandler}/>
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
