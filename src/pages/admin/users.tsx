import AppLayout from 'components/Layouts/AppLayout';
import axios from 'lib/axios';
import Card from 'components/Card';
import {
  Meta, RoleEntity, UserEntity, UserMapped, userMapper,
} from 'shared/mappers';
import queryString from 'query-string';
import { useEffect, useRef, useState } from 'react';
import { AxiosResponse } from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserSearchForm from 'components/UserSearchForm';

const UserRow = ({ user }: { user: UserMapped }) => (
  <a href={`/admin/user/${user.id}`} className="cursor-pointer">
    <div className="flex place-content-between flex-wrap">
      <div className="w-auto p-4">
        <div className="text-sm py-2 font-medium text-gray-900">
          {user.name}
        </div>
        <div className="text-sm py-2 text-gray-500">
          {user.email}
        </div>
        <div className="text-sm py-2 text-gray-500">
          {user.phoneNumber}
        </div>
        <div className="w-auto text-sm text-gray-500">
          {user.lgpdVerified && (
            <span
              className="px-2 items-start text-xs leading-5 font-semibold rounded-full bg bg-green-100 text-green-800"
            >
              LGPD assinada
            </span>
          )}
        </div>
      </div>
      <div className="w-auto p-4">
        {user.roles?.map((role: RoleEntity, key: number) => (
          <span
            key={key}
            className="px-2 items-start text-xs leading-5 font-semibold rounded-full bg bg-green-100 text-green-800"
          >
            {role.name}
          </span>
        ))}
      </div>
    </div>
  </a>
);

const UserCard = ({ user } : {user: UserMapped}) => (
  <Card>
    <UserRow user={user} />
  </Card>
);

const Users = () => {
  const [items, setItems] = useState<UserMapped[]>([]);
  const [meta, setMeta] = useState<Meta>();
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState({ print: false });
  const [hasMore, setHasMore] = useState(false);
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
    setItems([...items, ...(res.data.data).map((user: UserEntity) => userMapper(user))]);
    setMeta(res?.data.meta);
    setHasMore(res?.data.meta.current_page < res?.data.meta.last_page);
    scrollBarAfterFiltering();
  };

  const fetchData = async () => {
    const queryParams = queryString.stringify(searchParams);
    const url = `/api/users?${queryParams}${!searchParams.print ? `&page=${page}` : ''}`;
    const res = await axios.get(url);
    if (!searchParams?.print) {
      return handleResultPagination(res);
    }
  };

  const handleSearch = (payload: any) => {
    setItems([]);
    setPage(1);
    setSearchParams(payload);
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  return (
    <AppLayout
      className="relative"
      header={(
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          <span className="text-right">{meta?.total}</span>
          {' '}
          Usuários
        </h2>
      )}
    >
      <div className="py-2">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <UserSearchForm handleSearch={handleSearch} />
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
            {items.map((user: UserMapped, key: number) => <UserCard user={user} key={`user-card-${key}`} />)}
          </InfiniteScroll>
        </div>
      </div>
    </AppLayout>
  );
};

export default Users;
