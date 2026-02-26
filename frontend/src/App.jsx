import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, NavLink} from "react-router-dom";
import Home from "./Home.jsx";
import Register from './Register.jsx';
import Login from "./Login.jsx";
import './App.css'

function App() {

const [loggedIn, setLoggedin] = useState(false);

  useEffect(() =>{
    if(localStorage.getItem("token")){
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
    <nav>
    <NavLink to="/Home">Kezdőlap</NavLink> | {" "}
    {loggedIn ? (
      <>
      <button onClick={logout}>Kilépés</button>
      </>
    ):(
      <>
    <NavLink to="/Register">Regisztráció</NavLink> | {" "}
    <NavLink to="/Login">Bejelentkezés</NavLink>
      </>
    )}

    </nav>
    <Routes>
      <Route path="/Home" element={<Home/>} />
      <Route path="/Register" element={<Register/>}/>
      <Route path="/Login" element={<Login setLoggedin={setLoggedin}/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App
