import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma, Entry } from '../../../server/db/prisma';

type Data = 
  | { message: string }
  | Entry[]
  | Entry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch(req.method) {
    case 'GET':
      return getEntries(req, res);
    case 'POST':
      return postEntry(req, res);
    default:
      return res.status(400).json({ message: `method - ${req.method} - doesn\'t exist` });
  }
}

const getEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const entries = await prisma.entry.findMany({ orderBy: { createdAt: 'asc' } });
    return res.status(200).json(entries);
  } catch (err) {
    return res.status(400).json({ message: '_POST_ entries failed' });
  }
}

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { info = '' } = req.body as { info: string };

  try {
    const newEntry = await prisma.entry.create({ data: { info } });
    return res.status(200).json(newEntry);
  } catch (err) {
    return res.status(400).json({ message: `${err}` });
  }
}