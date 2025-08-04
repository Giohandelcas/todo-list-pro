import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { db } from "./db.js";
import taskRoutes from "./routes/tasks.js";
import authRoutes from "./routes/auth.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Middlewares (deben ir primero)
app.use(cors());
app.use(express.json());

// ✅ Rutas
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Ruta de prueba
app.get("/", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT NOW() AS now");
        res.send(`Conexión exitosa ✅. Fecha y hora: ${rows[0].now}`)
    } catch (err) {
        res.status(500).send("Error conectando a la base de datos ❌")
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
});
