const Label = ({ className, children, ...props }: any) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label
    className={`${className} block font-medium text-sm text-gray-700`}
    {...props}
  >
    {children}
  </label>
);

export default Label;
