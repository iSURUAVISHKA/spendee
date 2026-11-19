import { useNavigate } from 'react-router'
import { LoginForm, type LoginCredentials } from '@/modules/auth'

export const LoginPage = () => {
  const navigate = useNavigate()

  const handleLogin = (_credentials: LoginCredentials) => {
    // TODO: send the credentials to your auth API, then navigate on success
    navigate('/')
  }

  return (
    <main className="flex min-h-svh items-center justify-center p-4">
      <LoginForm onSubmit={handleLogin} />
    </main>
  )
}
