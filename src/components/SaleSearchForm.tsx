import { useForm } from 'react-hook-form';
import { SaleMapped, SellerEntity, SupplierEntity } from 'shared/mappers';
import { useEffect, useState } from 'react';
import { useApi } from 'hooks/api';
import { useAuth } from 'hooks/auth';
import { Option } from './Form/Select';
import {
  DateInput, Input, Select, SubTitle,
} from './Form';
import { ADMIN, getProfile } from '../lib/profile';
import Autocomplete from './Form/Autocomplete';

const SaleSearchForm = ({ handleSearch }: { handleSearch: any }) => {
  const { get } = useApi();
  const [customerBranchInitialValue] = useState<string>();
  const { user } = useAuth({ middleware: 'auth' });
  const profile = getProfile(user);
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm<SaleMapped>({
    defaultValues: {},
  });
  const [sellers, setSellers] = useState<Option[]>([]);
  const [suppliers, setSuppliers] = useState<Option[]>([]);
  const [saleStatuses] = useState<Option[]>([{
    value: 'paid',
    label: 'Pago',
  }, {
    value: 'not_paid',
    label: 'Pendente',
  }]);
  const [invoiceTypes] = useState<Option[]>([{
    value: 'allowance',
    label: 'Crédito',
  }, {
    value: 'sale',
    label: 'Venda',
  }]);
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
        setSuppliers(data.map(({
          id,
          name,
        }: SupplierEntity) => ({
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

  const getSuggestions = (term: string): Promise<Option[]> => get(`/customers/${term}/auto-complete`);

  const onSelected = (option: Option) => {
    setValue('customerBranchId', option.value);
  };

  return (
    <form onSubmit={handleSubmit(handleSearch)} autoComplete="off">
      <div className="sm:flex sm:flex-wrap sm:gap-2 mx-5 sm:justify-between">
        <div className="w-full">
          <SubTitle>Campos de pesquisa</SubTitle>
        </div>
        <div className="w-full">
          <Autocomplete
            initInputValue={customerBranchInitialValue}
            label="Cliente"
            placeholder="Pesquise o cliente de sua respectiva loja"
            suggestions={getSuggestions}
            register={register}
            onSelected={onSelected}
          />
        </div>
        {profile === ADMIN && (
        <div className="w-full sm:w-1/4">
          <Select
            label="Vendedor"
            placeholder="Vendedor"
            name="sellerId"
            register={register}
            options={sellers}
          />
        </div>
        )}
        <div className="w-full sm:w-1/4">
          <Select
            label="Representada"
            placeholder="Representada"
            name="supplierId"
            register={register}
            options={suppliers}
          />
        </div>
        <div className="w-full sm:w-1/4">
          <Input
            label="Fatura"
            placeholder="Código da fatura"
            name="invoice"
            register={register}
          />
        </div>
        <div className="w-full sm:w-1/4">
          <DateInput
            label="Vendido de"
            placeholder="Vendido de"
            name="soldFrom"
            register={register}
          />
        </div>
        <div className="w-full sm:w-1/4">
          <DateInput
            label="Vendido até"
            placeholder="Vendido até"
            name="soldAt"
            register={register}
          />
        </div>
        <div className="w-full sm:w-1/4">
          <DateInput
            label="Pago de"
            placeholder="Pago de"
            name="paidFrom"
            register={register}
          />
        </div>
        <div className="w-full sm:w-1/4">
          <DateInput
            label="Pago até"
            placeholder="Pago até"
            name="paidAt"
            register={register}
          />
        </div>
        <div className="w-full sm:w-1/4">
          <Select
            label="Status"
            placeholder="Status"
            name="status"
            register={register}
            options={saleStatuses}
          />
        </div>
        <div className="w-full sm:w-1/4">
          <Select
            label="Tipo de fatura"
            placeholder="Tipo de fatura"
            name="invoiceType"
            register={register}
            options={invoiceTypes}
          />
        </div>
        <div className="w-full text-right">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Pesquisar
          </button>
        </div>
      </div>
    </form>
  );
};

export default SaleSearchForm;
