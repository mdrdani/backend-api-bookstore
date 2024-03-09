const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prismaClient = new PrismaClient();

module.exports = {
  signin: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const checkUser = await prismaClient.user.findUnique({
        where: {
          email: email,
        },
      });
      if (checkUser) {
        const checkPassword = bcrypt.compareSync(password, checkUser.password);

        if (checkPassword) {
          const token = jwt.sign(
            {
              user: {
                id: checkUser.id,
                name: checkUser.name,
                email: checkUser.email,
              },
            },
            'secret'
          );
          res.status(200).json({ message: 'Success Signin', data: token });
        } else {
          res.status(403).json({ message: 'Password not match' });
        }
      } else {
        res.status(403).json({ message: 'Email not found' });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};
