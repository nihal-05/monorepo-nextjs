import { NextApiRequest, NextApiResponse } from 'next'

import { Course } from '@/models'
import { authenticateJwt } from '@/libs/helpers'
import { dbConnect } from '@/libs/dbConnect'

export default authenticateJwt(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body, query } = req

    dbConnect()

    switch (method) {
      case 'PUT':
        const course = await Course.create({ ...body })
        return res.json({
          message: 'Course created successfully',
          courseId: course.id,
        })
      case 'GET':
        const courses = await Course.find({ _id: query?.courseId })
        return res.status(200).json({ courses })

      default:
        return res.status(400).json({
          message: `The HTTP ${req.method} method is not supported at this route.`,
        })
    }
  }
)
