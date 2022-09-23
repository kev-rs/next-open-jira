import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma, Entry } from '../../../server/db/prisma';

type Data = 
  | { message: string }
  | Entry[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch(req.method) {
    case 'GET':
      return getEntries(req, res);
    default:
      return res.status(400).json({ message: `method - ${req.method} - doesn\'t exist` });
  }
}

const getEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const entries = await prisma.entry.findMany({ orderBy: { createdAt: 'asc' } });
    return res.status(200).json(entries);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: '_POST_ entries failed' });
  }
}