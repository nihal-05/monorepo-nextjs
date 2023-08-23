import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

import { dbConnect } from '@/libs/dbConnect'
import { secret } from '@/libs/helpers'
import { Admin } from '@/models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req
  const { email, password } = JSON.parse(body)

  switch (method) {
    case 'POST':
      try {
        await dbConnect()
        console.log('Connected to Db')
      } catch (error) {
        console.log('Db Error', error)
        return res.status(500).json({ message: 'Error while connecting to DB' })
      }

      try {
        const adminFromDb = await Admin.findOne({ email })

        if (adminFromDb) {
          return res.status(403).json({ message: 'Admin already exists' })
        } else {
          await Admin.create({ email, password })

          const token = jwt.sign({ email, role: 'admin' }, secret, {
            expiresIn: '1h',
          })
          return res.json({
            message: 'Admin created successfully',
            token,
            email,
          })
        }
      } catch (error) {
        console.log('Error', error)
        return res.status(500).json({ message: 'Error while creating admin' })
      }

    default:
      return res.status(400).json({
        message: `The HTTP ${req.method} method is not supported at this route.`,
      })
  }
}
