import React from 'react';

export type Option = {
    value: any;
    label: string;
}

type SelectProps = {
    label?: string;
    placeholder?: string;
    name: string;
    register: any;
    required?: boolean;
    disabled?: boolean;
    options: Option[];
}

const Select = ({
  label, placeholder, name, register, required, disabled, options,
}: SelectProps) => {
  const selectOptions = [{ value: '', label: 'Selecione...' }, ...options];
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label htmlFor="">
      {label && (<span className="text-gray-700">{label}</span>)}
      <select
        required={required}
        disabled={disabled}
        {...register(name)}
        placeholder={placeholder || label}
        className="
                    mb-2
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
      >
        {!!selectOptions.length && selectOptions?.map((item: Option, key) => <option value={item.value} key={`${key}`}>{item.label}</option>)}
      </select>
    </label>
  );
};

export default Select;
