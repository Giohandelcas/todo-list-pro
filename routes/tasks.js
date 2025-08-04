// routes/tasks.js
import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from '../controllers/taskController.js';

const router = express.Router();

// Todas estas rutas están protegidas con JWT
router.get('/', authenticateToken, getTasks);           // GET /api/tasks
router.post('/', authenticateToken, createTask);        // POST /api/tasks
router.put('/:id', authenticateToken, updateTask);      // PUT /api/tasks/:id
router.delete('/:id', authenticateToken, deleteTask);   // DELETE /api/tasks/:id

export default router;
