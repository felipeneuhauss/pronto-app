import React from 'react';
import { SubTitle } from './index';

type CheckBoxProps<T> = {
    label: string;
    name: string;
    register: any;
    required?: boolean;
    disabled?: boolean;
    items: Partial<T>[];
    selectedItems: any[];
    setSelectedItems: any;
}

type CheckboxInputProps = {
    id: any;
    register?: any;
    name: string;
    checked: boolean;
    required: boolean | undefined;
    disabled: boolean | undefined;
    handleChange: any;
    value: any;
}

const CheckboxInput = ({
  id,
  register,
  name,
  required,
  disabled,
  handleChange,
  checked,
  value,
}: CheckboxInputProps) => (
  <input
    type="checkbox"
    id={id}
    name={name}
    {...register}
    required={required}
    disabled={disabled}
    value={value}
    onChange={handleChange}
    checked={checked}
    className="rounded border-gra y-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
  />
);

const CheckboxSet = ({
  label, name, register, required, disabled, items, selectedItems = [], setSelectedItems,
}: CheckBoxProps<any>) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value;
    if (!selectedItems.includes(id)) {
      return setSelectedItems([...selectedItems, id]);
    }
    return setSelectedItems(selectedItems.filter((item) => item !== id));
  };

  return (
    <div className="flex flex-col my-4">
      <SubTitle>{ label }</SubTitle>
      <div className="flex flex-col">
        {items && items.map(({ value, label: customLabel }, key: number) => (
          <label htmlFor={`${name}-${value}`} key={key} className="mb-2 cursor-pointer">
            <CheckboxInput
              value={value}
              id={`${name}-${value}`}
              register={register}
              name={name}
              required={required}
              disabled={disabled}
              handleChange={handleChange}
              checked={selectedItems.includes(value)}
            />
            <span className="text-gray-700 px-2">{customLabel}</span>
          </label>
        ))}
        {' '}

      </div>
    </div>
  );
};

export default CheckboxSet;
