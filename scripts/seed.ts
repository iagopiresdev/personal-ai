const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

async function main() {
  try {
    await db.category.deleteMany();
    await db.category.createMany({
      data: [
        { name: 'Workout Instructor'},
        { name: 'Meal Assistant' },
      ],
    });
  } catch (error) {
    console.error('Error seeding default categories:', error);
  } finally {
    await db.$disconnect();
  }
}

main();
