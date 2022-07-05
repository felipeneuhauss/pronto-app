import { useRouter } from 'next/router'
import Card from 'components/Card'
import { useForm } from 'react-hook-form'
import { Input, SubTitle } from 'components/Form'
import AppLayout from 'components/Layouts/AppLayout'
import {
  ActivitySectorEntity,
  CustomerBranchMapped,
  CustomerEntity,
  CustomerMapped,
  customerMapper,
  revertMapping,
  SellerEntity,
  SupplierCustomerMapped,
  SupplierEntity,
  SupplierMapped,
  supplierMapper,
  TariffEntity
} from 'shared/mappers'
import { useEffect, useState } from 'react'
import { useApi } from 'hooks/api'
import { toast } from 'react-toastify'
import { Option } from 'components/Form/Select'
import CustomerBranch from 'components/DataSets/CustomerBranch'
import Button from 'components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faRemove } from '@fortawesome/free-solid-svg-icons'
import { ADMIN, getProfile } from 'lib/profile'
import { useAuth } from 'hooks/auth'

type CustomerBranchNodeProps = {
    index: number;
    removeCustomerBranch: (identifier: number) => void;
    customerBranch: CustomerBranchMapped;
    setValue: any;
    getValues: any;
    tariffs: Option[];
    sellers: Option[];
    activitySectors: Option[];
    register: any;
}
const ContactBranchNode = ({
  index,
  removeCustomerBranch,
  customerBranch,
  setValue,
  getValues,
  tariffs,
  activitySectors,
  sellers,
  register
}: CustomerBranchNodeProps) => {
  return <>
    <SubTitle>Loja {index + 1}
      {!!index && <a className="float-right text-red-500 cursor-pointer"
        onClick={() => removeCustomerBranch(index)}><FontAwesomeIcon
          icon={faRemove} /> Remover loja</a>
      }
    </SubTitle>
    <CustomerBranch
      tariffs={tariffs}
      activitySectors={activitySectors}
      sellers={sellers}
      customerBranch={customerBranch}
      getValues={getValues}
      prefixFieldName={`customerBranches.${index}`}
      setValue={setValue} register={register} />
  </>
}

const SupplierCode = ({
  supplier,
  register,
  index
}: { supplier: SupplierMapped, register: any, index: number; }) => {
  return <>
    <div key={supplier.id}
      className="grid grid-cols-2 gap-2 align-center items-center content-end">
      <div>
        {supplier.name}
      </div>
      <div>
        <Input label={'Código'} name={`supplierCustomers[${index}].code`}
          register={register}/>
      </div>
    </div>
  </>
}

