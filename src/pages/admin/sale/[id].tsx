/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRouter } from 'next/router';
import Card from 'components/Card';
import { useForm } from 'react-hook-form';
import {
  DateInput, Input, Select, SubTitle, Toggle, Uploader,
} from 'components/Form';
import AppLayout from 'components/Layouts/AppLayout';
import {
  revertMapping,
  SaleEntity,
  SaleMapped,
  saleMapper,
  SellerEntity,
  SupplierEntity,
  VisitMapped,
} from 'shared/mappers';
import { useEffect, useMemo, useState } from 'react';
import { useApi } from 'hooks/api';
import { toast } from 'react-toastify';
import { Option } from 'components/Form/Select';
import { ADMIN, getProfile } from 'lib/profile';
import { useAuth } from 'hooks/auth';
import Autocomplete from 'components/Form/Autocomplete';
import { CURRENCY } from 'lib/masks';
import { calculateDaysDiff, getBorderStatusColor } from 'lib/helpers';
import Button from 'components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faRemove } from '@fortawesome/free-solid-svg-icons';
import Downloader from 'components/Form/Downloader';
import 'react-quill/dist/quill.snow.css';

type VisitProps = {
    index: number;
    register: any;
    visitStatusOptions: Option[];
    removeVisit: (index: number) => void;
}
const Visit = ({
  index = 0,
  removeVisit,
  register,
  visitStatusOptions,
}: VisitProps) => (
  <>
    <a
      className="float-right text-red-500 cursor-pointer pt-2"
      onClick={() => removeVisit(index)}
    >
      <FontAwesomeIcon
        icon={faRemove}
      />
      {' '}
      Remover
    </a>
    <SubTitle>
      Visita
      {index + 1}
    </SubTitle>
    <div className="sm:grid grid-cols-3 gap-2">
      <DateInput
        label="Data da visita"
        name={`visits.${index}.createdAt`}
        register={register}
        required
      />
      <Select
        label="Situação da visita"
        placeholder="Situação da visita"
        name={`visits.${index}.visitStatus`}
        required
        register={register}
        options={visitStatusOptions}
      />
      <Input
        label="Observação"
        name={`visits.${index}.observation`}
        register={register}
      />
    </div>
  </>
);

