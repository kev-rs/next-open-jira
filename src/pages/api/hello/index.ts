import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<{ message: string }>) {
  return res.status(res.statusCode).json({ message: res.statusMessage });
}