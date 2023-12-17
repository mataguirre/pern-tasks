import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import { createAccessToken } from "../../libs/jwt.js";

const authController = {
  withDetailsAsync: async () => {
    return await prisma.user.findMany({
      include: {
        tasks: true,
      },
    });
  },
  getListAsync: async () => {
    return await prisma.user.findMany();
  },
  getAsync: async (id) => {
    return await prisma.user.findFirst({
      where: {
        id,
      },
    });
  },
  loginAsync: async (req, res) => {
    try {
      // Extraigo los datos necesarios
      const { email, password } = req.body;

      // Busco al usuario en la DB
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      // Si no lo encuentro mando un mensaje de error
      if (user == null) {
        return res.status(404).json({
          message: "Correo no encontrado",
        });
      }

      // Si lo encuentro, verifico la coincidencia de contraseñas
      const valid = await bcrypt.compare(password, user.password);

      // Si la contraseña no es válida, mando un mensaje de error
      if (!valid) {
        return res.status(400).json({
          message: "La contraseña es incorrecta",
        });
      }

      // Si la contraseña es correcta, creo un token para el usuario
      const token = await createAccessToken({ id: user.id });

      // Si el token se generó correctamente, creo la cookie
      res.cookie("token", token, {
        // httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });

      // Envío la respuesta con el usuario
      console.log(req.cookies.token);
      return res.json(user);
    } catch (error) {
      // Manejo de errores
      console.error("Error en loginAsync:", error);
      return res.status(500).json({
        message: "Error interno del servidor",
      });
    }
  },
  registerAsync: async (data) => {
    return await prisma.user.create({
      data: { ...data },
    });
  },
};

export default authController;
