import { useEffect, useState } from 'react'

function getStorageValue (key: string, defaultValue: any): any {
  // getting stored value
  const saved =
        typeof window !== 'undefined' ? localStorage.getItem(key) : null
  const initial = saved ? JSON.parse(saved) : null
  return initial || defaultValue
}

export const useLocalStorage = (key: string, defaultValue: any) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue)
  })

  useEffect(() => {
    // storing input name
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  return [value, setValue]
}
