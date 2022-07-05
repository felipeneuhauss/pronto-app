const Button = ({
  type = 'submit', variant = 'dark', className, ...props
}: any) => {
  const getClassName = (classVariant: string, variantClassName: string) => {
    switch (classVariant) {
      case 'dark':
        return `${variantClassName} text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700`;
      case 'error':
        return `${variantClassName} text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900`;
      default:
        return `${variantClassName} inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150`;
    }
  };
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={getClassName(variant, className)}
      {...props}
    />
  );
};

export default Button;
