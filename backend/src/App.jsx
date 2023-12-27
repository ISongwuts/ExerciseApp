import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PostPage from './Pages/PostPage/PostPage';
import DatabasePage from './Pages/DatabasePage/DatabasePage';
import DashboardPage from './Pages/DashboardPage/DashboardPage';

function App() {
  const [isThemeMode, setIsThemeMode] = useState("dark")
  const themeModeHandler = () => {
    setIsThemeMode(isThemeMode === "light" ? "dark" : "light")
    console.log(isThemeMode)
  }
  return (
    <>
      <div className={`flex flex-col min-h-screen ${isThemeMode === "light" ? "bg-[#fff7ed]" : "bg-PrimaryBG"}`}>
        <Router>
          <Navbar themeModeHandler={themeModeHandler} />
          <div className="flex-grow overflow-auto ">
            <Routes>
              <Route path='/' element={<DashboardPage />} />
              <Route path='/post' element={<PostPage />} />
              <Route path='/database' element={<DatabasePage />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </>
  )
}

export default App
