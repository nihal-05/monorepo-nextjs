import { useRouter } from 'next/router'
import { useToken } from './hooks'
import { useEffect } from 'react'

export default function withAuth(Component: React.ComponentType) {
  return function ProtectedRoute({ ...props }) {
    const router = useRouter()
    const { token } = useToken()

    useEffect(() => {
      if (!token) {
        router.push('/signin')
      }
    }, [token])

    return <>{token && <Component {...props} />}</>
  }
}
