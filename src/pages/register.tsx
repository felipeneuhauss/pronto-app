import AuthCard from 'components/AuthCard';
import AuthValidationErrors from 'components/AuthValidationErrors';
import Button from 'components/Button';
import Input from 'components/Input';
import Label from 'components/Label';
import GuestLayout from 'components/Layouts/GuestLayout';
import { useAuth } from 'hooks/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Register = () => {
  const { register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/admin/dashboard',
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState([]);

  const submitForm = (event: any) => {
    event.preventDefault();

    register({
      name, email, password, passworConfirmation: passwordConfirmation, setErrors,
    });
  };

  // @ts-ignore
  return (
    <GuestLayout>
      <AuthCard
        logo={(
          <Link href="/">
            <Image src="/logo.png" width="300px" height="100px" />
          </Link>
        )}
      >
        {/* Validation Errors */}
        <AuthValidationErrors className="mb-4" errors={errors} />

        <form onSubmit={submitForm}>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              className="block mt-1 w-full"
              onChange={(event: any) => setName(event.target.value)}
              required
              autoFocus
            />
          </div>

          {/* Email Address */}
          <div className="mt-4">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              value={email}
              className="block mt-1 w-full"
              onChange={(event: any) => setEmail(event.target.value)}
              required
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
              onChange={(event: any) => setPassword(event.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          {/* Confirm Password */}
          <div className="mt-4">
            <Label htmlFor="passwordConfirmation">
              Confirm Password
            </Label>

            <Input
              id="passwordConfirmation"
              type="password"
              value={passwordConfirmation}
              className="block mt-1 w-full"
              onChange={(event: any) => setPasswordConfirmation(event.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-end mt-4">
            <Link href="/login">
              <a className="underline text-sm text-gray-600 hover:text-gray-900">
                Already registered?
              </a>
            </Link>

            <Button className="ml-4">Register</Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  );
};

export default Register;
