import React, { useState } from 'react';

type CheckboxInputProps = {
    name: string;
    label: string;
    id: any;
    register?: any;
    checked: boolean;
    setValue: (field: any, value: any) => void;
    required?: boolean;
    disabled?: boolean;
    value: any;
}

const Checkbox = ({
  id, label, setValue, value, name, register, required, disabled, checked,
}: CheckboxInputProps) => {
  const [checkedItem, setCheckedItem] = useState<boolean>(checked);
  const handleChange = () => {
    setCheckedItem(!checkedItem);
    setValue(`${name}`, !checkedItem);
  };
  return (
    <div className="flex flex-col py-5">
      <label htmlFor={id} className=" cursor-pointer">
        <input
          type="checkbox"
          id={id}
          name={name}
          {...register}
          onChange={handleChange}
          required={required}
          disabled={disabled}
          value={value}
          checked={checkedItem}
          className="rounded border-gra y-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <span className="text-gray-700 px-2">{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
