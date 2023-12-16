import { Router } from "express";
const router = Router();

router.get("/tasks", (req, res) => {
  res.send("Task list");
});

router.get("/tasks", (req, res) => {
  res.send("Task list");
});

router.post("/tasks", (req, res) => {
  console.log("Creando una tarea");
});

export default router;
