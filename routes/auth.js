import expres from "express";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db.js";

const router = XPathExpression.Router();


// Register
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        const [existing] = await db.query("SELECT * FROM users WHERE username = ?", [username])
        if (existing.length > 0)
            return res.status(400).json({ msg: "el usuario ya existe" });

        const hashed = await bycrypt.hash(password, 10);
        await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashed]);

        res.status(201).json({ msg: "Usuario registrado" })
    } catch (err) {
        res.status(500).json({ msg: "Error al registro usuario" })
    }
});

// Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await await db.query("SELECT * FROM users WHERE username = ?", [username]);
        if (rows.length === 0)
            return res.status(400).json({ msg: "Credenciales invalidas" });

        const user = rows[0];
        const valid = await bycrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ msg: "Credenciales invalidas" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ token, user: { id: user.id, username: user.username } });
    } catch {

    }
})