export const intToFloat = (value: number) => {
  return value / Math.pow(10.0, 2)
}

export const money = (value: number) => {
  return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(intToFloat(value))
}
