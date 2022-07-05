import { useEffect, useState } from 'react'

type ToggleProps = {
    label?: string;
    name: string;
    id?: string;
    handleChange?: (value: boolean) => void;
    setValue: any;
    checked?: boolean;
}

const Toggle = ({ label, name, id, setValue, handleChange, checked }: ToggleProps) => {
  const [toggle, setToggle] = useState(false)
  const toggleClass = ' transform translate-x-6'
  useEffect(() => {
    setValue(`${name}`, toggle)
    if (handleChange) {
      handleChange(toggle)
    }
  }, [toggle])

  useEffect(() => {
    setToggle(!!checked)
  }, [checked])

  return (
    <div className="flex w-full mb-12">
      <label htmlFor={id || name} className="flex items-center cursor-pointer">
        <div
          className={`md:w-14 md:h-8 w-12 h-6 flex items-center bg-gray-400 rounded-full p-1 cursor-pointer ${toggle ? ' bg-green-400 ' : ' bg-black-200 '}`}
          onClick={() => {
            setToggle(!toggle)
          }}
        >
          <div
            className={
              'bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out' +
                      (toggle ? toggleClass : null)
            }
          ></div>
        </div>
        {label && <span className="form-check-label inline-block text-gray-800 pl-2">{label}</span>}
      </label>
    </div>)
}

export default Toggle
