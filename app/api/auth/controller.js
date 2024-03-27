const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prismaClient = new PrismaClient();

module.exports = {
  // signin
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
                role: checkUser.role,
              },
            },
            'secret',
            { expiresIn: '12h' }
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
  // end

  // signup
  signup: async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword } = req.body;
      if (password !== confirmPassword) {
        res.status(403).json({ message: 'Password not match' });
      }

      const checkEmail = await prismaClient.user.findUnique({
        where: {
          email: email,
        },
      });
      if (checkEmail) {
        return res.status(403).json({ message: 'Email already exists' });
      }

      const user = await prismaClient.user.create({
        data: {
          name,
          email,
          password: bcrypt.hashSync(password, 10),
          role: 'Admin',
        },
      });
      delete user.password;
      res.status(200).json({ message: 'Success Signup', data: user });
    } catch (err) {
      next(err);
    }
  },
  // end

  signout: async (req, res, next) => {
    try {
      res.status(200).json({ message: 'Signout successful' });
    } catch (err) {
      next(err);
    }
  },
};
