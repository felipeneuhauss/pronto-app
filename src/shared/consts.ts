import { ToastOptions } from 'react-toastify'

export const ROLE_ADMIN = 'b62cfc37-fe26-4fe9-9e8b-eecf05b5a9a7'
export const ROLE_SELLER = 'c8fc1868-49f1-4991-98fe-eec178b88b51'
export const ROLE_CONTRACTOR = 'cc8b181b-5bda-40c0-a95e-38d4a34682c2'
export const ROLE_BENEFICIARY = '94b9c9a3-2cd9-4241-8447-a097b92de1a6'
export const ROLE_DEPENDENT = 'd2a9edb4-cb9f-4d88-9d39-0e1951a8d7ac'
export const TOAST_DEFAULT_CONFIG: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  progress: undefined
}
