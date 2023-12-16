import app from "./app.js";
import tasksRouter from "./routers/tasks/tasksRouter.js";
import authRouter from "./routers/auth/authRouter.js";
let baseUrl = "/api";

app.listen(3000, () => {
  console.log(`Server at port ${3000}`);
});

app.use(baseUrl, tasksRouter);
app.use(baseUrl, authRouter);

app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});
