import AppLayout from 'components/Layouts/AppLayout';
import useSWR from 'swr';
import axios from 'lib/axios';
import Card from 'components/Card';
import { SupplierEntity } from 'shared/mappers';
import FabButton from 'components/FabButton';

const SupplierRow = ({ supplier }: any) => (
  <a href={`/admin/supplier/${supplier.id}`} className="cursor-pointer">
    <div className="flex place-content-between flex-wrap">
      <div className="w-auto p-4">
        <div className="text-sm font-medium text-gray-900">
          {supplier.name}
        </div>
        <div className="text-sm py-2 text-gray-500">
          {supplier.document}
        </div>
        <div className="text-sm py-2 text-gray-500">
          {supplier.website}
        </div>
      </div>
    </div>
  </a>
);

const SupplierCard = ({ supplier } : {supplier: SupplierEntity}) => (
  <Card>
    <SupplierRow supplier={supplier} />
  </Card>
);

const Suppliers = () => {
  const { data: suppliers } = useSWR('/api/suppliers', () => axios
    .get('/api/suppliers')
    .then((res) => res.data.data)
    .catch((error) => {
      if (error.response.status !== 409) throw error;
    }));

  return (
    <AppLayout
      className="relative"
      header={(
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Representadas
        </h2>
      )}
    >
      <div className="py-2">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {!!suppliers
          && suppliers.map((supplier: SupplierEntity, key: number) => <SupplierCard supplier={supplier} key={`supplier-card-${key}`} />)}
        </div>
      </div>
      <FabButton url="/admin/supplier/new" />
    </AppLayout>
  );
};

export default Suppliers;
