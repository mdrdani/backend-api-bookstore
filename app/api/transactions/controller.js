const { PrismaClient } = require('@prisma/client');

const prismaClient = new PrismaClient();

module.exports = {
  getTransactionsList: async (req, res, next) => {
    try {
      const { keyword } = req.query;

      if (keyword) {
        const transaction = await prismaClient.transaction.findMany({
          where: {
            userId: req.user.id,
            invoice: {
              contains: keyword,
            },
          },
          include: {
            transactionDetail: true,
          },
        });
        return res
          .status(200)
          .json({ message: 'Success get search invoice', data: transaction });
      } else {
        const transaction = await prismaClient.transaction.findMany({
          where: {
            userId: req.user.id,
          },
          include: {
            transactionDetail: true,
          },
        });
        return res
          .status(200)
          .json({ message: 'Success get all transactions', data: transaction });
      }
    } catch (err) {
      next(err);
    }
  },

  detailTransactionsList: async (req, res, next) => {
    try {
      const { id } = req.params;

      const detailTransaction = await prismaClient.transaction.findUnique({
        where: {
          id: parseInt(id),
          userId: req.user.id,
        },
        include: {
          transactionDetail: true,
        },
      });

      return res.status(200).json({
        message: 'Success get detail transactions',
        data: detailTransaction,
      });
    } catch (err) {
      next(err);
    }
  },
};
