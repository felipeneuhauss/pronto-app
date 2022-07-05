import AppLayout from 'components/Layouts/AppLayout'
import Card from 'components/Card'
import { CustomerBranchEntity, CustomerEntity, Meta, SupplierCustomerEntity } from 'shared/mappers'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useEffect, useState } from 'react'
import FabButton from 'components/FabButton'
import queryString from 'query-string'
import SellerSearchForm from 'components/SellerSearchForm'
import axios from 'lib/axios'

const CustomerRow = ({ customer }: any) => {
  return (
    <a href={`/admin/customer/${customer.id}`} className={'cursor-pointer p-6 block'}>
      <div className="flex place-content-between flex-wrap">
        <div className="w-full p-4 md:w-1/2">
          <div className="text-sm font-medium text-gray-900">
            {customer.internal_code} - {customer.name}
          </div>
          <div className="text-sm py-1 text-gray-500">
            {customer.document}
          </div>
          <div className="text-sm py-1 text-gray-500">
            {customer.email}
          </div>
          <div className="text-sm py-1 text-gray-500">
            {customer.paymentConditions}
          </div>
          <div className="text-sm text-gray-500 py-1">
            {customer.customer_branches && customer.customer_branches.map((customerBranch: CustomerBranchEntity, key: number) => (<>
              {!customerBranch.tax_address && <div key={key}>
                <div><strong>Loja</strong> {customerBranch.address.postal_code} - {customerBranch.address.street}</div>
                {customerBranch.sellers.map((seller, index) => {
                  return <span key={`sellers-${customer.id}-${index}`} className="my-3 px-2 h-5 mb-2 md:w-fit text-xs leading-5 font-semibold rounded-full bg-green-300 text-green-800">
                    {seller.user?.name}
                  </span>
                })}
              </div>}
            </>
            ))}
          </div>
        </div>
        <div className="w-full p-4 flex-column md:w-1/2 text-right">
          {customer.supplier_customers && customer.supplier_customers.map((supplierCustomer: SupplierCustomerEntity, index: number) => {
            return <div key={`suppliers-${customer.id}-${index}`} className={'w-full'}>
              <span
                className="px-2 h-5 mb-3 text-xs leading-5 text-center font-semibold rounded-full bg-yellow-100 text-yellow-800">
                {supplierCustomer.supplier.name} - {supplierCustomer.code}
              </span>
            </div>
          })}
        </div>
      </div>
    </a>
  )
}

const Customers = () => {
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [searchParams, setSearchParams] = useState({})
  const [items, setItems] = useState<CustomerEntity[]>([])
  const [meta, setMeta] = useState<Meta>()
  const fetchData = async () => {
    const queryParams = queryString.stringify(searchParams)
    const res = await axios.get(`/api/customers?page=${page}&${queryParams}`)
    setPage(page + 1)
    setItems([...items.concat(res.data.data)])
    setMeta(res?.data.meta)
    setHasMore(res?.data.meta.current_page < res?.data.meta.last_page)
  }

  useEffect(() => {
    fetchData()
  }, [searchParams])

  const handleSearch = (payload: any) => {
    setItems([])
    setPage(1)
    setSearchParams(payload)
  }

  return (
    <AppLayout className="relative"
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          <span className="text-right">{meta?.total}</span> clientes
        </h2>
      }>
      <div className="py-2">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-3">
          <SellerSearchForm handleSearch={handleSearch}></SellerSearchForm>
          <InfiniteScroll
            dataLength={items.length} // This is important field to render the next data
            next={fetchData}
            hasMore={hasMore}
            loader={<h4 className={'text-center p-2'}>Carregando...</h4>}
            endMessage={
              <p className="mt-3 text-center">
                <b>Yay! Tudo carregado.</b>
              </p>
            }
          >
            {items.map((customer: CustomerEntity, key: number) => {
              return <Card key={key}>
                <CustomerRow customer={customer} key={`customer-${key}`} />
              </Card>
            })}
          </InfiniteScroll>
        </div>
      </div>
      <FabButton url={'/admin/customer/new'} />
    </AppLayout>
  )
}

export default Customers
