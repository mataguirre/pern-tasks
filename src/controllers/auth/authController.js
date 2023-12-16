import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
  loginAsync: async (id, jsontoken) => {
    return await prisma.user.findFirst({
      where: {
        AND: {
          id,
          jsontoken,
        },
      },
    });
  },
  registerAsync: async (data) => {
    return await prisma.user.create({
      data: { ...data },
    });
  },
  logoutAsync: async (id, jsontoken) => {
    return await prisma.user.findFirst({
      where: {
        AND: {
          id,
          jsontoken,
        },
      },
    });
  },
};

export default authController;
