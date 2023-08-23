import { AuthForm } from 'ui'
import { IAuthRequest } from 'interfaces'
import { useLazyFetch } from '@/libs/hooks'
import { useRouter } from 'next/router'
import { userState } from '@/store/atoms/user'
import { useSetRecoilState } from 'recoil'
import { useEffect } from 'react'

const SignIn = () => {
  const router = useRouter()
  const [signin, { data, loading, error }] = useLazyFetch()
  const setUser = useSetRecoilState(userState)

  const handleSubmit = async (authobj: IAuthRequest) => {
    await signin(`api/admin/login`, {
      method: 'POST',
      body: JSON.stringify(authobj),
    })
  }

  useEffect(() => {
    if (data && !error) {
      localStorage.setItem('token', data.token)
      setUser({ isLoading: false, userEmail: data?.email })
      router.push('/')
    }
  }, [data])

  return (
    <main>
      <AuthForm isLogin onSubmitClick={handleSubmit} isLoading={loading} />
    </main>
  )
}

export default SignIn
