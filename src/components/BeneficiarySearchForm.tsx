import { useForm } from 'react-hook-form';
import { ContractEntity, ContractorEntity, SaleMapped } from 'shared/mappers';
import { useEffect, useState } from 'react';
import { useApi } from 'hooks/api';
import { Option } from './Form/Select';
import { Input, Select, SubTitle } from './Form';

const BeneficiarySearchForm = ({ handleSearch }: { handleSearch: any }) => {
  const { get } = useApi();
  const {
    register,
    handleSubmit,
  } = useForm<SaleMapped>({
    defaultValues: {},
  });
  const [contracts, setContracts] = useState<Option[]>([]);
  const [contractors, setContractors] = useState<Option[]>([]);
  useEffect(() => {
    get('/contracts')
      .then((data: ContractEntity[]) => {
        setContracts(data.map((contract: ContractEntity) => ({
          label: contract.name,
          value: contract.id,
        })));
      })
      .catch((error: any) => {
        if (error.response.status !== 409) throw error;
      });
    get('/contractors')
      .then((data: ContractorEntity[]) => {
        setContractors(data.map((contractor: ContractorEntity) => ({
          label: contractor.social_name || contractor.personalDetail.name,
          value: contractor.id,
        })));
      })
      .catch((error: any) => {
        if (error.response.status !== 409) throw error;
      });
    return () => {
      setContractors([]);
      setContracts([]);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit(handleSearch)} autoComplete="off">
      <div className="sm:flex sm:flex-wrap sm:gap-1 mx-5 sm:justify-between">
        <div className="w-full">
          <SubTitle>Campos de pesquisa</SubTitle>
        </div>
        <div className="w-full sm:w-1/3">
          <Select
            label="Contratos"
            placeholder="Contratos"
            name="contractId"
            register={register}
            options={contracts}
          />
        </div>
        <div className="w-full sm:w-1/2">
          <Select
            label="Contratantes"
            placeholder="Contratantes"
            name="contractorId"
            register={register}
            options={contractors}
          />
        </div>
        <div className="w-full">
          <Input
            label="Pesquisar"
            placeholder="Nome do procedimento"
            name="term"
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

export default BeneficiarySearchForm;
