import { PrismaClient, Prisma, Entry } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
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

    const entries = await prisma.entry.findMany();

    console.log(entries);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();

// const entriesData = [
//   {
//     info: 'This is an info about the entry provided by kev w/ Prisma',
//     status: 'pending',
//     createdAt: `${Date.now()}`
//   },
//   {
//     info: 'This is an info about the entry provided by kev2 w/ Prisma',
//     status: 'in_progress',
//     createdAt: `${Date.now() - 100000}`,
//   },
//   {
//     info: 'This is an info about the entry provided by kev3 w/ Prisma',
//     status: 'completed',
//     createdAt: `${Date.now() - 100000}` ,
//   }
// ]
