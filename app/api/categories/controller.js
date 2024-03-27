const { PrismaClient } = require('@prisma/client');

const prismaClient = new PrismaClient();

module.exports = {
  getAllCategories: async (req, res, next) => {
    try {
      const categories = await prismaClient.category.findMany();
      res
        .status(200)
        .json({ message: 'Success get all categories', data: categories });
    } catch (err) {
      next(err);
    }
  },

  createCategories: async (req, res, next) => {
    try {
      const { name } = req.body;
      const categories = await prismaClient.category.create({
        data: {
          name: name,
          userId: req.user.id,
        },
      });
      res
        .status(200)
        .json({ message: 'Success create category', data: categories });
    } catch (err) {
      next(err);
    }
  },

  updateCategories: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const categories = await prismaClient.category.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name: name,
        },
      });
      res
        .status(200)
        .json({ message: 'Success update category', data: categories });
    } catch (err) {
      next(err);
    }
  },

  deleteCategories: async (req, res, next) => {
    try {
      const { id } = req.params;
      const categories = await prismaClient.category.delete({
        where: {
          id: parseInt(id),
        },
      });
      res
        .status(200)
        .json({ message: 'Success delete category', data: categories });
    } catch (err) {
      next(err);
    }
  },
};
