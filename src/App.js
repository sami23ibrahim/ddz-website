import React from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Home from "./pages/Home";
import Service from "./pages/Service";
import ServiceMobile from "./pages/ServiceMobile";
import Blog from "./pages/Blog";
import Jobs from "./pages/Jobs";
import BeforePage from "./pages/beforePage";
import LanguageSwitcher from './Components/LanguageSwitcher';

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <HelmetProvider>
      <LanguageSwitcher />
      {/* <div style={{ position: 'fixed', top: 250, right: 20, zIndex: 1000 }}>
        <Link to="/beforePage">
          <button style={{ padding: '10px 10px', background: '#422f40', color: 'white', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
            B/A
          </button>
        </Link>
      </div> */}
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/service/:title" element={<Service />} />
        <Route path="/service-mobile/:title" element={<ServiceMobile />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/beforePage" element={<BeforePage />} />
      </Routes>
      {/* Show the modal when a background page is set */}
      {background && (
        <Routes>
          <Route path="/service/:title" element={<Service />} />
          <Route path="/service-mobile/:title" element={<ServiceMobile />} />
        </Routes>
      )}
    </HelmetProvider>
  );
}

export default App;