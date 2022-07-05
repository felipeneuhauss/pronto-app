import { useRouter } from 'next/router'
import Card from 'components/Card'
import { useForm } from 'react-hook-form'
import { Input, SubTitle } from 'components/Form'
import AppLayout from 'components/Layouts/AppLayout'
import { revertMapping, SupplierEntity, SupplierMapped, supplierMapper } from 'shared/mappers'
import Address from 'components/DataSets/Address'
import { useEffect, useState } from 'react'
import { useApi } from 'hooks/api'
import { toast } from 'react-toastify'
import Contacts from 'components/DataSets/Contacts'

const Supplier = () => {
  const router = useRouter()
  const { id } = router.query
  const { put, get, post } = useApi()
  const [supplier, setSupplier] = useState<SupplierMapped>()
  const [, setErrors] = useState([])
  const [loading, setLoading] = useState(false)

  const saveSupplier = (payload: SupplierMapped) => {
    const supplierEntity: SupplierEntity = revertMapping(payload)
    if (payload.id) {
      return put<SupplierEntity>({ path: `/suppliers/${payload.id}`, payload: supplierEntity, setErrors })
    }
    return post({ path: '/suppliers', payload, setErrors })
  }
  const onSubmit = async (payload: SupplierMapped) => {
    try {
      setLoading(true)
      await saveSupplier(payload)
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

  const { register, handleSubmit, reset, setValue, getValues } = useForm<SupplierMapped>({
    defaultValues: { }
  })

  useEffect(() => {
    if (!id) {
      return
    }

    if (id === 'new') return

    get(`/suppliers/${id}`)
      .then((data) => {
        const entitySupplier = data
        const mappedSupplier = supplierMapper(entitySupplier)
        console.log('mappedSupplier', mappedSupplier)
        setSupplier(mappedSupplier)
        reset(mappedSupplier)
      })
      .catch(error => {
        if (error.response.status !== 409) throw error
      })
  }, [id])

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Representada
        </h2>
      }>
      <Card>
        <div className={'p-5'}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SubTitle>Dados da representada</SubTitle>
            <div className="mb-4">
              <Input label={'Nome'} name={'name'} register={register} required={true} />
              <Input label={'Documento'} name={'document'} register={register} required={true} />
              <Input label={'Website'} type={'url'} name={'website'} register={register} required={true} />
            </div>
            <div className="mb-4">
              <SubTitle>Endereço</SubTitle>
              <Address address={supplier?.address} register={register} setValue={setValue} />
            </div>
            <div className="mb-4">
              <Contacts contacts={supplier?.contacts} register={register} setValue={setValue} getValues={getValues} />
            </div>
            <div className="flex items-center py-4 gap-2 justify-between border-t-2 border-gray-200 mt-4">
              <a href="/admin/suppliers" className="text-blue-700 font-weight-bold">
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

export default Supplier
