import type { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import cookie from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tokenAuth } = req.cookies as { tokenAuth: string };

  if (!tokenAuth) return res.status(401).json({ message: 'not token' });

  try {
    verify(tokenAuth, `${process.env.JWT_SECRET_KEY}`);
    const serialized = cookie.serialize('tokenAuth', 'deleted', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    })
    res.setHeader('Set-Cookie', serialized);
    res.status(200).json({ message: 'Logout successfully' });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