const Sale = () => {
  const { user } = useAuth({ middleware: 'auth' });
  const profile = getProfile(user);
  const {
    register, handleSubmit, reset, setValue, getValues,
  } = useForm<SaleMapped>({
    defaultValues: { },
  });
  const router = useRouter();
  const { id } = router.query;
  const { put, get, post } = useApi();
  const [sale, setSale] = useState<SaleMapped>();
  const [customerBranchInitialValue, setCustomerBranchInitialValue] = useState<string>();
  const [visits, setVisits] = useState<VisitMapped[]>([]);
  const [suppliers, setSuppliers] = useState<Option[]>([]);
  const [sellers, setSellers] = useState<Option[]>([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [changeDefaultEmailContent, setChangeDefaultEmailContent] = useState(false);
  const [newFileUploaded, setNewFileUploaded] = useState(false);
  const visitStatusOptions = useMemo(() => [
    { value: 'without_effect', label: 'Visita sem efeito' },
    { value: 'payment_realised', label: 'Pagamento realizado' },
  ], []);
  const saveSale = (payload: SaleMapped) => {
    const saleEntity: SaleEntity = revertMapping(payload);
    if (payload.id) {
      return put<SaleEntity>({ path: `/sales/${payload.id}`, payload: saleEntity, setErrors });
    }
    return post({ path: '/sales', payload, setErrors });
  };

  const onSubmit = async (payload: SaleMapped) => {
    try {
      setLoading(true);
      const { data } = await saveSale(payload);
      setLoading(false);
      setSale(data);
      setValue('id', data.id);
      toast.success('Dados salvos com sucesso', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!errors.length) {
      return;
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const error of errors) {
      toast.error(error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
    }
  }, [errors]);

  useEffect(() => {
    if (!id) {
      return;
    }

    if (id === 'new') return;

    get(`/sales/${id}`)
      .then((data) => {
        const mappedSale = saleMapper(data) || {} as SaleMapped;
        setSale(mappedSale);
        setVisits(mappedSale.visits);
        if (mappedSale?.customerBranchId) {
          setCustomerBranchInitialValue(`${mappedSale?.customerBranch.customerName} - ${mappedSale?.customerBranch.address.postalCode} - ${mappedSale?.customerBranch.address.street}`);
        }
        reset(mappedSale);
      })
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
  }, [id]);

  useEffect(() => {
    get('/suppliers')
      .then((data) => {
        setSuppliers(data.map((supplier: SupplierEntity) => ({
          value: supplier.id,
          label: supplier.name,
        })));
      })
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
    get('/sellers')
      .then((data) => {
        setSellers(data.map((item: SellerEntity) => ({ value: item.id, label: item.user.name })));
      })
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
  }, []);

  const getSuggestions = (term: string): Promise<Option[]> => get(`/customers/${term}/auto-complete`);

  const onSelected = (option: Option) => {
    setValue('customerBranchId', option.value);
  };

  const removeVisit = (item: number) => {
    const currentVisits = getValues('visits');
    currentVisits.splice(item, 1);
    setValue('visits', currentVisits);
    setVisits(currentVisits);
  };
  const addVisit = () => {
    const currentVisits = getValues('visits') || [];
    const newVisits = [...(currentVisits), { } as VisitMapped];
    setValue('visits', newVisits);
    setVisits(newVisits);
  };

  return (
    <AppLayout
      header={(
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Venda
        </h2>
      )}
    >
      <Card>
        <div className="p-5">
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <SubTitle>Dados da venda</SubTitle>
            {sale?.id && (
            <div className={`mb-4 p-4 text-sm text-shadow-md bg-gray-100 text-gray-700 rounded sm:grid grid-cols-2 gap-4 sm:grid-cols-3 ${getBorderStatusColor(sale)}`}>
              <div>
                <div className="flex-col">
                  <span className="text-xs font-bold inline-block w-full text-left">Dias entre a fatura e o pagamento</span>
                  {(sale?.expiresIn && calculateDaysDiff(sale.paidAt || new Date(), sale.invoiceDate)) || '-'}
                </div>
              </div>
              <div>
                <div className="flex-col">
                  <span className="text-xs font-bold inline-block w-full text-left">Dias entre o vencimento e o pagamento</span>
                  {((sale?.expiresIn && sale.paidAt) && calculateDaysDiff(sale.paidAt || new Date(), sale.expiresIn)) || '-'}
                </div>
              </div>
              <div>
                <div className="flex-col">
                  <span className="text-xs font-bold inline-block w-full text-left">Dias entre a venda e a fatura</span>
                  {(sale?.invoiceDate && calculateDaysDiff(sale.invoiceDate || new Date(), sale.soldAt)) || '-'}
                </div>
              </div>
            </div>
            )}
            <div className="mb-4">
              <Input
                label="Código da fatura"
                name="invoice"
                register={register}
              />
              {profile === ADMIN && (
              <Select
                label="Vendedor"
                placeholder="Vendedor"
                name="sellerId"
                register={register}
                options={sellers}
              />
              )}
              <Select
                label="Representada"
                placeholder="Representada"
                name="supplierId"
                required
                register={register}
                options={suppliers}
              />
              <Autocomplete
                initInputValue={customerBranchInitialValue}
                label="Cliente"
                placeholder="Pesquise o cliente de sua respectiva loja"
                suggestions={getSuggestions}
                register={register}
                onSelected={onSelected}
              />
            </div>
            <div className="md:grid-cols-2 md:grid gap-2">
              <DateInput
                label="Data da venda"
                name="soldAt"
                required
                register={register}
              />
              <Input
                label="Valor da venda"
                name="saleValue"
                required
                register={register}
                mask={CURRENCY}
              />
              <DateInput
                label="Data da fatura"
                name="invoiceDate"
                register={register}
              />
              <Input
                label="Valor da fatura"
                name="invoicedAmount"
                register={register}
                mask={CURRENCY}
              />
              <DateInput
                label="Data de vencimento"
                name="expiresIn"
                register={register}
              />
              <DateInput label="Data de pagamento" name="paidAt" register={register} />
            </div>
            <Input
              label="Motivo do atraso no pagamento"
              name="late_payment_motive"
              register={register}
            />
            <div className="py-2">
              <SubTitle>Visitas</SubTitle>
              {!!visits?.length && visits.map((visit, key) => (
                <Visit
                  register={register}
                  index={key}
                  visitStatusOptions={visitStatusOptions}
                  removeVisit={removeVisit}
                  key={key}
                />
              ))}
              <div className="mt-4">
                <Button variant="dark" type="button" className="h-10" onClick={addVisit}>
                  <FontAwesomeIcon icon={faAdd} />
                  {' '}
                  Registar visita
                </Button>
              </div>
            </div>
            <div className="border-t-2">
              <div className="flex-col flex md:flex-row py-4 gap-2">
                <Uploader
                  label="Anexar comprovante"
                  handleFileUploaded={(fileId) => {
                    setNewFileUploaded(true);
                    setValue('checkAttachId', fileId);
                  }}
                />
                {!!sale?.checkAttachId
                && <Downloader id={sale.checkAttachId} name="comprovativo-pagamento" label="Visualizar comprovante" />}
              </div>
              {newFileUploaded && (
              <>
                <Toggle
                  label="Adicionar observação no e-mail?"
                  setValue={setValue}
                  name="changeDefaultEmailContent"
                  handleChange={(value) => setChangeDefaultEmailContent(value)}
                />
                {changeDefaultEmailContent && (
                <div>
                  <SubTitle>Adicionar observação</SubTitle>
                  <Input
                    label="Observação"
                    name="billingObservation"
                    register={register}
                  />
                </div>
                )}
              </>
              )}
            </div>
            <div className="flex items-center py-4 gap-2 justify-between border-t-2 border-gray-200 mt-4">
              <a href="/admin/dashboard" className="text-blue-700 font-weight-bold">
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
  );
};

export default Sale;
