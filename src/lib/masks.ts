import React from 'react'

export const POSTAL_CODE = 'postalCode'
export const CURRENCY = 'currency'
export function postalCode (e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 8
  let value = e.currentTarget.value
  value = value.replace(/\D/g, '')
  value = value.replace(/^(\d{4})(\d)/, '$1-$2')
  e.currentTarget.value = value
  return e
}

export function convertIntegerInFloatValue (value: string | number) {
  value = `${value}`.replace(/(?!^-)\D/g, '')
  value = `${value}`.replace(/((?!^-)\d)(\d{2})$/, '$1,$2')
  return `${value}`.replace(/(?=((?!^-)\d{3})+(\D))\B/g, '.')
}

export function currency (e: React.FormEvent<HTMLInputElement>) {
  let value = e.currentTarget.value
  value = convertIntegerInFloatValue(value)

  e.currentTarget.value = value
  return e
}

export function cpf (e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 14
  let value = e.currentTarget.value
  if (!value.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d{2})$/, '$1-$2')
    e.currentTarget.value = value
  }
  return e
}
