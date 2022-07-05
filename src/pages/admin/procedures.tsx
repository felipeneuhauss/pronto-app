/* eslint-disable jsx-a11y/no-static-element-interactions */
import AppLayout from 'components/Layouts/AppLayout';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  Meta, ProcedureEntity, ProcedureMapped, procedureMapper,
} from 'shared/mappers';
import FabButton from 'components/FabButton';
import { useEffect, useRef, useState } from 'react';
import queryString from 'query-string';
import axios from 'lib/axios';
import Card from 'components/Card';
import { AxiosResponse } from 'axios';
import ProcedureSearchForm from 'components/ProcedureSearchForm';

const ProcedureRow = ({ procedure }: { procedure: ProcedureMapped }) => (
  <div className="flex flex-col">
    <div className="w-full flex justify-between flex-wrap">
      <div className="p-4 flex-col md:w-1/3">
        <div>
          <div>
            <span className="text-sm font-bold text-gray-800">Procedimento </span>
          </div>
          <span
            className="text-sm font-medium text-gray-900"
          >
            {procedure.tussRemunerationName || '-'}
          </span>
        </div>
        <div>
          <div>
            <span className="text-sm font-bold text-gray-800">Prestador </span>
          </div>
          <span
            className="text-sm font-medium text-gray-900"
          >
            {procedure.providerCnpj || '-'}
            {' '}
            -
            {' '}
            {procedure.providerName || '-'}
          </span>
        </div>
      </div>
      <div className="p-4 flex-col md:w-1/3">
        <div>
          <div>
            <span className="text-sm font-bold text-gray-800">Localidade </span>
          </div>
          <span className="text-sm font-medium text-gray-900">
            {procedure.addressStreet && (
            <>
              {procedure.addressStreet}
              ,
              {procedure.streetNumber}
              {' '}
              -
              {procedure.zipCode}
              {procedure.city}
              {' '}
              -
              {procedure.initials}
            </>
            )}
          </span>
        </div>
      </div>
      <div className="p-4 flex-col md:w-1/3">
        <div>
          <div>
            <span className="text-sm font-bold text-gray-800">Total </span>
          </div>
          <span className="text-sm font-medium text-gray-900">
            {procedure.total}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const ProcedureCard = ({ procedure }: { procedure: ProcedureMapped }) => (
  <Card>
    <ProcedureRow procedure={procedure} />
  </Card>
);

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [searchParams, setSearchParams] = useState({ print: false });
  const [items, setItems] = useState<ProcedureMapped[]>([]);
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
    setItems([...items, ...(res.data.data)
      .map((procedure: ProcedureEntity) => procedureMapper(procedure))]);
    setMeta(res?.data.meta);
    setHasMore(res?.data.meta.current_page < res?.data.meta.last_page);
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
    const url = `/api/providers/procedures?${queryParams}${!searchParams.print ? `&page=${page}` : ''}`;
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
          procedimentos
        </h2>
      )}
    >
      <div className="py-2">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-3">
          <ProcedureSearchForm handleSearch={handleSearch} />
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
              {items.map((procedure: ProcedureMapped, key: number) => <ProcedureCard procedure={procedure} key={`procedure-card-${key}`} />)}
            </InfiniteScroll>
          </div>
        </div>
      </div>
      <FabButton url="/admin/sale/new" />
    </AppLayout>
  );
};

export default Dashboard;
