const { PrismaClient } = require('@prisma/client');

const prismaClient = new PrismaClient();

module.exports = {
  getAllBooks: async (req, res, next) => {
    try {
      const { keyword } = req.query;
      if (keyword !== '') {
        const books = await prismaClient.books.findMany({
          where: {
            userId: req.user.id,
            title: {
              contains: keyword,
            },
          },
          include: {
            category: {
              select: {
                name: true,
              },
            },
          },
        });
        return res
          .status(200)
          .json({ message: 'Success get search books', data: books });
      } else {
        const books = await prismaClient.books.findMany({
          where: {
            userId: req.user.id,
          },
          include: {
            category: {
              select: {
                name: true,
              },
            },
          },
        });
        return res
          .status(200)
          .json({ message: 'Success get all books', data: books });
      }
    } catch (error) {
      next(error);
    }
  },
};
