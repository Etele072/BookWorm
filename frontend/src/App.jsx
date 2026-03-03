import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Cart from "./Cart.jsx";
import Orders from "./Orders.jsx";
import Aboutus from './Aboutus.jsx';
import Logo from "./BookwormLogo.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [loggedIn, setLoggedin] = useState(false);
  const [cart, setCart] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3000/me", { credentials: "include" });
        if (res.ok) setLoggedin(true);
      } catch (err) {
        setLoggedin(false);
      }
    };
    checkAuth();
  }, []);

  const logout = async () => {
    await fetch("http://localhost:3000/logout", { method: "POST", credentials: "include" });
    setLoggedin(false);
  };

  return (
    <BrowserRouter>
      <nav className='navbar' style={{ backgroundColor: darkMode ? "#1f3815" : "#5b9b42" }}>
        <div className='logo-container'>
          <img src={Logo} alt="Logo" className="navlogo" />
        </div>
        <div className='navlinks'>
          <button onClick={() => setDarkMode(!darkMode)} className="navbutton" style={{ marginRight: "20px", border: "1px solid #2b4c1e", borderRadius: "5px", padding: "5px 10px" }}>
            {darkMode ? "☀️" : "🌙"}
          </button>
          <NavLink to="/Home">Kezdőlap</NavLink>
          <NavLink to="Aboutus">Rólunk</NavLink>
          {loggedIn ? (
            <>
              <NavLink to="/Cart">Kosár ({cart.length})</NavLink>
              <NavLink to="/Orders">Rendeléseim</NavLink>
              <button onClick={logout} className='navbutton'>Kilépés</button>
            </>
          ) : (
            <>
              <NavLink to="/Register">Regisztráció</NavLink>
              <NavLink to="/Login">Bejelentkezés</NavLink>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/Home" element={<Home cart={cart} setCart={setCart} darkMode={darkMode} />} />
        <Route path="/Login" element={<Login setLoggedin={setLoggedin} darkMode={darkMode} />} />
        <Route path="/Register" element={<Register darkMode={darkMode} />} />
        <Route path="/Cart" element={<Cart cart={cart} setCart={setCart} darkMode={darkMode} />} />
        <Route path="/Orders" element={<Orders darkMode={darkMode} />} />
        <Route path="/Aboutus" element={<Aboutus darkMode={darkMode} />} />
        <Route path="/" element={<Home cart={cart} setCart={setCart} darkMode={darkMode} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;