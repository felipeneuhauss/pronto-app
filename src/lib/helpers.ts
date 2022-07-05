import { differenceInCalendarDays, parse } from 'date-fns'
import { SYSTEM_DATE_FORMAT } from './datetime'
import { SaleMapped } from 'shared/mappers'

export const calculateDaysDiff = (dateLeft: string | Date, dateRight: string | Date) => {
  return differenceInCalendarDays(
    dateLeft instanceof Date ? dateLeft : parse(dateLeft, SYSTEM_DATE_FORMAT, new Date()),
    dateRight instanceof Date ? dateRight : parse(dateRight, SYSTEM_DATE_FORMAT, new Date()))
}
export const getBorderStatusColor = (sale?: SaleMapped): string => {
  if (!sale) return ''
  if (sale.paidAt) return 'border-green-400'
  if (sale.invoiceDate && sale.expiresIn) {
    const difference = calculateDaysDiff(sale.paidAt || new Date(), sale.expiresIn)
    if (difference) {
      if (difference < 30) {
        return 'border-yellow-500'
      }
      if (difference >= 30 && difference <= 60) {
        return 'border-red-400'
      }
      if (difference > 60 && difference <= 99) {
        return 'border-red-500'
      }

      return 'border-red-800'
    }
  }
  return ''
}
export const getDelayColor = (sale?: SaleMapped): string => {
  if (!sale) return ''
  const difference = calculateDaysDiff(sale.paidAt || new Date(), sale.expiresIn)
  if (difference) {
    if (difference < 30) {
      return 'text-yellow-500'
    }
    if (difference >= 30 && difference <= 60) {
      return 'text-red-400'
    }
    if (difference > 60 && difference <= 99) {
      return 'text-red-500'
    }

    return 'text-red-800'
  }
  return ''
}
