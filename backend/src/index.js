import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cp from "cookie-parser";
import mysql from "mysql2/promise";
import argon from "argon2";

const app = express();
app.use(express.json());
app.use(cp());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true                
}));

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "bookworm",
    password: ""
});

function authenticateToken(req, res, next) {
    const token = req.cookies['token'];
    if(!token) return res.sendStatus(401);

    jwt.verify(token, "secret", (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}


app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password || password.length < 8) {
            return res.status(400).json({ message: "Hibás adatok vagy túl rövid jelszó!" });
        }
        const hash = await argon.hash(password);
        await pool.query("INSERT INTO users (username, email, password) VALUES(?,?,?)", [username, email, hash]);
        res.status(201).json({ message: "Sikeres regisztráció" });
    } catch (error) {
        res.status(500).json({ message: "Regisztrációs hiba" });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const [result] = await pool.query("SELECT * FROM users WHERE username = ?",[username]);
        const user = result[0];

        if (!user || !(await argon.verify(user.password, password))) {
            return res.status(401).json({ message: "Hibás adatok!" });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, "secret", { expiresIn: "1h" });
        res.cookie('token', token, { maxAge: 3600000, httpOnly: true, sameSite: 'lax' });
        return res.status(200).json({ message: "Sikeres login" });
    } catch (error) {
        res.status(500).json({ message: "Login hiba" });
    }
});

app.post("/logout", (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Kijelentkezve" });
});

app.get("/me", authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT id, username, email FROM users WHERE id = ?", [req.user.id]);
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Szerver hiba" });
    }
});


app.get("/books", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT id, title, author, release_date FROM books");
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Szerver hiba a könyveknél" });
    }
});


app.post("/orders", authenticateToken, async (req, res) => {
    const { items, total } = req.body;
    const userId = req.user.id;
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    try {
        const [orderResult] = await pool.query(
            "INSERT INTO orders (user_id, total, date, status) VALUES (?, ?, ?, ?)",
            [userId, total, date, "Feldolgozás alatt"]
        );
        
        const orderId = orderResult.insertId;

        for (const item of items) {
            await pool.query(
                "INSERT INTO order_items (order_id, book_id) VALUES (?, ?)",
                [orderId, item.id]
            );
        }

        res.status(201).json({ message: "Rendelés sikeresen mentve!", orderId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Hiba a rendelés mentésekor" });
    }
});

app.get("/my-orders", authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT id, total, date, status FROM orders WHERE user_id = ? ORDER BY date DESC",
            [req.user.id]
        );
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Hiba a rendelések lekérésekor" });
    }
});

app.listen("3000", () => console.log("Szerver fut a 3000-es porton"));