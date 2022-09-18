import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../mongoose';
import { Entry, type IEntry } from '../../../models';

type Data = 
  | { message: string; }
  | IEntry[]
  | IEntry

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
  await db.connect();
  const entries = await Entry.find().sort({ createdAt: 'ascending' });
  await db.disconnect();

  return res.status(200).json(entries);
}

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { info = '' } = req.body;
  const newEntry = new Entry({ info });
  
  try {
    await db.connect();
    newEntry.save();
    await db.disconnect();

    res.status(201).json(newEntry);
  } catch (err) {
    await db.disconnect();
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong on the server :(' })
  }

  res.status(201).json({ message: 'POST done...'})
}
