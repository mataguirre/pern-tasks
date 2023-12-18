import { Router } from "express";
const router = Router();
import authController from "../../controllers/auth/authController.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../../libs/jwt.js";
import { isAuth } from "../../middlewares/auth.js";
import md5 from "md5";

// Login
router.post("/login", async (req, res) => {
  await authController.loginAsync(req, res);
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  console.log(req.cookies.token);
  res.json({
    message: "Has cerrado sesión",
  });
});

// Register
router.post("/register", async (req, res) => {
  try {
    const newUser = {
      ...req.body,
    };

    const { password, email } = newUser;
    const hashedPassword = await bcrypt.hash(password, 10);
    const gravatar = `https://www.gravatar.com/avatar/${md5(email)}`;
    newUser.password = hashedPassword;
    newUser.gravatar = gravatar;

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
