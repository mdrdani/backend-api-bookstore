const { PrismaClient } = require('@prisma/client');

const prismaClient = new PrismaClient();

module.exports = {
  getAllBooks: async (req, res, next) => {
    try {
      const { keyword } = req.query;

      if (keyword) {
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
};
