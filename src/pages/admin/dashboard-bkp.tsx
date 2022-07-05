/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable camelcase */
import AppLayout from 'components/Layouts/AppLayout';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  Meta, SaleEntity, SaleMapped, saleMapper,
} from 'shared/mappers';
import FabButton from 'components/FabButton';
import { useEffect, useRef, useState } from 'react';
import queryString from 'query-string';
import axios from 'lib/axios';
import Card from 'components/Card';
import SaleSearchForm from 'components/SaleSearchForm';
import { money } from 'lib/monetary';
import { formatDate } from 'lib/datetime';
import { calculateDaysDiff, getBorderStatusColor, getDelayColor } from 'lib/helpers';
import { isCommercialAssistant } from 'lib/profile';
import { useAuth } from 'hooks/auth';
import { AxiosResponse } from 'axios';

const SaleRow = ({ sale }: {sale: SaleMapped}) => {
  const statusBorderColor = getBorderStatusColor(sale);
  return (
    <a
      href={`/admin/sale/${sale.id}`}
      className={`cursor-pointer border-l-2 border-l-solid block ${statusBorderColor}`}
    >
      <div className="flex flex-col">
        <div className="w-full flex justify-between flex-wrap">
          <div className="text-sm font-medium text-gray-900 flex justify-between w-full">
            <div className="p-4 w-full md:w-1/2 text-left">
              <strong>{sale.invoice}</strong>
            </div>
            <div className="p-4 w-full md:w-1/2 text-right">
              <span className={
                `text-xs font-bold inline-block py-1 px-2 uppercase rounded-full uppercase
                  last:mr-0 mr-1 ${sale.invoiceType === 'allowance'
                  ? 'text-blue-800 bg-blue-200'
                  : 'text-green-800 bg-green-200'}`
              }
              >
                {sale.invoiceType === 'allowance' ? 'Crédito' : 'Venda' }
              </span>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between flex-wrap">
          <div className="p-4 flex-col md:w-1/2">
            <div>
              <div>
                <span className="text-sm font-bold text-gray-800">Cliente </span>
              </div>
              <span className="text-sm font-medium text-gray-900">{sale.customerBranch?.customerName || '-'}</span>
            </div>
            <div>
              <div>
                <span className="text-sm font-bold text-gray-800">Localidade </span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {sale.customerBranch?.address?.street}
                {' '}
                -
                {' '}
                {sale.customerBranch?.address?.postalCode}
              </span>
            </div>
          </div>
          <div className="p-4 flex-col md:w-1/2">
            <div>
              <div>
                <span className="text-sm font-bold text-gray-800">Vendedor </span>
              </div>
              <span className="text-sm font-medium text-gray-900">{sale.seller.user.name}</span>
            </div>
            <div>
              <div>
                <span className="text-sm font-bold text-gray-800">Representada</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {sale.supplier.name}
                {' '}
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 p-4 gap-4 text-sm bg-gray-100 text-gray-700 sm:grid-cols-3">
          <div>
            <div className="flex-col">
              <span className="text-xs font-bold inline-block w-full">Data da venda</span>
              {' '}
              {formatDate(sale.soldAt)}
            </div>
          </div>
          <div>
            <div className="flex-col">
              <span className="text-xs font-bold inline-block w-full">Data da fatura</span>
              {' '}
              {formatDate(sale.invoiceDate)}
            </div>
          </div>
          <div>
            <div className="flex-col">
              <span className="text-xs font-bold inline-block w-full">Data de vencimento</span>
              {' '}
              {formatDate(sale.expiresIn)}
            </div>
          </div>
          <div>
            <div className="flex-col">
              <span className="text-xs font-bold inline-block w-full text-left">Pago em</span>
              {' '}
              {formatDate(sale.paidAt) || '-'}
            </div>
          </div>
          <div>
            <div className="flex-col">
              <span className="text-xs font-bold inline-block w-full">Valor da venda</span>
              {' '}
              €
              {sale.saleValue || ''}
            </div>
          </div>
          <div>
            <div className="flex-col">
              <span className="text-xs font-bold inline-block w-full">Valor faturado</span>
              {' '}
              €
              {sale.invoicedAmount || ''}
            </div>
          </div>
          <div>
            <div className="flex-col">
              <span className="text-xs font-bold inline-block w-full text-left">Dias entre a fatura e o pagamento</span>
              {(sale.expiresIn && calculateDaysDiff(sale.paidAt || new Date(), sale.invoiceDate)) || '-'}
            </div>
          </div>
          <div>
            <div className={`flex-col ${getDelayColor(sale)}`}>
              <span className="text-xs font-bold inline-block w-full text-left">Dias entre o vencimento e o pagamento</span>
              {((sale.expiresIn && sale.paidAt) && calculateDaysDiff(sale.paidAt || new Date(), sale.expiresIn)) || '-'}
            </div>
          </div>
          <div>
            <div className={`flex-col ${getDelayColor(sale)}`}>
              <span className="text-xs font-bold inline-block w-full text-left">Dias entre a venda e a fatura</span>
              {(sale.invoiceDate && calculateDaysDiff(sale.invoiceDate, sale.soldAt)) || '-'}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

const SaleCard = ({ sale } : {sale: SaleMapped}) => (
  <Card>
    <SaleRow sale={sale} />
  </Card>
);

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [searchParams, setSearchParams] = useState({ print: false });
  const [items, setItems] = useState<SaleMapped[]>([]);
  const [totalSold, setTotalSold] = useState<string>();
  const [totalInvoiced, setTotalInvoiced] = useState<string>();
  const [totalPending, setTotalPending] = useState<string>();
  const [totalCommission, setTotalCommission] = useState<string>();
  const [meta, setMeta] = useState<Meta>();
  const containerResultRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth({ middleware: 'auth' });

  const scrollBarAfterFiltering = (): void => {
    if (containerResultRef) {
      containerResultRef.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const handleResultPagination = async (res: AxiosResponse<any>, queryParams: string) => {
    setPage(page + 1);
    setItems([...items, ...(res.data.data).map((sale: SaleEntity) => saleMapper(sale))]);
    setMeta(res?.data.meta);
    setHasMore(res?.data.meta.current_page < res?.data.meta.last_page);
    const totalizersData = await axios.get(`/api/sales/totalizers?page=${page}&${queryParams}`);
    const {
      total_sold,
      total_invoiced,
      total_pending,
      total_commission,
    } = totalizersData.data;
    setTotalSold(money(total_sold));
    setTotalInvoiced(money(total_invoiced));
    setTotalPending(money(total_pending));
    setTotalCommission(money(total_commission));
    scrollBarAfterFiltering();
  };

  const handleResultDownload = (response: any) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${(new Date()).getTime()}.csv`); // or any other extension
    document.body.appendChild(link);
    link.click();
  };

  const fetchData = async () => {
    const queryParams = queryString.stringify(searchParams);
    const url = `/api/sales?${queryParams}${!searchParams.print ? `&page=${page}` : ''}`;
    const res = await axios.get(url);
    if (!searchParams?.print) {
      return handleResultPagination(res, queryParams);
    }
    return handleResultDownload(res);
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const handleSearch = (payload: any) => {
    setItems([]);
    setPage(1);
    setSearchParams(payload);
  };

  const downloadReport = (e: any) => {
    e.preventDefault();
    setSearchParams({ ...searchParams, print: true });
  };

  return (
    <AppLayout
      className="relative"
      header={(
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          <span className="text-right">{meta?.total}</span>
          {' '}
          vendas
        </h2>
      )}
    >
      <div className="py-2">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-3">
          <SaleSearchForm handleSearch={handleSearch} />
          {!isCommercialAssistant(user) && (
          <div className="flex flex-wrap sm:flex-nowrap justify-between mt-4" ref={containerResultRef}>
            <Card className="w-full sm:w-1/4 p-4 border-blue-400 my-2">
              <span className="relative text-gray-500">Valor vendido</span>
              <div className="text-extrabold text-2xl flex flex-row justify-between">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 fill-gray-500 mt-2" fill="grey" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="mt-2">{totalSold}</span>
              </div>
            </Card>
            <Card className="w-full sm:w-1/4 p-4 border-green-400 my-2">
              <span className="relative text-gray-500">Valor faturado</span>
              <div className="text-extrabold text-2xl flex flex-row justify-between">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 fill-gray-500 mt-3" viewBox="0 0 20 20" fill="grey">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="mt-2">{totalInvoiced}</span>
              </div>
            </Card>
            <Card className="w-full sm:w-1/4 p-4 border-yellow-400 my-2">
              <a className="cursor-pointer" onClick={() => handleSearch({ status: 'not_paid' })}>
                <span className="relative text-gray-500">Faturas pendentes</span>
                <div className="text-extrabold text-2xl flex flex-row justify-between">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 fill-gray-500 mt-3" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="mt-2">{totalPending}</span>
                </div>
              </a>
            </Card>
            <Card className="w-full sm:w-1/4 p-4 border-green-400 my-2">
              <a className="cursor-pointer" onClick={() => handleSearch({ status: 'paid' })}>
                <span className="relative text-gray-500">Comissão 5%</span>
                <div className="text-extrabold text-2xl flex flex-row justify-between">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 fill-gray-500 mt-3" viewBox="0 0 20 20" fill="grey">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="mt-2">{totalCommission}</span>
                </div>
              </a>
            </Card>
          </div>
          )}
          <div className="relative pt-6">
            <a onClick={downloadReport}>
              <div className="absolute right-4 top-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
              </div>
            </a>
            <InfiniteScroll
              dataLength={items.length} // This is important field to render the next data
              next={fetchData}
              hasMore={hasMore}
              loader={<h4 className="text-center p-2">Carregando...</h4>}
              endMessage={(
                <p className="mt-3 text-center">
                  <b>Yay! Tudo carregado.</b>
                </p>
              )}
            >
              {items.map((sale: SaleMapped, key: number) => <SaleCard sale={sale} key={key} />)}
            </InfiniteScroll>
          </div>
        </div>
      </div>
      <FabButton url="/admin/sale/new" />
    </AppLayout>
  );
};

export default Dashboard;
