import AuthCard from 'components/AuthCard';
import AuthSessionStatus from 'components/AuthSessionStatus';
import AuthValidationErrors from 'components/AuthValidationErrors';
import Button from 'components/Button';
import Input from 'components/Input';
import Label from 'components/Label';
import GuestLayout from 'components/Layouts/GuestLayout';
import { useAuth } from 'hooks/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PasswordReset = () => {
  const router = useRouter();

  const { resetPassword } = useAuth({ middleware: 'guest' });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);

  const submitForm = (event: any) => {
    event.preventDefault();

    resetPassword({
      email,
      password,
      passwordConfirmation,
      setErrors,
      setStatus,
    });
  };

  useEffect(() => {
    setEmail(router?.query?.email as string);
  }, [router.query.email]);

  return (
    <GuestLayout>
      <AuthCard
        logo={(
          <Link href="/">
            <Image src="/logo.png" width="300px" height="100px" />
          </Link>
        )}
      >

        {/* Session Status */}
        <AuthSessionStatus className="mb-4" status={status} />

        {/* Validation Errors */}
        <AuthValidationErrors className="mb-4" errors={errors} />

        <form onSubmit={submitForm}>
          {/* Email Address */}
          <div>
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              value={email}
              className="block mt-1 w-full"
              onChange={(event:any) => setEmail(event.target.value)}
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
              onChange={(event:any) => setPasswordConfirmation(event.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-end mt-4">
            <Button>Reset Password</Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  );
};

export default PasswordReset;
