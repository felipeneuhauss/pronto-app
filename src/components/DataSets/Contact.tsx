import React from 'react';
import { Input, Select } from '../Form';
import { Option } from '../Form/Select';

type ContactProps = {
    register: any;
    prefixFieldName?: string;
    contactTypes: Option[];
}

const Contact = ({ register, prefixFieldName = 'contact', contactTypes }: ContactProps) => (
  <div className="flex flex-col md:flex-row md:gap-2 md:justify-between">
    FOO
    <Input placeholder="Telefone" type="tel" name={`${prefixFieldName}.phone`} register={register} />
    <Input placeholder="E-mail" type="email" name={`${prefixFieldName}.email`} register={register} />
    <Select placeholder="Tipo de e-mail" name={`${prefixFieldName}.emailType`} register={register} options={contactTypes} />
  </div>
);

export default Contact;
