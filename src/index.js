import app from "./app.js";
import tasksRouter from "./routers/tasksRouter.js";

app.listen(3000, () => {
  console.log(`Server at port ${3000}`);
});

app.use("/api", tasksRouter);
