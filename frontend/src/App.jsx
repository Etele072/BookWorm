import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import Home from "./Home.jsx";
import Register from './Register.jsx';
import Login from "./Login.jsx";
import Logo from "./BookwormLogo.png";
import './App.css';

function App() {

  const [loggedIn, setLoggedin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedin(true);
    }
  }, []);

  function logout() {
    localStorage.removeItem("token")
    setLoggedin(false);
  }

  return (
    <>
      <BrowserRouter>
        <nav className='navbar'>
          <div className='logo-container'>
            <img src={Logo} alt="Bookwormlogo" className="navlogo" />
          </div>

          <div className='navlinks'>
            <NavLink to="/Home">Kezdőlap</NavLink>
            <NavLink to="/Aboutus">Rólunk</NavLink>
            {loggedIn ? (
              <>

                <NavLink to="/Profile">Profil</NavLink>
                <NavLink to="/Favourites">Kedvencek</NavLink>
                <NavLink to="/Orders">Rendelések</NavLink>
                <NavLink to="/Cart">Kosár</NavLink>
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
          <Route path="/Home" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login setLoggedin={setLoggedin} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
