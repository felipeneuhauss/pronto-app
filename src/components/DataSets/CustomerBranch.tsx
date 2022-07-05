import { Checkbox, Select, SubTitle, CheckboxSet } from '../Form'
import { useEffect, useState } from 'react'
import { CustomerBranchMapped } from 'shared/mappers'
import Address from './Address'
import { Option } from '../Form/Select'
import { ADMIN, getProfile } from 'lib/profile'
import Contacts from './Contacts'
import { useAuth } from 'hooks/auth'

type CustomerBranchProps = {
    register: any;
    prefixFieldName?: string;
    setValue?: any;
    getValues?: any;
    watch?: any;
    customerBranch: CustomerBranchMapped;
    tariffs: Option[];
    activitySectors: Option[];
    sellers: Option[];
}

const CustomerBranch = ({ register, getValues, prefixFieldName, customerBranch, setValue, tariffs, activitySectors, sellers }: CustomerBranchProps) => {
  const { user } = useAuth({ middleware: 'auth' })
  const profile = getProfile(user)
  const [selectedSellers, setSelectedSellers] = useState(
    customerBranch.sellers?.map((seller) => seller.id) || []
  )
  useEffect(() => {
    if (selectedSellers.length) {
      setValue(`${prefixFieldName}.sellers`, sellers.filter((seller) => {
        return selectedSellers.includes(seller.value)
      }))
    }
  }, [sellers, selectedSellers])

  return <>
    <Checkbox label={'Morada fiscal'}
      id={`${prefixFieldName}.taxAddress`}
      name={`${prefixFieldName}.taxAddress`}
      value={true}
      setValue={setValue}
      register={register} checked={!!customerBranch.taxAddress} />
    <Select label={'Setor de atividade'} placeholder="Setor de atividade" required={true} name={`${prefixFieldName}.activitySectorId`} register={register} options={activitySectors} />
    <Select label={'Tarifa'} placeholder="Tarifa" required={true} name={`${prefixFieldName}.tariffId`} register={register} options={tariffs} />
    {profile === ADMIN && <div className="ml-4">
      <CheckboxSet label={'Vendedores'}
        name={`${prefixFieldName}.sellers`}
        register={register}
        items={sellers}
        selectedItems={selectedSellers}
        setSelectedItems={setSelectedSellers} />
    </div>}
    <div className="ml-4">
      <SubTitle>Endereço</SubTitle>
      <Address address={customerBranch.address}
        register={register}
        setValue={setValue}
        prefixFieldName={`${prefixFieldName}.address`}/>
    </div>
    <div className="mb-4 pl-4">
      <Contacts contacts={customerBranch.contacts}
        prefixFieldName={`${prefixFieldName}.`}
        register={register} setValue={setValue}
        getValues={getValues} />
    </div>

  </>
}

export default CustomerBranch
