import { RoleMapped, rolesMapper, UserMapped } from 'shared/mappers'
import { Input } from '../Form'
import { useEffect, useState } from 'react'
import { useApi } from 'hooks/api'
import CheckboxSet from '../Form/CheckboxSet'
import { Option } from '../Form/Select'

type UserProps = {
    user: UserMapped | undefined;
    register: any;
    setValue: any;
}

const User = ({ user, register, setValue } : UserProps) => {
  const [roles, setRoles] = useState<RoleMapped[]>([])
  const [roleOptions, setRoleOptions] = useState<Option[]>([])
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const { get } = useApi()
  useEffect(() => {
    get('/roles').then((data) => {
      const mappedRoles = rolesMapper(data)
      setRoles(mappedRoles)
      setRoleOptions(mappedRoles.map(role => {
        return {
          value: role.id,
          label: role.name
        }
      }))
    })
  }, [])

  useEffect(() => {
    if (user?.roles) {
      setSelectedRoles(user.roles.map((role) => {
        return role.id
      }))
    }
  }, [user, roles])

  useEffect(() => {
    if (selectedRoles.length) {
      setValue('user.roles', roles.filter((role) => {
        return selectedRoles.includes(role.id)
      }))
    }
  }, [roles, selectedRoles])

  return <>
    <Input label={'Name'}
      name={'user.name'}
      register={register}
      required={true} />
    <Input type={'email'}
      label={'E-mail'}
      name={'user.email'}
      register={register}
      disabled={!!user?.id} />
    <CheckboxSet label={'Perfis'}
      name={'user.roles'}
      register={register}
      items={roleOptions}
      selectedItems={selectedRoles}
      setSelectedItems={setSelectedRoles} />
  </>
}

export default User
