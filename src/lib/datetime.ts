import { format } from 'date-fns'

export const formatDateTime = (date?: string) => {
  if (date) {
    return format(new Date(date), 'dd/MM/yyyy HH:mm')
  }

  return null
}

export const formatDate = (date?: string) => {
  if (date) {
    return format(new Date(date), 'dd/MM/yyyy')
  }

  return null
}

export const HUMANIZED_DATE_FORMAT = 'dd/MM/yyyy'
export const SYSTEM_DATE_FORMAT = 'yyyy-MM-dd'
