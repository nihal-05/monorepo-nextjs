import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { useSetRecoilState, useRecoilValue } from 'recoil'

import { isUserLoading } from '../store/selectors/isUserLoading'
import { userState } from '@/store/atoms/user'
import { useToken } from '@/libs/hooks'

function Appbar() {
  const userLoading = useRecoilValue(isUserLoading)
  const { token } = useToken()
  const setUser = useSetRecoilState(userState)

  if (userLoading) {
    return <></>
  }

  if (token) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 4,
          zIndex: 1,
        }}
      >
        <div style={{ marginLeft: 10, cursor: 'pointer' }}>
          <Typography
            component={Link}
            href={'/'}
            variant={'h6'}
            sx={{
              textDecoration: 'none',
            }}
          >
            Coursera
          </Typography>
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: 10, display: 'flex' }}>
            <div style={{ marginRight: 10 }}>
              <Button component={Link} href={'/courses/add'}>
                Add course
              </Button>
            </div>

            <div style={{ marginRight: 10 }}>
              <Button component={Link} href={'/courses'}>
                Courses
              </Button>
            </div>

            <Button
              variant={'contained'}
              onClick={() => {
                localStorage.clear()
                setUser({
                  isLoading: false,
                  userEmail: null,
                })

                window.location.href = '/'
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 4,
          zIndex: 1,
        }}
      >
        <div style={{ marginLeft: 10, cursor: 'pointer' }}>
          <Typography component={Link} href={'/'} variant={'h6'}>
            Coursera
          </Typography>
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: 10 }}>
            <Button variant={'contained'} component={Link} href={'/signup'}>
              Signup
            </Button>
          </div>
          <div>
            <Button component={Link} href={'/signin'} variant={'contained'}>
              Signin
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Appbar
