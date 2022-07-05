import { useRouter } from 'next/router';
import Card from 'components/Card';
import { useForm } from 'react-hook-form';
import {
  Input, Select, SubTitle, Toggle,
} from 'components/Form';
import AppLayout from 'components/Layouts/AppLayout';
import {
  revertMapping, SellerEntity, SellerMapped, sellerMapper,
} from 'shared/mappers';
import User from 'components/DataSets/User';
import Address from 'components/DataSets/Address';
import { useEffect, useState } from 'react';
import { useApi } from 'hooks/api';
import { toast } from 'react-toastify';
import { Option } from 'components/Form/Select';

const Seller = () => {
  const router = useRouter();
  const { id } = router.query;
  const { put, get, post } = useApi();
  const [seller, setSeller] = useState<SellerMapped>();
  const [sellers, setSellers] = useState<Option[]>([]);
  const [, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const saveSeller = (payload: SellerMapped) => {
    const sellerEntity: SellerEntity = revertMapping(payload);
    if (payload.id) {
      return put<SellerEntity>({ path: `/sellers/${payload.id}`, payload: sellerEntity, setErrors });
    }
    return post({ path: '/sellers', payload, setErrors });
  };
  const onSubmit = async (payload: SellerMapped) => {
    try {
      setLoading(true);
      await saveSeller(payload);
      setLoading(false);
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
    // await router.push('/admin/sellers')
  };

  const {
    register, handleSubmit, reset, setValue,
  } = useForm<SellerMapped>({
    defaultValues: { },
  });

  useEffect(() => {
    if (!id) {
      return;
    }

    if (id === 'new') return;

    get(`/sellers/${id}`)
      .then((data) => {
        const entitySeller = data;
        const mappedSeller = sellerMapper(entitySeller);
        setSeller(mappedSeller);
        reset(mappedSeller);
      })
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
  }, [id]);

  useEffect(() => {
    get('/sellers')
      .then((data) => {
        setSellers(data.map((item: SellerEntity) => ({ value: item.id, label: item.user.name })));
      })
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
  }, []);

  return (
    <AppLayout
      header={(
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Vendedor(a)
        </h2>
      )}
    >
      <Card>
        <div className="p-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <SubTitle>Dados do usuário</SubTitle>
            <div className="mb-4">
              <Select label="Representante" register={register} options={sellers} name="sellerId" />
              <User user={seller?.user} register={register} setValue={setValue} />
              <Input label="Documento" name="document" register={register} required />
              <Input label="Telefone" name="phone" register={register} required />
            </div>
            <SubTitle>Endereço</SubTitle>
            <Address address={seller?.address} register={register} setValue={setValue} />
            <div className="py-4 border-t-2 mt-2">
              <Toggle
                label="Inativar usuário"
                setValue={setValue}
                {...register}
                name="inactivate"
                checked={!!seller?.deletedAt}
              />
            </div>
            <div className="flex items-center py-4 gap-2 justify-between border-t-2 border-gray-200 mt-4">
              <a href="/admin/sellers" className="text-blue-700 font-weight-bold">
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

export default Seller;
