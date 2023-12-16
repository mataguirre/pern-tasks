import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const tasksController = {
  getListAsync: async () => {
    return await prisma.task.findMany();
  },
  withDetailsAsync: async () => {
    return await prisma.task.findMany({
      include: {
        user: true,
      },
    });
  },
  getAsync: async (id) => {
    return await prisma.task.findFirst({
      where: {
        id,
      },
    });
  },
  createAsync: async (data) => {
    return await prisma.task.create({
      data: data,
    });
  },
  deleteAsync: async (id) => {
    return await prisma.task.delete({
      where: {
        id,
      },
    });
  },
  updateAsync: async (id, data) => {
    return await prisma.task.update({
      where: {
        id,
      },
      ...data,
    });
  },
};

export default tasksController;
