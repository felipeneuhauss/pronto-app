const DateInput = ({
  label, name, register, required, onChange,
}: any) => {
  const onDateChange = (value: any) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label htmlFor="">
      <span className="text-gray-700">{label}</span>
      <input
        required={required}
        {...register(name)}
        onChange={(e) => onDateChange(e.target.value)}
        placeholder={label}
        type="date"
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

export default DateInput;
