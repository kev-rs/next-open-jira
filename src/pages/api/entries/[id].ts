import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma, Entry } from '../../../db/client'

type Data = { message: string } | Entry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch(req.method) {
    case 'PUT':
      return updateEntry(req, res);
    default:
      return res.status(400).json({ message: `Endpoint - ${req.method}, does not exist` })
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const query = req.query as { id: string };
  if(!query.id) return res.status(400).json({ message: "ID not valid" });
  
  const entryToUpdate = await prisma.entry.findUnique({ where: { id: query.id } })

  if(!entryToUpdate) return res.status(404).json({ message: `There is not entry with id -> ${query.id}` });

  const { info = entryToUpdate.info, status = entryToUpdate.status } = req.body;

  try {
    const entryUpdated = await prisma.entry.update({ where: { id: query.id }, data: { info, status } })
    res.status(200).json(entryUpdated);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Failed to update entry :(' });
  }
}
