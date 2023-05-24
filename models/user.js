const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class User {
  static async create(user) {
    try {
      const createdUser = await prisma.user.create({
        data: {
          username: user.username,
          password: user.password,
          role: user.role,
        },
      });
      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  static async findByUsername(username) {
    try {
      const user = await prisma.user.findUnique({
        where: { username },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
