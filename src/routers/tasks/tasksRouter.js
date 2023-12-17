import { Router } from "express";
const router = Router();
import tasksController from "../../controllers/tasks/tasksController.js";
import { isAuth } from "../../middlewares/auth.js";

// Get list
router.get("/tasks", isAuth, async (req, res) => {
  const currentUserId = req.currentUserId;

  const taskList = await tasksController.withDetailsAsync();

  if (!taskList)
    return res.send(400).json({
      message: "No se ha podido obtener la lista de tareas",
    });

  return res.json(taskList);
});

// Get one
router.get("/tasks/:id", isAuth, async (req, res) => {
  const task = await tasksController.getAsync(parseInt(req.params.id));

  if (!task)
    return res.status(404).json({
      message: "Tarea no encontrada",
    });

  return res.json(task);
});

// Create
router.post("/tasks", isAuth, async (req, res) => {
  const currentUserId = req.currentUserId;

  const newTask = await tasksController.createAsync(req.body, currentUserId);

  if (!newTask)
    return res.status(400).json({
      message: "No se ha podido crear tarea",
    });

  return res.json(newTask);
});

// Update
router.put("/tasks/:id", isAuth, async (req, res) => {
  const updatedTask = await tasksController.updateAsync(
    parseInt(req.params.id),
    req.body
  );

  if (!updatedTask)
    return res.status(400).json({
      message: "No se ha podido actualizar la tarea",
    });

  return res.json(updatedTask);
});

// Delete
router.delete("/tasks/:id", isAuth, async (req, res) => {
  const deletedTask = await tasksController.deleteAsync(
    parseInt(req.params.id)
  );

  if (!deletedTask)
    return res.status(400).json({
      message: "No se ha podido eliminar la tarea",
    });

  return res.json(deletedTask);
});

export default router;
