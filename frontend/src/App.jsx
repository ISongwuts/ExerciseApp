import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/footer.jsx";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import ContentPage from "./Pages/ContentPage/ContentPage.jsx";
import ContactPage from "./Pages/ContactPage/ContactPage.jsx";
import ArticlePage from "./Pages/ArticlePage/ArticlePage.jsx";
import LoginModal from "./components/LoginModal/LoginModal.jsx";
import RegisterModal from "./components/RegisterModal/RegisterModal.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import ProfilePage from "./Pages/ProfilePage/ProfilePage.jsx";
function App() {
  const [isThemeMode, setIsThemeMode] = useState("dark")
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);
  const [isShowRegisterModal, setIsShowRegisterModal] = useState(false);

  const onCloseModalHandler = () => {
    setIsShowLoginModal(false);
    setIsShowRegisterModal(false);
  }

  const showLoginModalHandler = () => {
    setIsShowRegisterModal(false);
    setIsShowLoginModal(!isShowLoginModal);
    console.log(isShowLoginModal);
  }

  const showRegisterModalHandler = () => {
    setIsShowLoginModal(false);
    setIsShowRegisterModal(!isShowRegisterModal);
    console.log(isShowRegisterModal);
  }

  const themeModeHandler = () => {
    setIsThemeMode(isThemeMode === "light" ? "dark" : "light")
    console.log(isThemeMode)
  }


  return (
    <AuthProvider>
      <div className={`flex flex-col min-h-screen ${isThemeMode === "light" ? "bg-[#fff7ed]" : "bg-PrimaryBG"}`}>
        <LoginModal isShowModal={isShowLoginModal} closeModalHandler={onCloseModalHandler} loginModalHandler={showLoginModalHandler} registerModalHandler={showRegisterModalHandler} />
        <RegisterModal isShowModal={isShowRegisterModal} closeModalHandler={onCloseModalHandler} loginModalHandler={showLoginModalHandler} registerModalHandler={showRegisterModalHandler} />
        <Router>

          <Navbar themeModeHandler={themeModeHandler} loginModalHandler={showLoginModalHandler} />
          <div className=" h-full flex-grow overflow-auto ">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/content" element={<ContentPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/content/article/:id" element={<ArticlePage />} />
              <Route path="/profile/:id" element={<ProfilePage />}/>
              <Route path="*" element={<div className=" h-[70vh] items-center flex justify-center font-bold text-[3rem] font-body text-PrimaryColors"> Not Found or You do not have permission.</div>} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
