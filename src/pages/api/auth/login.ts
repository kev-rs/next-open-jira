import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  /**
   * TODO: Check if email / password are valid from db
   * ? if email exists
   * ? if password is correct
   */

  if(email !== 'kev@gmail.com' && password !== '123123123') return res.status(401).json({ message: 'Invalid email or password' });
  // create json web token
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // token valid for 30 days
    name: 'kev',
    email: 'kev@gmail.com'
  }, `${process.env.JWT_SECRET_KEY}`);

  // create cookie
  const serialized = serialize('tokenAuth', token, {
    httpOnly: true, // on Production browsers won't show the cookie ( on the console, on dev tools... )
    secure: process.env.NODE_ENV === 'production', // send by https ( SSl )
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 30, // cookie valid for 30 days
    path: '/'
  })

  res.setHeader('Set-Cookie', serialized); // set cookie

  return res.status(200).json({auth: req.body});
}
