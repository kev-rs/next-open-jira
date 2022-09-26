import type { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tokenAuth } = req.cookies as { tokenAuth: string };

  if(!tokenAuth) return res.status(401).json({ message: 'not token' });

  try {
    const user = verify(tokenAuth, `${process.env.JWT_SECRET_KEY}`) as { email: string, name: string };
    res.status(200).json({email: user.email, name: user.name});
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
