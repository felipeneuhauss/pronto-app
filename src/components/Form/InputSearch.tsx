import React from 'react'

type SearchInputProps = {
    placeholder: string;
    onSearchValue: (value: any) => void;
}

const InputSearch = ({ placeholder, onSearchValue }: SearchInputProps) => {
  const handleKeyUp =
    (e: React.FormEvent<HTMLInputElement>) => {
      onSearchValue(e.currentTarget.value)
    }

  return (
    <>
      <div className="container flex px-4">
        <div className="flex w-full">
          <input type="text"
            className="px-4 py-2 w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder={placeholder}
            onKeyUp={handleKeyUp}
          />
          <button className="flex items-center justify-center px-4 border-r">
            <svg className="w-6 h-6 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z">
              </path>
            </svg>
          </button>
        </div>
      </div>
    </>)
}

export default InputSearch
