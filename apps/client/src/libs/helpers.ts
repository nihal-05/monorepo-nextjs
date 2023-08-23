import { NextApiRequest, NextApiResponse } from 'next'
import jwt, { TokenExpiredError } from 'jsonwebtoken'

export const secret = process.env.JWT_SECRET || ''

export const authenticateJwt =
  (handler: any) => (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization

    console.log('authHeader', authHeader)
    if (authHeader) {
      const token = authHeader.split(' ')[1]
      jwt.verify(token, secret, (err: any, user: any) => {
        if (err) {
          console.log('TEST', err instanceof TokenExpiredError)

          if (err instanceof TokenExpiredError)
            return res.status(403).json({ message: 'JWT expired' })

          return res.status(403).json({ message: 'Forbidden' })
        }

        // @ts-ignore
        req.user = user
        handler(req, res)
      })
    } else {
      return res.status(401).json({ message: 'Forbidden' })
    }
  }
