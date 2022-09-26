import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma, User } from '../../../backend/utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = req.body as User;

  try {
    const userCreated = await prisma.user.create({ data: {...user} });
    return res.status(200).json(userCreated);
  } catch (error) {
    return res.status(400).json({error});
  }
}

