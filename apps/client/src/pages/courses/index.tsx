import { Button, Card, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { ICourse } from 'interfaces'
import { useFetch, useToken } from '@/libs/hooks'
import { Loading } from 'ui'
import withAuth from '@/libs/hocs'

function Courses() {
  const { token } = useToken()

  const { data, loading } = useFetch('/api/admin/courses', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (loading) return <Loading />

  if (!data?.courses.length) return <h1>No data</h1>

  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      {data?.courses?.map((course: ICourse) => {
        return <Course course={course} key={course._id} />
      })}
    </div>
  )
}

export function Course({ course }: { course: ICourse }) {
  const router = useRouter()
  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20,
      }}
    >
      <Typography textAlign={'center'} variant='h5'>
        {course.title}
      </Typography>
      <Typography textAlign={'center'} variant='subtitle1'>
        {course.description}
      </Typography>
      <Image
        src={course.imageLink}
        width={300}
        height={300}
        alt='course image'
      />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <Button
          variant='contained'
          size='large'
          onClick={() => {
            router.push('/courses/' + course._id)
          }}
        >
          Edit
        </Button>
      </div>
    </Card>
  )
}

export default withAuth(Courses)
