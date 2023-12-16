import { Router } from "express";
const router = Router();
import authController from "../../controllers/auth/authController.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../../libs/jwt.js";

// Login
router.post("/login", async (req, res) => {
  await authController.loginAsync().then((res) => {
    res.send(res);
  });
});

// Logout
router.post("/logout", async (req, res) => {
  await authController.logoutAsync().then((res) => {
    res.send(res);
  });
});

// Register
router.post("/register", async (req, res) => {
  const newUser = {
    ...req.body,
  };

  const { password } = newUser;
  const hashedPassword = await bcrypt.hash(password, 10);
  newUser.password = hashedPassword;

  await authController.registerAsync(newUser).then(async (newUser) => {
    if (!newUser) return;
    await createAccessToken({ user: newUser }).then((token) => {
      res.cookie("token", token, {
        httpOnly: true,
        //secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.json(newUser);
    });
  });
});

// Profile data
router.get("/profile/:id", async (req, res) => {
  await authController.getAsync(parseInt(req.params.id)).then((user) => {
    res.json(user);
  });
});

// Users list
router.get("/user", async (req, res) => {
  await authController
    .withDetailsAsync()
    .then((list) => {
      res.json(list);
    })
    .catch((err) => {
      res.json({
        status: "error",
        content: err.name,
      });
    });
});

export default router;
