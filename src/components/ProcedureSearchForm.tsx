import { useForm } from 'react-hook-form';
import { ProviderEntity, SaleMapped } from 'shared/mappers';
import { useEffect, useState } from 'react';
import { useApi } from 'hooks/api';
import { Option } from './Form/Select';
import { Input, Select, SubTitle } from './Form';

const ProcedureSearchForm = ({ handleSearch }: { handleSearch: any }) => {
  const { get } = useApi();
  const {
    register,
    handleSubmit,
  } = useForm<SaleMapped>({
    defaultValues: {},
  });
  const [providers, setProviders] = useState<Option[]>([]);
  useEffect(() => {
    get('/providers/pairs')
      .then((data: ProviderEntity[]) => {
        setProviders(data.map((provider: ProviderEntity) => ({
          label: provider.fantasy_name,
          value: provider.id,
        })));
      })
      .catch((error: any) => {
        if (error.response.status !== 409) throw error;
      });
    return () => {
      setProviders([]);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit(handleSearch)} autoComplete="off">
      <div className="sm:flex sm:flex-wrap sm:gap-2 mx-5 sm:justify-between">
        <div className="w-full">
          <SubTitle>Campos de pesquisa</SubTitle>
        </div>
        <div className="w-full sm:w-1/3">
          <Select
            label="Prestadores"
            placeholder="Prestadores"
            name="providerId"
            register={register}
            options={providers}
          />
        </div>
        <div className="w-full sm:w-1/2">
          <Input
            label="Pesquisar"
            placeholder="Nome do procedimento"
            name="procedureName"
            register={register}
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

export default ProcedureSearchForm;
