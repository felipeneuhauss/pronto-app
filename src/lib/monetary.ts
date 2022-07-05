export const intToFloat = (value: number) => value / 10.0 ** 2;

export const money = (value: number) => new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(intToFloat(value));
