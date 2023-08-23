import { Button, Card, TextField, Typography } from '@mui/material'
import { useState } from 'react'

import { IAuthRequest } from 'interfaces'

interface AuthFormProps {
  isLogin?: boolean
  isLoading?: boolean
  onSubmitClick: (authObj: IAuthRequest) => void
}

export const AuthForm = ({
  isLogin,
  onSubmitClick,
  isLoading,
}: AuthFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const sectionTitle = isLogin ? 'Sign in' : 'Sign up'

  return (
    <section>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography variant={'h6'}>
          Welcome to Admin. {sectionTitle} below
        </Typography>
      </div>
      <section style={{ display: 'flex', justifyContent: 'center' }}>
        <form
          onSubmit={e => {
            e.preventDefault()
            onSubmitClick({ email, password })
          }}
        >
          <Card variant='outlined' sx={{ width: 400, padding: 20 }}>
            <TextField
              onChange={evant11 => {
                let elemt = evant11.target
                setEmail(elemt.value)
              }}
              fullWidth={true}
              label='Email'
              variant='outlined'
            />
            <br />
            <br />
            <TextField
              onChange={e => {
                setPassword(e.target.value)
              }}
              fullWidth={true}
              label='Password'
              variant='outlined'
              type={'password'}
            />
            <br />
            <br />

            <Button size={'large'} type='submit' variant='contained'>
              {isLoading ? 'Loading..' : sectionTitle}
            </Button>
          </Card>
        </form>
      </section>
    </section>
  )
}
