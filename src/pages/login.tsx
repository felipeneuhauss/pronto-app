import AuthCard from 'components/AuthCard'
import AuthSessionStatus from 'components/AuthSessionStatus'
import AuthValidationErrors from 'components/AuthValidationErrors'
import Button from 'components/Button'
import GuestLayout from 'components/Layouts/GuestLayout'
import Input from 'components/Input'
import Label from 'components/Label'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from 'hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Login = () => {
  const router = useRouter()
  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/admin/dashboard'
  })

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (router.query && router.query.reset && router.query.reset?.length > 0 && errors.length === 0) {
      // @ts-ignore
      setStatus(atob(router.query.reset))
    } else {
      setStatus(null)
    }
  })

  const submitForm = async (event: any) => {
    event.preventDefault()
    setLoading(true)
    login({ username, password, setErrors, setStatus })
  }

  return (
    <GuestLayout>
      <AuthCard
        logo={
          <Link href="/">
            <a>
              <Image src={'/logo.png'} width="300px" height="100px" />
            </a>
          </Link>
        }>
        {/* Session Status */}
        <AuthSessionStatus className="mb-4" status={status} />

        {/* Validation Errors */}
        <AuthValidationErrors className="mb-4" errors={errors} />

        <form onSubmit={submitForm}>
          {/* Email Address */}
          <div>
            <Label htmlFor="username">E-mail ou CPF</Label>

            <Input
              id="username"
              type="text"
              value={username}
              className="block mt-1 w-full"
              onChange={(event:any) => setUsername(event.target.value)}
              required
              autoFocus
            />
          </div>

          {/* Password */}
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              value={password}
              className="block mt-1 w-full"
              onChange={(event:any) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            <Link href="/forgot-password">
              <a className="underline text-sm text-gray-600 hover:text-gray-900">
                Esqueceu sua senha?
              </a>
            </Link>

            <Button className={`ml-3 pointer ${loading ? 'disabled:bg-gray-300 hover:bg-gray-300' : ''}`} disabled={loading}>Login</Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  )
}

export default Login
