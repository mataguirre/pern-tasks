import { Router } from "express";
const router = Router();
import tasksController from "../../controllers/tasks/tasksController.js";
import { isAuth } from "../../middlewares/auth.js";

// Get list
router.get("/task", isAuth, async (req, res) => {
  console.log(req.currentUser);
  await tasksController
    .withDetailsAsync()
    .then((list) => {
      console.log(list);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get one
router.get("/task/:id", async (req, res) => {
  await tasksController.getAsync(parseInt(req.params.id)).then((task) => {
    if (!task) return;
    res.json(task);
  });
});

// Create
router.post("/task", async (req, res) => {
  await tasksController.createAsync(req.body).then((newTask) => {
    if (!newTask) return;
    res.json(newTask);
  });
});

// Update
router.put("/task/:id", async (req, res) => {
  await tasksController
    .updateAsync(parseInt(req.params.id), req.body)
    .then((updatedTask) => {
      if (!updatedTask) return;
      res.json(updatedTask);
    });
});

// Delete
router.delete("/task/:id", async (req, res) => {
  await tasksController
    .deleteAsync(parseInt(req.params.id))
    .then((deletedTask) => {
      if (!deletedTask) return;
      res.json(deletedTask);
    });
});

export default router;
