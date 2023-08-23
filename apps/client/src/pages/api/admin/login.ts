import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

import { dbConnect } from '@/libs/dbConnect'
import { Admin } from '@/models'
import { secret } from '@/libs/helpers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req
  const { username, password } = JSON.parse(body)

  switch (method) {
    case 'POST':
      await dbConnect()
      const admin = await Admin.findOne({ username, password })
      if (admin) {
        const token = jwt.sign({ username, role: 'admin' }, secret, {
          expiresIn: '1h',
        })
        return res.json({ message: 'Logged in successfully', token, username })
      } else {
        return res.status(403).json({ message: 'Invalid username or password' })
      }

    default:
      return res.status(400).json({
        message: `The HTTP ${req.method} method is not supported at this route.`,
      })
  }
}
