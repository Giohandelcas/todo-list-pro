import express from "express";
import dotenv from "dotenv";
import { db } from "./db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", async (req, res) => {
    try{
        const [rows] = await db.query("SELECT NOW() AS now");
        res.send(`Conexión exitosa ✅. Fecha y hora: ${rows[0].now}`)
    } catch (err) {
        res.status(500).send("Error conectando a la base de datos ❌")
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})