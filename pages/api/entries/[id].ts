import type { NextApiRequest, NextApiResponse } from 'next'
import { Entry, IEntry } from '../../../models';
import mongoose from 'mongoose';
import { db } from '../../../mongoose';

type Data = { message: string } | IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  const { id } = req.query;

  if(!mongoose.isValidObjectId(id)) return res.status(400).json({ message: `ID -> is not a valid id` })

  switch(req.method) {
    case 'PUT':
      return updateEntry(req, res);
    default:
      return res.status(400).json({ message: `Endpoint - ${req.method}, does not exist` })
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if(!entryToUpdate) {
    await db.disconnect(); 
    return res.status(400).json({ message: `There is not entry with id -> ${id}` });
  }

  const { info = entryToUpdate.info, status = entryToUpdate.status } = req.body;

  try {
    const entryUpdated = await Entry.findByIdAndUpdate(id, { info, status }, { runValidators: true, new: true });
    res.status(200).json(entryUpdated!);
    await db.disconnect();
  } catch (err) {
    await db.disconnect();
    console.log(err);
    return res.status(400).json({ message: 'Failed to update entry :(' });
  }
}
