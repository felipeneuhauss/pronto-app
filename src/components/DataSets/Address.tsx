import { AddressMapped } from 'shared/mappers';
import { POSTAL_CODE } from 'lib/masks';
import React, { useEffect, useState } from 'react';
import { Input } from '../Form';
import Map from '../Form/Map';

type AddressProps = {
    address: AddressMapped | undefined;
    prefixFieldName?: string;
    register: any;
    setValue?: any;
}

const Address = ({
  address, register, setValue, prefixFieldName = 'address',
}: AddressProps) => {
  const [latLng, setLatLng] = useState({
    lat: address?.lat ? parseFloat(address?.lat) : 38.736946,
    lng: address?.lng ? parseFloat(address?.lng) : -9.142685,
  });
  const [postalCode, setPostalCode] = useState(address?.postalCode);
  useEffect(() => {
    setValue(`${prefixFieldName}.lat`, latLng.lat);
    setValue(`${prefixFieldName}.lng`, latLng.lng);
  }, [latLng]);

  const handleBlur = (e: React.FormEvent<HTMLInputElement>) => {
    setPostalCode(e.currentTarget.value);
    setValue(`${prefixFieldName}.postalCode`, e.currentTarget.value);
  };

  return (
    <>
      <Input
        label="Código Postal"
        name={`${prefixFieldName}.postalCode`}
        required
        register={register}
        mask={POSTAL_CODE}
        handleBlur={handleBlur}
      />
      <Input label="Endereço" name={`${prefixFieldName}.street`} register={register} required />
      <Input label="Número" name={`${prefixFieldName}.number`} register={register} required />
      <Input label="Complemento" name={`${prefixFieldName}.complement`} register={register} />
      <Input label="Localidade" name={`${prefixFieldName}.locale`} register={register} />
      <Input type="hidden" label="Latitude" name={`${prefixFieldName}.lat`} register={register} />
      <Input type="hidden" label="Longitude" name={`${prefixFieldName}.lng`} register={register} />
      <Map setLatLng={setLatLng} lat={latLng.lat} lng={latLng.lng} postalCode={postalCode} />
    </>
  );
};

export default Address;
