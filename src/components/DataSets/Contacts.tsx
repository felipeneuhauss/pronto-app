import { Input, Select, SubTitle } from '../Form'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faRemove } from '@fortawesome/free-solid-svg-icons'
import { ContactMapped } from 'shared/mappers'
import Button from '../Button'
import { useApi } from 'hooks/api'
import { Option } from '../Form/Select'

type ContactRowProps = {
    register: any;
    isFirst: boolean;
    index: number;
    removeRow: (item: number) => void;
    contactTypes: Option[];
    prefixFieldName: string | undefined;
};

const ContactRow = ({ register, index, isFirst, removeRow, contactTypes, prefixFieldName = '' }: ContactRowProps) => {
  return <div className="flex-column sm:grid gap-2 grid-cols-4">
    <Input placeholder="Telefone" type="tel" name={`${prefixFieldName}contacts.${index}.phone`} register={register} />
    <Input placeholder="E-mail" type="email" name={`${prefixFieldName}contacts.${index}.email`} register={register} />
    <Select placeholder="Tipo de e-mail" name={`${prefixFieldName}contacts.${index}.emailType`} register={register} options={contactTypes} />
    <div className="flex items-center my-4 sm:my-0">
      {!isFirst && <a className="float-right text-red-500 cursor-pointer sm:pb-2"
        onClick={() => removeRow(index)}>
        <FontAwesomeIcon icon={faRemove} /> Remover</a>}
    </div>
  </div>
}

type ContactsProps = {
    register: any;
    contacts?: ContactMapped[];
    setValue: any;
    getValues: any;
    prefixFieldName?: string;
}

const Contacts = ({ register, contacts = [], setValue, getValues, prefixFieldName = '' }: ContactsProps) => {
  const { get } = useApi()
  const [contactList, setContactList] = useState<ContactMapped[]>(contacts)
  const [contactTypes, setContactTypes] = useState([])
  useEffect(() => {
    get('/contacts/contact-types')
      .then((data) => {
        setContactTypes(data)
      })
      .catch(error => {
        if (error.response.status !== 409) throw error
      })
  }, [])

  useEffect(() => {
    if (contacts && contacts.length) {
      setContactList(contacts)
    }
  }, [contacts])

  const removeContact = (item: number) => {
    const currentContacts = getValues(`${prefixFieldName}.contacts`)
    currentContacts.splice(item, 1)
    setValue(`${prefixFieldName}.contacts`, currentContacts)
    setContactList(currentContacts)
  }
  const addContact = () => {
    const currentContacts = getValues(`${prefixFieldName}.contacts`)
    const newContacts = [...(currentContacts || []), {} as ContactMapped]
    setValue(`${prefixFieldName}.contacts`, newContacts)
    setContactList(newContacts)
  }

  return <>
    <SubTitle>Contactos</SubTitle>
    {!!contactList.length && contactList.map((item: any, key: number) => (
      <ContactRow register={register} index={key} prefixFieldName={prefixFieldName}
        isFirst={key === 0} key={key} removeRow={removeContact} contactTypes={contactTypes} />
    ))}
    {<Button variant={'dark'} type="button" className={'h-12'} onClick={addContact}><FontAwesomeIcon icon={faAdd} /></Button>}
  </>
}

export default Contacts
