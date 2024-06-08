import React, { useEffect } from "react";
import Login from "./Components/Login/Login";
import backgroundImg from "./Assets/background.png";
import Register from "./Components/Register/Register";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";

function App() {
  var imageURL = chrome.runtime.getURL("images/background.png");

  return (
    <div className="frame">
      <header className="header">
        <img src={imageURL} alt="logo" />
      </header>
      <HashRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
        </Routes>
      </HashRouter>
      <Footer />
    </div>
  );
}

export default App;
