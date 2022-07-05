import { useForm } from 'react-hook-form';
import { SaleMapped } from 'shared/mappers';
import { Input, SubTitle } from './Form';

const UserSearchForm = ({ handleSearch }: { handleSearch: any }) => {
  const {
    register,
    handleSubmit,
  } = useForm<SaleMapped>({
    defaultValues: {},
  });

  return (
    <form onSubmit={handleSubmit(handleSearch)} autoComplete="off">
      <div className="sm:flex sm:flex-wrap sm:gap-2 mx-5 sm:justify-between">
        <div className="w-full">
          <SubTitle>Campos de pesquisa</SubTitle>
        </div>
        <div className="w-full">
          <Input
            label="Pesquisar"
            placeholder="Nome ou e-mail do usuário"
            name="q"
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

export default UserSearchForm;
