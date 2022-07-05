import React, { useCallback } from 'react';
import {
  currency, CURRENCY, POSTAL_CODE, postalCode,
} from 'lib/masks';

type InputTextProps = {
    type?: 'text' | 'email' | 'tel' | 'url' | 'hidden';
    label?: string;
    placeholder?: string;
    name: string;
    register: any;
    required?: boolean;
    mask?: string;
    disabled?: boolean;
    handleBlur?: any;
    onChange?: any;
    value?: string | null;
}

const Input = ({
  label, placeholder, name, register, required, mask, disabled, type = 'text', handleBlur, value,
}: InputTextProps) => {
  const handleKeyUp = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (mask === POSTAL_CODE) {
        postalCode(e);
      }
      if (mask === CURRENCY) {
        currency(e);
      }
    },
    [mask],
  );

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label htmlFor="">
      {label && type !== 'hidden' && (<span className="text-gray-700">{label}</span>)}
      <input
        autoComplete="off"
        required={required}
        value={value}
        disabled={disabled}
        {...register(name)}
        placeholder={placeholder || label}
        onKeyUp={handleKeyUp}
        onBlur={handleBlur}
        type={type}
        className="
                      mb-2
                      block
                      w-full
                      rounded-md
                      border-gray-300
                      shadow-sm
                      focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
    </label>
  );
};

export default Input;
