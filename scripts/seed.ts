import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.user.deleteMany();
    await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@mail.com',
        password: 'admin'
      }
    })

    await prisma.entry.deleteMany();
    await prisma.entry.createMany({
      data: [
        {
          info: '1-This is an info about the entry provided by kev w/ Prisma1',
          status: 'pending',
          createdAt: new Date()
        },
        {
          info: '2-This is an info about the entry provided by kev w/ Prisma2',
          status: 'in_progress',
          createdAt: new Date()
        },
        {
          info: '3-This is an info about the entry provided by kev w/ Prisma3',
          status: 'completed',
          createdAt: new Date()
        }
      ]
    })
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
