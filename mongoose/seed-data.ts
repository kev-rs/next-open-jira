
interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  info: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      info: 'This is an info about the entry provided by kev',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      info: 'This is an info about the entry provided by kev2',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      info: 'This is an info about the entry provided by kev3',
      status: 'completed',
      createdAt: Date.now() - 100000,
    }
  ]
}
