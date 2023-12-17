import { Router } from "express";
const router = Router();
import authController from "../../controllers/auth/authController.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../../libs/jwt.js";

// Login
router.post("/login", async (req, res) => {
  await authController.loginAsync(req.body);
});

// Logout
router.post("/logout", async () => {
  await authController.logoutAsync();
});

// Register
router.post("/register", async (req, res) => {
  try {
    const newUser = {
      ...req.body,
    };

    const { password } = newUser;
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.password = hashedPassword;

    const registeredUser = await authController.registerAsync(newUser);

    if (!registeredUser) {
      return res.status(400).json({
        message: "Error al registrar al usuario",
      });
    }

    const token = await createAccessToken({ id: registeredUser.id });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json(registeredUser);
  } catch (error) {
    console.error("Error en el registro:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
});

// Profile data
router.get("/profile", isAuth, async (req, res) => {
  const user = await authController.getAsync(parseInt(req.currentUserId));

  if (!user)
    return res.status(404).json({
      message: "Usuario no encontrado",
    });

  return res.json(user);
});

// Users list
router.get("/user", async (req, res) => {
  const userList = await authController.withDetailsAsync();

  if (!userList)
    return res.status(400).json({
      messag: "No se ha podido obtener la lista de usuarios",
    });

  return res.send(userList);
});

export default router;
