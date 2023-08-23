import { useLazyFetch } from '@/libs/hooks'
import { userState } from '@/store/atoms/user'
import { IAuthRequest } from 'interfaces'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { AuthForm } from 'ui'

const Signup = () => {
  const router = useRouter()
  const [signup, { data, loading, error }] = useLazyFetch()
  const setUser = useSetRecoilState(userState)

  const handleSubmit = async (authobj: IAuthRequest) => {
    await signup(`api/admin/signup`, {
      method: 'POST',
      body: JSON.stringify(authobj),
    })
  }

  useEffect(() => {
    if (data && !error) {
      localStorage.setItem('token', data.token)
      // @ts-ignore
      setUser({ isLoading: false, userEmail: data?.email })
      router.push('/')
    }
  }, [data])

  return (
    <div>
      <AuthForm onSubmitClick={handleSubmit} isLoading={loading} />
    </div>
  )
}

export default Signup
