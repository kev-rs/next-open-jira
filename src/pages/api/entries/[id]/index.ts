import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma, Entry } from '../../../../backend/utils/prisma'

type Data = { message: string | any } | Entry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch(req.method) {
    case 'PUT':
      return updateEntry(req, res);
    case 'GET':
      return getEntry(req, res);
    case 'DELETE':
      return deleteEntry(req, res);
    default:
      return res.status(400).json({ message: `Endpoint - ${req.method}, doesn\'t exist` })
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const query = req.query as { id: string };
  
  try {
    const entryToUpdate = await prisma.entry.findUnique({ where: { id: query.id } })
    if(!entryToUpdate) return;
    const { info = entryToUpdate.info, status = entryToUpdate.status } = req.body;
    const entryUpdated = await prisma.entry.update({ where: { id: query.id }, data: { info, status } })
    res.status(200).json(entryUpdated);
  } catch (error) {
    return res.status(400).json({ message: `Failed to update entry :( \n${error}` });
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const query = req.query as { id: string };
    const entry = await prisma.entry.findUnique({ where: { id: query.id }});
    if(!entry) return;
    return res.status(200).json(entry);  
  } catch (error) {
    return res.status(404).json({message: 'asd'})
  }
}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query as { id: string };

  try {
    const entry = await prisma.entry.delete({ where: { id } });
    return res.status(200).json(entry);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Can\'t perform delete action'})
  }
}
