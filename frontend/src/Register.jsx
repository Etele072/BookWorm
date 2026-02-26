import { useState } from "react";
import "./App.css";

function Register(){

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");

const handleRegister = async (e) =>{
    e.preventDefault()

    const res = await fetch("http://localhost:3000/register",{
        method: "POST",
        headers: {"Content-type":"application/json"},
        body: JSON.stringify({username,password,email})
    });

    if (res.ok) {
        alert("Sikeres regisztráció!")
    } else {
        alert("Hiba!")
    }

}

return(
    <>
    <form onSubmit={handleRegister}>
        <input type="text" placeholder="Felhasználónév" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Jelszó" value={password} onChange={(e) => setPassword(e.target.value)}/> 
        <button type="submit">Regisztráció</button>
    </form>
    </>
)


}
export default Register;