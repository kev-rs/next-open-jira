import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma, Entry } from '../../../db/client'

type Data = 
  | { message: string; }
  | Entry[]
  | Entry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch(req.method) {
    case 'GET':
      return getEntries(res);
    case 'POST':
      return postEntry(req, res);
    default:
      return res.status(400).json({ message: `Endpoint - ${req.method}, does not exist` });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  const entries = await prisma.entry.findMany({ orderBy: { createdAt: "asc" } });
  return res.status(200).json(entries);
}

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { info = '' } = req.body;
  
  try {
    const newEntry = await prisma.entry.create({ data: { info }})
    res.status(201).json(newEntry);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong on the server :(' })
  }
}
