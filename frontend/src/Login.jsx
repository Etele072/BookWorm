import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Login({setLoggedin}){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault()
    
        const res = await fetch("http://localhost:3000/login",{
            method: "POST",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify({username,password,email})
        });

        const data = await res.json();
    
        if (res.ok) {
            alert("Sikeres bejelentkezés!");
            localStorage.getItem("token", data.token);
            navigate("/Home");
            setLoggedin(true);
        } else {
            alert("Hiba!")
        }
    }

    return(
        <>
        <form onSubmit={handleLogin}>
            <input type="text" placeholder="Felhasználónév" values="username" onChange={(e) => setUsername(e.target.value)}/>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Jelszó" values="password" onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Belépés</button>
        </form>
        </>
    )

}
export default Login;