import { db } from '../db.js';

// Obtener tareas del usuario autenticado
export const getTasks = async (req, res) => {
    const userId = req.user.id;

    try {
        const [tasks] = await db.query('SELECT * FROM tasks WHERE user_id = ?', [userId]);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener las tareas' })
    }
};

// Crear nueva tarea
export const createTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const userId = req.user.id;

    const [result] = await db.query(
      "INSERT INTO tasks (title, description, completed, user_id) VALUES (?, ?, ?, ?)",
      [title, description, completed, userId]
    );

    res.status(201).json({ message: "Tarea creada", taskId: result.insertId });
  } catch (err) {
    console.error("Error al crear tarea:", err); // 🟢 MUY IMPORTANTE
    res.status(500).json({ message: "Error al crear la tarea" });
  }
};

// Actualizar tarea
export const updateTask = async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;
  const { title, description } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE tasks SET title = ?, description = ? WHERE id = ? AND user_id = ?',
      [title, description, taskId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Tarea no encontrada o no autorizada' });
    }

    res.json({ id: taskId, title, description });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la tarea' });
  }
};

// Eliminar tarea
export const deleteTask = async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;

  try {
    const [result] = await db.query(
      'DELETE FROM tasks WHERE id = ? AND user_id = ?',
      [taskId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Tarea no encontrada o no autorizada' });
    }

    res.json({ message: 'Tarea eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tarea' });
  }
};