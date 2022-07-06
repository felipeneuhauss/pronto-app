import Link from 'next/link';
import { Menu } from '@headlessui/react';

const DropdownLink = ({ children, ...props }: any) => (
  <Menu.Item>
    {({ active }: any) => (
      <Link
        {...props}
        className={`w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 ${active ? 'bg-gray-100' : ''} focus:outline-none transition duration-150 ease-in-out`}
      >
        {children}
      </Link>
    )}
  </Menu.Item>
);

export const DropdownButton = ({ children, ...props }: any) => (
  <Menu.Item>
    {({ active }: any) => (
      <button
        type="button"
        className={`w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 ${active ? 'bg-gray-100' : ''} focus:outline-none transition duration-150 ease-in-out`}
        {...props}
      >
        {children}
      </button>
    )}
  </Menu.Item>
);

export default DropdownLink;
