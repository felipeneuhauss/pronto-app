import { useApi } from 'hooks/api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { TOAST_DEFAULT_CONFIG } from 'shared/consts';
import Button from './Button';
import Input from './Input';
import Label from './Label';

const WeakPassword = () => {
  const { post, get } = useApi();
  const [, setErrors] = useState([]);
  const [hasWeakPassword, setHasWeakPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const checkPasswordWeakness = () => {
    get('/users/has-insecure-password').then(({ secure }) => {
      setHasWeakPassword(!secure);
    }, (err) => {
      console.error(err);
    });
  };

  useEffect(() => {
    checkPasswordWeakness();
  }, []);

  const submitForm = (event: any) => {
    event.preventDefault();
    post({
      path: '/users/password-update',
      payload: { password_confirmation: passwordConfirmation, password },
      setErrors,
    }).then(() => {
      toast.success('Senha atualizada com sucesso!.', TOAST_DEFAULT_CONFIG);
      checkPasswordWeakness();
    }, () => {
      toast.error('Não foi possivel atualizar sua senha. Verifique se a senha e a confirmação estão corretas.', TOAST_DEFAULT_CONFIG);
    });
  };
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-3">
      {hasWeakPassword && (
      <form onSubmit={submitForm}>
        <p>
          Notamos que sua senha precisa ser atualizada para ser mais segura.
          Por favor, informe uma nova senha.
        </p>
        <div className="mt-4">
          <Label htmlFor="password">Nova senha</Label>

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
            Confirme sua senha
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
          <Button className="ml-4">Atualizar senha</Button>
        </div>
      </form>
      )}
    </div>
  );
};

export default WeakPassword;
