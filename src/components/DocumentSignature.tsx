import Input from 'components/Input';
import React, { useState } from 'react';
import Button from './Button';

type DocumentSignatureProps = {
    pdfUrl: string;
    showConfirmationCodeField: boolean;
    getVerificationCode: () => void
    assign: ({ confirmationCode }: {confirmationCode: string}) => void
}

const DocumentSignature = ({
  pdfUrl, getVerificationCode, assign, showConfirmationCodeField,
}: DocumentSignatureProps) => {
  const [confirmationCode, setConfirmationCode] = useState('');
  return (
    <>
      <div className="w-full">
        <div className="flex flex-col gap-2 mb-10">
          <Button variant="dark" type="button" className="h-12 md:w-1/2" onClick={() => getVerificationCode()}>
            Receber código por e-mail
          </Button>
        </div>
        {showConfirmationCodeField
        && (
        <div className="flex flex-col gap-2 mb-6">
          <Input
            maxlength={6}
            type="number"
            value={confirmationCode}
            className="block mt-1 md:w-1/2"
            onChange={(event:any) => setConfirmationCode(event.target.value)}
            required
            autoFocus
          />
          <Button
            variant="dark"
            type="button"
            className="h-12 md:w-1/2"
            onClick={() => assign({ confirmationCode })}
          >
            Assinar
          </Button>
        </div>
        )}
      </div>
      <embed src={pdfUrl} className="w-full" height="700px" />
    </>
  );
};

export default DocumentSignature;
