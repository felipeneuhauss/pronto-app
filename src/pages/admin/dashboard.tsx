import AppLayout from 'components/Layouts/AppLayout';
import FabButton from 'components/FabButton';
import { useAuth } from 'hooks/auth';
import DocumentSignature from 'components/DocumentSignature';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { TOAST_DEFAULT_CONFIG } from 'shared/consts';
import { useApi } from 'hooks/api';

const Dashboard = () => {
  const { user } = useAuth({ middleware: 'auth' });
  const { post } = useApi();
  const [, setErrors] = useState([]);
  const [showConfirmationCodeField, setShowConfirmationCodeField] = useState(false);

  const getVerificationCode = () => {
    post(
      { path: '/users/lpgd-verification-code-request', setErrors },
    ).then(() => {
      toast.success(
        'Enviamos uma mensagem par seu e-mail com código de confirmação de 6 digitos.',
        TOAST_DEFAULT_CONFIG,
      );
      setShowConfirmationCodeField(true);
    }, (err) => {
      console.error(err);
      toast.error(
        'Não foi possivel enviar o e-mail com o código de confirmação. '
          + 'Tente novamente mais tarde ou entre em contato pelo e-mail financeiro@mappab.com.br',
        TOAST_DEFAULT_CONFIG,
      );
    });
  };
  const assign = ({ confirmationCode }: { confirmationCode: string }) => {
    post({
      path: '/users/lgpd-accepted',
      payload: { verification_code: confirmationCode },
      setErrors,
    }).then(() => {
      toast.success('LGPD assinada com sucesso!.', TOAST_DEFAULT_CONFIG);
    }, () => {
      toast.error('Código informado inválido', TOAST_DEFAULT_CONFIG);
    });
  };

  return (
    <AppLayout
      className="relative"
      header={(
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard
        </h2>
      )}
    >
      <div className="p-4">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-3">
          {user && !user.lgpd_verified && (
          <>
            <h2 className="font-semibold">Lei de proteção de dados</h2>
            <p className="py-4">
              Para seguirmos as regras de utilização dos recursos e serviços da Pronto Saúde,
              é importante que o documento abaixo seja assinado digitalmente.
            </p>
            <DocumentSignature
              pdfUrl={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${user.id}/lgpd/pdf`}
              getVerificationCode={getVerificationCode}
              assign={assign}
              showConfirmationCodeField={showConfirmationCodeField}
            />
          </>
          )}
        </div>
      </div>
      <FabButton url="/admin/sale/new" />
    </AppLayout>
  );
};

export default Dashboard;
