import AppLayout from 'components/Layouts/AppLayout'
import useSWR from 'swr'
import axios from 'lib/axios'
import Card from 'components/Card'
import { RoleEntity, SellerEntity } from 'shared/mappers'
import FabButton from 'components/FabButton'

const SellerRow = ({ seller }: any) => {
  return (
    <a href={`/admin/seller/${seller.id}`} className={'cursor-pointer'}>
      <div className="flex place-content-between flex-wrap">
        <div className="w-auto p-4">
          <div className="text-sm font-medium text-gray-900">
            {seller.user.name}
          </div>
          <div className="text-sm py-2 text-gray-500">
            {seller.user.email}
          </div>
          <div className="w-auto text-sm text-gray-500">
            {`${seller.address.street}, ${seller.address.number} -
                      ${seller.address.complement || ' '} - ${
      seller.address.postal_code || ' '
    } -
                      ${seller.address.parish || ' '} ${
      seller.address.county || ' '
    }`}
          </div>
        </div>
        <div className="w-auto p-4">
          {seller.user.roles?.map((role: RoleEntity, key: number) => {
            return (<span key={key}
              className="px-2 items-start text-xs leading-5 font-semibold rounded-full bg bg-green-100 text-green-800">
              {role.name}
            </span>)
          })}
          {seller.deleted_at && <span
            className="px-2 items-start text-xs leading-5 font-semibold rounded-full bg bg-red-100 text-green-800">
              Removido em {seller.deleted_at}
          </span>}
        </div>
      </div>
    </a>
  )
}

const SellerCard = ({ seller } : {seller: SellerEntity}) => {
  return (<Card>
    <SellerRow seller={seller} />
  </Card>)
}

const Sellers = () => {
  const { data: sellers } = useSWR('/api/sellers', () =>
    axios
      .get('/api/sellers')
      .then(res => res.data.data)
      .catch(error => {
        if (error.response.status !== 409) throw error
      })
  )

  return (
    <AppLayout className="relative"
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Utilizadores
        </h2>
      }>
      <div className="py-2">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {!!sellers &&
                        sellers.map((seller: SellerEntity, key: number) => {
                          return <SellerCard seller={seller} key={key} />
                        })}
        </div>
      </div>
      <FabButton url={'/admin/seller/new'} />
    </AppLayout>
  )
}

export default Sellers
