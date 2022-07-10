/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable camelcase */
import AppLayout from 'components/Layouts/AppLayout';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  BeneficiaryEntity, BeneficiaryMapped, beneficiaryMapper, Meta,
} from 'shared/mappers';
import FabButton from 'components/FabButton';
import { useEffect, useRef, useState } from 'react';
import queryString from 'query-string';
import axios from 'lib/axios';
import Card from 'components/Card';
import BeneficiarySearchForm from 'components/BeneficiarySearchForm';
import { formatDate } from 'lib/datetime';
import { AxiosResponse } from 'axios';

const BeneficiaryRow = ({ beneficiary }: { beneficiary: BeneficiaryMapped }) => (
  <a
    href={`/admin/beneficiary/${beneficiary.id}`}
    className="cursor-pointer border-l-2 border-l-solid block"
  >
    <div className="flex flex-col">
      <div className="w-full flex justify-between flex-wrap">
        <div className="text-sm font-medium text-gray-900 flex justify-between w-full">
          <div className="p-4 w-full md:w-1/2 text-left">
            <strong>{beneficiary.beneficiaryNumber}</strong>
          </div>
          <div className="p-4 w-full md:w-1/2 text-right">
            <span className={
                  `text-xs font-bold inline-block py-1 px-2 uppercase rounded-full uppercase
                  last:mr-0 mr-1 'text-${beneficiary.statusColor}-800 bg-${beneficiary.statusColor}-200`
              }
            >
              {beneficiary.statusName}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between flex-wrap">
        <div className="p-4 flex-col md:w-1/2">
          <div>
            <div>
              <span className="text-sm font-bold text-gray-800">Beneficiário </span>
            </div>
            <span
              className="text-sm font-medium text-gray-900"
            >
              {beneficiary.personalDetail.name}
            </span>
          </div>
          <div>
            <div>
              <span className="text-sm font-bold text-gray-800">Documentos CPF/RG</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {beneficiary.personalDetail?.cpf}
              /
              {beneficiary.personalDetail?.rg}
            </span>
          </div>
        </div>
        <div className="p-4 flex-col md:w-1/2">
          <div>
            <div>
              <span className="text-sm font-bold text-gray-800">Endereço </span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {beneficiary.personalDetail?.address}
              ,
              {beneficiary.personalDetail?.number}
              {' '}
              -
              {beneficiary.personalDetail?.zipCode}
              {beneficiary.personalDetail?.city.label}
            </span>
          </div>
          <div>
            <div>
              <span className="text-sm font-bold text-gray-800">Contatos</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {beneficiary.personalDetail.email}
              /
              {beneficiary.personalDetail.phoneNumber}
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 p-4 gap-4 text-sm bg-gray-100 text-gray-700 sm:grid-cols-3">
        <div>
          <div className="flex-col">
            <span className="text-xs font-bold inline-block w-full">Quantidade de dependentes</span>
            {beneficiary.dependents}
          </div>
        </div>
        <div>
          <div className="flex-col">
            <span className="text-xs font-bold inline-block w-full">Data de cadastro</span>
            {formatDate(beneficiary.createdAt)}
          </div>
        </div>
        <div>
          <div className="flex-col">
            <span className="text-xs font-bold inline-block w-full">Data de assinatura</span>
            {formatDate(beneficiary.lgpdAssignedAt)}
          </div>
        </div>
      </div>
    </div>
  </a>
);

const BeneficiaryCard = ({ beneficiary }: { beneficiary: BeneficiaryMapped }) => (
  <Card>
    <BeneficiaryRow beneficiary={beneficiary} />
  </Card>
);

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [searchParams, setSearchParams] = useState({ print: false });
  const [items, setItems] = useState<BeneficiaryMapped[]>([]);
  const [totalProviders, setTotalProviders] = useState<string>();
  const [totalContracts, setTotalContracts] = useState<string>();
  const [totalBeneficiaries, setTotalBeneficiaries] = useState<string>();
  const [totalContractors, setTotalContractors] = useState<string>();
  const [meta, setMeta] = useState<Meta>();
  const containerResultRef = useRef<HTMLDivElement>(null);

  const scrollBarAfterFiltering = (): void => {
    if (containerResultRef) {
      containerResultRef.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const handleResultPagination = async (res: AxiosResponse<any>) => {
    setPage(page + 1);
    setItems([
      ...items,
      ...(res.data.data).map((beneficiary: BeneficiaryEntity) => beneficiaryMapper(beneficiary)),
    ]);
    setMeta(res?.data.meta);
    setHasMore(res?.data.meta.current_page < res?.data.meta.last_page);
    const totalizersData = await axios.get('/api/searches/totalizers');
    const {
      total_contract,
      total_contractors,
      total_beneficiaries,
      total_providers,
    } = totalizersData.data;
    setTotalBeneficiaries(total_beneficiaries);
    setTotalContracts(total_contract);
    setTotalContractors(total_contractors);
    setTotalProviders(total_providers);
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
    const url = `/api/searches/beneficiaries?${queryParams}${!searchParams.print ? `&page=${page}` : ''}`;
    const res = await axios.get(url);
    if (!searchParams?.print) {
      return handleResultPagination(res);
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
    setSearchParams({
      ...searchParams,
      print: true,
    });
  };

  return (
    <AppLayout
      className="relative"
      header={(
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          <span className="text-right">{meta?.total}</span>
          {' '}
          beneficiários
        </h2>
            )}
    >
      <div className="py-2">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-3">
          <BeneficiarySearchForm handleSearch={handleSearch} />
          <div className="flex flex-wrap sm:flex-nowrap justify-between mt-4" ref={containerResultRef}>
            <Card className="w-full sm:w-1/4 p-4 border-blue-400 my-2">
              <span className="relative text-gray-500">Total de contratos</span>
              <div className="text-extrabold text-2xl flex flex-row justify-between items-center mt-4">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>{totalContracts}</span>
              </div>
            </Card>
            <Card className="w-full sm:w-1/4 p-4 border-green-400 my-2">
              <span className="relative text-gray-500">Total de contratantes</span>
              <div className="text-extrabold text-2xl flex flex-row justify-between items-center mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span>{totalContractors}</span>
              </div>
            </Card>
            <Card className="w-full sm:w-1/4 p-4 border-yellow-400 my-2">
              <span className="relative text-gray-500">Total de beneficiários</span>
              <div className="text-extrabold text-2xl flex flex-row justify-between items-center mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span>{totalBeneficiaries}</span>
              </div>
            </Card>
            <Card className="w-full sm:w-1/4 p-4 border-green-400 my-2">
              <span className="relative text-gray-500">Total de prestadores</span>
              <div className="text-extrabold text-2xl flex flex-row justify-between items-center mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <span>{totalProviders}</span>
              </div>
            </Card>
          </div>
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
              {items.map((beneficiary: BeneficiaryMapped, key: number) => (
                <BeneficiaryCard
                  beneficiary={beneficiary}
                  key={key}
                />
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </div>
      <FabButton url="/admin/beneficiary/new" />
    </AppLayout>
  );
};

export default Dashboard;
