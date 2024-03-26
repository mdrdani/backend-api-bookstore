const { PrismaClient } = require('@prisma/client');

const prismaClient = new PrismaClient();

module.exports = {
  checkout: async (req, res, next) => {
    try {
      const { payload } = req.body;
      const user = req.user.id;

      const transaction = await prismaClient.transaction.create({
        data: {
          invoice: `T-${Math.floor(100000 + Math.random() * 900000)}`,
          date: new Date(),
          userId: user,
        },
      });

      let errorBookIdNotFound = [];
      let errorBookIdStock = [];
      let detailTransactions = [];
      let updateStock = [];

      for (let i = 0; i < payload.length; i++) {
        const checkingBook = await prismaClient.books.findUnique({
          where: {
            id: payload[i].bookId,
            userId: user,
          },
        });

        if (!checkingBook) {
          errorBookIdNotFound.push(payload[i].bookId);
          continue;
        }

        if (payload[i].quantity > checkingBook.stock) {
          errorBookIdStock.push(
            `${payload[i].quantity} - ${checkingBook.stock}`
          );
          continue;
        }

        updateStock.push({
          id: payload[i].bookId,
          quantity: payload[i].quantity,
        });

        detailTransactions.push({
          transactionId: transaction.id,
          bookId: payload[i].bookId,
          titleBook: checkingBook.title,
          imageBook: checkingBook.image,
          priceBook: checkingBook.price,
          quantity: payload[i].quantity,
          authorBook: checkingBook.author,
        });
      }

      if (errorBookIdNotFound.length !== 0) {
        return res.status(404).json({
          message: 'Book not found',
          data: errorBookIdNotFound,
        });
      }

      if (errorBookIdStock.length !== 0) {
        return res.status(404).json({
          message: 'Book stock is not enough',
          data: errorBookIdStock,
        });
      }

      // Create detail transactions
      const createDetailTransactions =
        await prismaClient.transactionDetail.createMany({
          data: detailTransactions,
        });

      // Update book stocks
      for (const book of updateStock) {
        await prismaClient.books.update({
          where: { id: book.id },
          data: { stock: { decrement: book.quantity } },
        });
      }

      return res.status(201).json({
        message: 'Checkout success',
        data: createDetailTransactions,
      });
    } catch (err) {
      next(err);
    }
  },
};