const Customer = () => {
  const { user } = useAuth({ middleware: 'auth' })
  const { register, handleSubmit, reset, setValue, getValues } = useForm<CustomerMapped>({
    defaultValues: { }
  })
  const router = useRouter()
  const profile = getProfile(user)
  const { id } = router.query
  const { put, get, post } = useApi()
  const [customer, setCustomer] = useState<CustomerMapped>()
  const [customerBranches, setCustomerBranches] = useState<CustomerBranchMapped[]>([])
  const [sellers, setSellers] = useState<Option[]>([])
  const [tariffs, setTariffs] = useState<Option[]>([])
  const [activitySectors, setActivitySectors] = useState<Option[]>([])
  const [suppliers, setSuppliers] = useState<SupplierMapped[]>([])
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const saveCustomer = (payload: CustomerMapped) => {
    const customerEntity: CustomerEntity = revertMapping(payload)
    if (payload.id) {
      return put<CustomerEntity>({ path: `/customers/${payload.id}`, payload: customerEntity, setErrors })
    }
    return post({ path: '/customers', payload, setErrors })
  }

  const onSubmit = async (payload: CustomerMapped) => {
    try {
      setLoading(true)
      const { data } = await saveCustomer(payload)
      setCustomer(data)
      setValue('id', data.id)
      setLoading(false)
      toast.success('Dados salvos com sucesso', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined
      })
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!errors.length) {
      return
    }
    for (const error of errors) {
      toast.error(error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined
      })
    }
  }, [errors])

  useEffect(() => {
    if (!id) {
      return
    }

    if (id === 'new') return

    get(`/customers/${id}`)
      .then((data) => {
        const mappedCustomer = customerMapper(data) || {} as CustomerMapped
        setCustomer(mappedCustomer)
        setCustomerBranches(mappedCustomer?.customerBranches)
        reset(mappedCustomer)
      })
      .catch(error => {
        if (error.response.status !== 409) throw error
      })
  }, [id])

  useEffect(() => {
    get('/customers/tariffs')
      .then((data) => {
        setTariffs(data.map((tariff: TariffEntity) => {
          return {
            value: tariff.id,
            label: tariff.name
          }
        }))
      })
      .catch(error => {
        if (error.response.status !== 409) throw error
      })
    get('/customers/activity-sectors')
      .then((data) => {
        setActivitySectors(data.map(({ id, name } : ActivitySectorEntity) => {
          return {
            value: id,
            label: name
          }
        }))
      })
      .catch(error => {
        if (error.response.status !== 409) throw error
      })
    get('/suppliers')
      .then((data) => {
        setSuppliers(data.map((item: SupplierEntity) => {
          return supplierMapper(item)
        }))
      })
      .catch(error => {
        if (error.response.status !== 409) throw error
      })
    get('/sellers')
      .then((data) => {
        setSellers(data.map((item: SellerEntity) => {
          return { value: item.id, label: item.user.name }
        }))
      })
      .catch(error => {
        if (error.response.status !== 409) throw error
      })
  }, [])

  useEffect(() => {
    if (customer && suppliers) {
      customer.supplierCustomers = suppliers.map((supplier) => {
        const supplierCustomer = customer.supplierCustomers?.find((item) => {
          return item.supplierId === supplier.id
        })
        if (supplierCustomer) {
          return supplierCustomer
        }
        const newSupplierCustomer = {} as SupplierCustomerMapped
        newSupplierCustomer.supplierId = supplier.id
        newSupplierCustomer.code = null
        newSupplierCustomer.customerId = customer.id || null
        return newSupplierCustomer
      })
      setCustomer(customer)
      setValue('supplierCustomers', customer.supplierCustomers)
    }
  }, [customer, suppliers])

  const removeCustomerBranch = (item: number) => {
    const currentCustomerBranches = getValues('customerBranches') || []
    currentCustomerBranches.splice(item, 1)
    setValue('customerBranches', currentCustomerBranches)
    setCustomerBranches(currentCustomerBranches)
  }
  const addCustomerBranch = () => {
    const currentCustomerBranches = getValues('customerBranches')
    const newCustomerBranches = [...(currentCustomerBranches || []), { } as CustomerBranchMapped]
    setValue('customerBranches', newCustomerBranches)
    setCustomerBranches(newCustomerBranches)
  }

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Cliente
        </h2>
      }>
      <Card>
        <div className={'p-5'}>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <SubTitle>Dados do cliente</SubTitle>
            <div className="mb-4">
              <Input label={'Nome'} name={'name'} register={register} required={true} />
              <Input label={'Documento'} name={'document'} register={register} required={true} />
              <Input label={'E-mail'} name={'email'} register={register} type="email" />
              {profile === ADMIN &&
                  <div className={'mt-3'}>
                    <SubTitle>Representada e seus códigos</SubTitle>
                    {suppliers && suppliers.map((supplier, key) => {
                      return <SupplierCode key={key} supplier={supplier} index={key} register={register} />
                    })}
                  </div>
              }
              <div className={'my-3'}>
                {!!customerBranches?.length && customerBranches.map((item, key) => {
                  return <ContactBranchNode key={key}
                    index={key}
                    tariffs={tariffs}
                    activitySectors={activitySectors}
                    sellers={sellers}
                    removeCustomerBranch={removeCustomerBranch}
                    customerBranch={item}
                    setValue={setValue}
                    getValues={getValues}
                    register={register} />
                })}
                <div className={'mt-4'}>
                  {<Button variant={'dark'} type="button" className={'h-12'} onClick={addCustomerBranch}><FontAwesomeIcon icon={faAdd} /> Nova loja</Button>}
                </div>
              </div>
              <Input label={'Condições de pagameto'} name={'paymentConditions'} register={register} />
            </div>
            <div className="flex items-center py-4 gap-2 justify-between border-t-2 border-gray-200 mt-4">
              <a href="/admin/customers" className="text-blue-700 font-weight-bold">
                  Voltar
              </a>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={loading}>
                    Salvar
              </button>
            </div>
          </form>
        </div>
      </Card>
    </AppLayout>
  )
}

export default Customer
