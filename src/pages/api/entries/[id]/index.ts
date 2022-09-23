import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma, Entry } from '../../../../server/db/prisma';

type Data = 
  | { message: string }
  | Entry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch(req.method) {
    case 'GET':
      return getEntry(req, res);
    case 'PUT':
      return updateEntry(req, res)
    default:
      return res.status(400).json({ message: `method <- ${req.method} -> not available` })
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { id } = req.query as { id: string };

  try {
    const entry = await prisma.entry.findUnique({ where: { id } });
    if(!entry) return;
    res.status(200).json(entry);
  } catch (err) {
    res.status(res.statusCode).json({ message: `${res.statusMessage}` });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query as { id: string };
  
  try {
    const entryToUpdate = await prisma.entry.findUnique({ where: { id } });
    if(!entryToUpdate) return;
    const { info = entryToUpdate.info, status = entryToUpdate.status } = req.body;
    const entryUpdated = await prisma.entry.update({ where: { id }, data: { info, status }});
    return res.status(200).json(entryUpdated);
  } catch (error) {
    res.status(500);
  }
}


