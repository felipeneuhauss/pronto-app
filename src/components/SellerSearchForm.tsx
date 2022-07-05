import { useForm } from 'react-hook-form';
import { CustomerMapped, SellerEntity, SupplierEntity } from 'shared/mappers';
import { useEffect, useState } from 'react';
import { useApi } from 'hooks/api';
import { useAuth } from 'hooks/auth';
import { ADMIN, getProfile } from 'lib/profile';
import { Option } from './Form/Select';
import { Input, Select, SubTitle } from './Form';

const SellerSearchForm = ({ handleSearch }: {handleSearch: any}) => {
  const { get } = useApi();
  const { register, handleSubmit } = useForm<CustomerMapped>({
    defaultValues: { },
  });
  const [sellers, setSellers] = useState<Option[]>([]);
  const [suppliers, setSuppliers] = useState<Option[]>([]);
  const { user } = useAuth({ middleware: 'auth' });
  const profile = getProfile(user);
  useEffect(() => {
    get('/sellers')
      .then((data: SellerEntity[]) => {
        setSellers(data.map((seller: SellerEntity) => ({
          value: seller.id,
          label: seller.user.name,
        })));
      })
      .catch((error: any) => {
        if (error.response.status !== 409) throw error;
      });
    get('/suppliers')
      .then((data: SupplierEntity[]) => {
        setSuppliers(data.map(({ id, name } : SupplierEntity) => ({
          value: id,
          label: name,
        })));
      })
      .catch((error: any) => {
        if (error.response.status !== 409) throw error;
      });

    return () => {
      setSellers([]);
      setSuppliers([]);
    };
  }, []);
  return (
    <form onSubmit={handleSubmit(handleSearch)} autoComplete="off">
      <div className="md:flex md:flex-wrap md:gap-3 md:justify-between mx-5">
        <div className="w-full">
          <SubTitle>Campos de pesquisa</SubTitle>
        </div>
        {profile === ADMIN && <Select label="Vendedor" placeholder="Vendedor" name="sellerId" register={register} options={sellers} />}
        <Select label="Representada" placeholder="Representada" name="supplierId" register={register} options={suppliers} />
        <Input label="Nome do cliente" placeholder="Nome do cliente" name="customerName" register={register} />
        <Input label="Código interno" type="tel" placeholder="Código interno" name="code" register={register} />
        <Input label="NIF" type="tel" placeholder="NIF" name="document" register={register} />
        <div className="w-full text-right">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Pesquisar
          </button>
        </div>
      </div>
    </form>
  );
};

export default SellerSearchForm;
