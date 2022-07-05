import AuthCard from 'components/AuthCard'
import AuthSessionStatus from 'components/AuthSessionStatus'
import AuthValidationErrors from 'components/AuthValidationErrors'
import Button from 'components/Button'
import GuestLayout from 'components/Layouts/GuestLayout'
import Input from 'components/Input'
import Label from 'components/Label'
import Link from 'next/link'
import { useAuth } from 'hooks/auth'
import { useState } from 'react'
import Image from 'next/image'

const ForgotPassword = () => {
  const { forgotPassword } = useAuth({ middleware: 'guest' })

  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  const submitForm = (event: any) => {
    event.preventDefault()
    forgotPassword({ email, setErrors, setStatus })
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

        <div className="mb-4 text-sm text-gray-600">
            Você esqueceu sua senha? Não tem problema. Apenas deixe-nos saber seu e-mail de acesso que enviaremos
            um link para você redefinir sua senha.
        </div>

        {/* Session Status */}
        <AuthSessionStatus className="mb-4" status={status} />

        {/* Validation Errors */}
        <AuthValidationErrors className="mb-4" errors={errors} />

        <form onSubmit={submitForm}>
          {/* Email Address */}
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={email}
              className="block mt-1 w-full"
              onChange={(event: any) => setEmail(event.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="flex items-center justify-between mt-4 gap-2">
            <Link href="/login">
              <a className="underline text-sm text-gray-600 hover:text-gray-900">
                      Voltar para o login
              </a>
            </Link>
            <Button>Enviar e-mail de recuperação</Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  )
}

export default ForgotPassword
