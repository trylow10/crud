const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testPrisma() {
  try {
    const products = await prisma.product.findMany( { orderBy: {
      id: 'desc',
    },});
    console.log(products);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

testPrisma();
