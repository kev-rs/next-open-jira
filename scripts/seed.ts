import { prisma } from '../src/server/db/prisma';

async function seed() {
  try {
    await prisma.entry.deleteMany();
    await prisma.entry.createMany({
      data: [
        {
          info: 'Learn Next.js',
          status: 'pending'
        },
        {
          info: 'Learn tRPC',
          status: 'in_progress'
        },
        {
          info: 'Learn all about router',
          status: 'finished'
        }
      ]
    })
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
}

seed();
