import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cp from "cookie-parser";
import mysql from "mysql2/promise";
import argon from "argon2";

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true                
}));
app.use(cp());

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "bookworm",
    password: ""
});

function authenticateToken(req, res, next) {
    const token = req.cookies['token'];

    if(token == null) return res.sendStatus(401);

    jwt.verify(token, "secret", (err, user) => {
        if(err) return res.sendStatus(403);

        req.user = user;
        next();
    })
}

app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || typeof (username) != "string") {
            return res.status(400).json({ message: "Invalid username" });
        }
        if (!email || typeof (email) != "string") {
            return res.status(400).json({ message: "Invalid email" });
        }
        if (!password || typeof (password) != "string" || password.length <= 8) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const hash = await argon.hash(password);

        const [result] = await pool.query("INSERT INTO users (username, email, password) VALUES(?,?,?)", [username, email, hash]);

        if (result.affectedRows != 1) {
            return res.status(400).json({ message: "Something went wrong" });
        }

        res.status(201).json({ message: "Succesfull registration" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || typeof (username) != "string") {
            return res.status(400).json({ message: "Invalid username" });
        }
        if (!password || typeof (password) != "string" || password.length <= 8) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const [result] = await pool.query("SELECT * FROM users WHERE username = ?",[username]);
        const user = result[0];

        if (!user) {
            return res.status(401).json({ message: "Wrong username or password" });
        ;}

        const matches = await argon.verify(user.password,password);

        if (matches) {
            const token = jwt.sign({ username: user.username }, "secret", { expiresIn: "1h" });
            
            res.cookie('token', token, { maxAge: 900000, httpOnly: true });
            return res.status(200).json({ message: "Succesfull login" });
        } else {
            return res.status(401).json({ message: "Wrong username or password" });
        };


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get("/me", authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT id, username, email FROM users WHERE username = ?", [req.user.username]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: "Felhasználó nem található" });
        }

        const user = rows[0];

        res.status(200).json({
            id : user.id,
            username: user.username,
            email: user.email
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
app.listen("3000", () => {
    console.log("A szerver elindult a 3000-se porton");
});