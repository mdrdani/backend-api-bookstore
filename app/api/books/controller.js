const { PrismaClient } = require('@prisma/client');

const prismaClient = new PrismaClient();

module.exports = {
  getAllBooks: async (req, res, next) => {
    try {
      const { keyword, categoryId } = req.query;

      if (keyword && categoryId) {
        const books = await prismaClient.books.findMany({
          where: {
            title: {
              contains: keyword,
            },
            categoryId: parseInt(categoryId),
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
      } else if (keyword) {
        const books = await prismaClient.books.findMany({
          where: {
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
      } else if (categoryId) {
        const books = await prismaClient.books.findMany({
          where: {
            categoryId: parseInt(categoryId),
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

  createBooks: async (req, res, next) => {
    try {
      let user = req.user.id;
      const { title, price, categoryId, author, published, stock, image } =
        req.body;

      const checkCategory = await prismaClient.category.findUnique({
        where: {
          id: categoryId,
          userId: user,
        },
      });

      if (!checkCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }

      const book = await prismaClient.books.create({
        data: {
          title,
          price,
          categoryId,
          author,
          published,
          stock,
          image,
          userId: user,
        },
      });

      res.status(201).json({ message: 'Success create book', data: book });
    } catch (err) {
      next(err);
    }
  },

  updateBooks: async (req, res, next) => {
    try {
      let user = req.user.id;
      // get id
      const { id } = req.params;
      const { title, price, categoryId, author, published, stock, image } =
        req.body;

      const checkCategory = await prismaClient.category.findUnique({
        where: {
          id: categoryId,
          userId: user,
        },
      });

      const checkBook = await prismaClient.books.findUnique({
        where: {
          id: parseInt(id),
          userId: user,
        },
      });

      if (!checkBook) {
        return res.status(404).json({ message: 'Book not found' });
      }

      if (!checkCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }

      const book = await prismaClient.books.update({
        where: {
          id: parseInt(id),
        },
        data: {
          title,
          price,
          categoryId,
          author,
          published,
          stock,
          image,
          userId: user,
        },
      });

      res.status(201).json({ message: 'Success update book', data: book });
    } catch (err) {
      next(err);
    }
  },

  deleteBooks: async (req, res, next) => {
    try {
      let user = req.user.id;
      const { id } = req.params;

      const checkBook = await prismaClient.books.findUnique({
        where: {
          id: parseInt(id),
          userId: user,
        },
      });

      if (!checkBook) {
        return res.status(404).json({ message: 'Book not found' });
      }

      await prismaClient.books.delete({
        where: {
          id: parseInt(id),
        },
      });

      res.status(200).json({ message: 'Success delete book' });
    } catch (err) {
      next(err);
    }
  },
};
