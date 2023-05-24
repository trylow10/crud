const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Product {
  static async create(product) {
    try {
      const createdProduct = await prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
        },
      });
      return createdProduct;
    } catch (error) {
      throw error;
    }
  }

  static async getAll() {
    try {
      const products = await prisma.product.findMany({
        orderBy: {
          id: 'desc',
        },
      });
      return products;
    } catch (error) {
      throw error;
    }
  }
  
  
  static async getById(id) {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
      });
      return product;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, updates) {
    try {
      await prisma.product.update({
        where: { id },
        data: updates,
      });
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      await prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Product;
