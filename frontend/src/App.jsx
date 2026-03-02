import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Cart from "./Cart.jsx";
import Orders from "./Orders.jsx";
import Logo from "./BookwormLogo.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [loggedIn, setLoggedin] = useState(false);
  const [cart, setCart] = useState([]);

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
      <nav className='navbar'>
        <div className='logo-container'>
          <img src={Logo} alt="Logo" className="navlogo" />
        </div>
        <div className='navlinks'>
          <NavLink to="/Home">Kezdőlap</NavLink>
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
        <Route path="/Home" element={<Home cart={cart} setCart={setCart} />} />
        <Route path="/Login" element={<Login setLoggedin={setLoggedin} />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;