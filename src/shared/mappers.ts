import { convertIntegerInFloatValue } from 'lib/masks'
import { formatDateTime } from 'lib/datetime'

export interface Pagination<T> {
    data: Partial<T>
    links: Links
    meta: Meta
}

export interface Links {
    first: string
    last: string
    prev: any
    next: string
}

export interface Meta {
    current_page: number
    from: number
    last_page: number
    links: Link[]
    path: string
    per_page: number
    to: number
    total: number
}

export interface Link {
    url?: string
    label: string
    active: boolean
}

export interface SaleMapped {
    id: string;
    saleValue: string;
    soldAt: string;
    invoice: string;
    invoiceType: string;
    invoiceDate: string;
    expiresIn: string;
    paidAt: any;
    latePaymentMotive: string;
    checkAttachId: any;
    checkImageDescription: any;
    invoicedAmount: string;
    supplierId: string;
    customerBranchId: string;
    sellerId: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: any;
    billingObservation?: string | null;
    newFileUploaded?: boolean;
    customerBranch: CustomerBranchMapped;
    supplier: SupplierMapped;
    seller: SellerMapped;
    visits: VisitMapped[];
}

export interface CustomerEntity {
    id: string;
    internal_code: string;
    payment_conditions: string;
    name: string;
    document: string;
    email: string;
    score: any;
    created_at: string;
    updated_at: string;
    deleted_at: any;
    customer_branches: CustomerBranchEntity[];
    supplier_customers: SupplierCustomerEntity[];
    addresses: AddressEntity[];
    suppliers: SupplierEntity[];
}

export interface CustomerMapped {
    id: string;
    internalCode: string;
    paymentConditions: string;
    name: string;
    document: string;
    email: string;
    score: any;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    customerBranches: CustomerBranchMapped[];
    supplierCustomers: SupplierCustomerMapped[];
    suppliers: SupplierMapped[];
    addresses: AddressMapped[];
}

export interface CustomerBranchEntity {
    id: string;
    activity_sector_id: string;
    tariff_id: string;
    address: AddressEntity;
    contacts: ContactEntity[];
    customer_name: string;
    customer_id: string;
    created_at: string;
    updated_at: string;
    tax_address: boolean;
    sellers: SellerEntity[]
}

export interface SupplierCustomerEntity {
    supplier_id: string;
    customer_id: string;
    code: string;
    created_at: string;
    updated_at: string;
    supplier: SupplierEntity;
}

export interface SupplierCustomerMapped {
    supplierId: string
    customerId: string | null
    code: string | null
    createdAt: string
    updatedAt: string
    supplier: SupplierMapped
}

export interface TariffEntity {
    id: string
    name: string
    created_at: string
    updated_at: string
}

export interface ActivitySectorEntity {
    id: string
    name: string
}

export interface TariffMapped {
    id:string
    name:string
    createdAt:string
    updatedAt: string
}

export interface CustomerBranchMapped {
    id: string | number;
    activitySectorId: string;
    tariffId: string;
    address: AddressMapped;
    customerName: string;
    contacts: ContactMapped[];
    customerId: string;
    createdAt: string;
    updatedAt: string;
    taxAddress: boolean;
    sellers: SellerMapped[]
}

export type AddressEntity = {
    complement: string;
    country?: string;
    locale?: string;
    created_at?: string;
    deleted_at?: string;
    id: string;
    lat?: string;
    lng?: string;
    number?: string;
    postal_code?: string;
    street: string;
    register: any;
}

export type AddressMapped = {
    complement: string;
    country?: string;
    locale?: string;
    createdAt?: string;
    deletedAt?: string;
    id: string;
    lat?: string;
    lng?: string;
    number?: string;
    postalCode?: string;
    street: string;
    register: any;
}

export type ContactEntity = {
    id: string;
    phone: string;
    email: string;
    email_type: string;
    supplier_id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
};

export type ContactMapped = {
    id: string | number;
    phone: string;
    email: string;
    emailType: string;
    supplierId: string;
};

export type SupplierEntity = {
    id :string;
    name :string;
    document? :string;
    website? :string;
    contacts: ContactEntity[];
    address?: AddressEntity;
    address_id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
};

export interface SaleEntity {
    id: string;
    sale_value: number;
    sold_at: string;
    invoice: string;
    invoice_type: string;
    invoice_date: string;
    expires_in: string;
    paid_at: any;
    late_payment_motive: string;
    check_attach_id: any;
    check_image_description: any;
    invoiced_amount: number;
    supplier_id: string;
    customer_branch_id: string;
    seller_id: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: any;
    customer_branch: CustomerBranchEntity;
    supplier: SupplierEntity;
    seller: SellerEntity;
    visits: VisitEntity[];
}

export type SupplierMapped = {
    id :string;
    name :string;
    document? :string;
    website? :string;
    contacts: ContactMapped[];
    address: AddressMapped;
    createdAt: string;
    deletedAt: string;
};

export type VisitEntity = {
    id: string;
    sale_id: string;
    visit_status: string;
    observation: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
};

export type VisitMapped = {
    id: string;
    saleId: string;
    visitStatus: string;
    observation: string;
    createdAt: string;
};

export type RoleEntity = {
    created_at?: string;
    deleted_at?: string;
    id: string;
    name: string;
    updated_at?: string;
};

export type RoleMapped = {
    createdAt?: string;
    deletedAt?: string;
    id: string;
    name: string;
    updatedAt?: string;
};

export type UserEntity = {
    created_at: string;
    email: string;
    email_verified_at: string;
    name: string;
    roles: RoleEntity[];
    updated_at?: string;
    id: number | string;
}

export type UserMapped = {
    createdAt: string;
    email: string;
    emailVerifiedAt: string;
    name: string;
    id: string | number;
    roles: RoleMapped[];
    updatedAt: string;
}

export type SellerEntity = {
    address: AddressEntity,
    address_id: string;
    seller_id: string | null;
    created_at?: string;
    deleted_at?: string;
    document: string;
    id: string;
    phone: string;
    updated_at?: string;
    user: UserEntity;
    user_id: string;
};

export type SellerMapped = {
    address: AddressMapped,
    addressId: string;
    sellerId?: string;
    createdAt?: string;
    deletedAt?: string;
    document: string;
    id: string;
    phone: string;
    updatedAt?: string;
    user: UserMapped;
    userId: string;
    inactivate: boolean;
};

export const tariffMapper = (tariff?: TariffEntity): TariffMapped | undefined => {
  if (!tariff) {
    return undefined
  }

  return {
    id: tariff.id,
    name: tariff.name,
    createdAt: formatDateTime(tariff.created_at),
    updatedAt: formatDateTime(tariff.updated_at)
  } as TariffMapped
}

export const rolesMapper = (roles?: RoleEntity[]): RoleMapped[] | [] => {
  if (!roles) {
    return []
  }
  return roles.map((role) => {
    return {
      createdAt: formatDateTime(role.created_at),
      deletedAt: formatDateTime(role.deleted_at),
      id: role.id,
      name: role.name,
      updatedAt: formatDateTime(role.updated_at)
    }
  }) as RoleMapped[]
}

export const addressMapper = (address?: AddressEntity): AddressMapped | undefined => {
  if (!address) {
    return undefined
  }

  return {
    complement: address.complement,
    country: address.country,
    createdAt: formatDateTime(address.created_at),
    deletedAt: formatDateTime(address.deleted_at),
    id: address.id,
    lat: address.lat,
    lng: address.lng,
    number: address.number,
    postalCode: address.postal_code,
    street: address.street,
    register: address.register
  } as AddressMapped
}

export const userMapper = (user: UserEntity): UserMapped | undefined => {
  if (!user) {
    return undefined
  }

  return {
    createdAt: formatDateTime(user.created_at),
    email: user.email,
    emailVerifiedAt: formatDateTime(user.email_verified_at),
    name: user.name,
    id: user.id,
    roles: rolesMapper(user.roles),
    updatedAt: formatDateTime(user.updated_at)
  } as UserMapped
}

export const visitMapper = (visit: VisitEntity): VisitMapped | undefined => {
  if (!visit) {
    return undefined
  }

  return {
    id: visit.id,
    saleId: visit.sale_id,
    visitStatus: visit.visit_status,
    observation: visit.observation,
    createdAt: visit.created_at,
    updatedAt: visit.updated_at,
    deletedAt: visit.deleted_at
  } as VisitMapped
}

export const sellerMapper = (seller?: SellerEntity): SellerMapped | undefined => {
  if (!seller) {
    return undefined
  }

  return {
    address: addressMapper(seller.address),
    addressId: seller.address_id,
    createdAt: formatDateTime(seller.created_at),
    deletedAt: seller.deleted_at,
    document: seller.document,
    sellerId: seller.seller_id,
    id: seller.id,
    phone: seller.phone,
    updatedAt: formatDateTime(seller.updated_at),
    user: userMapper(seller.user),
    userId: seller.user_id,
    inactivate: !!seller.deleted_at
  } as SellerMapped
}

export const contactsMapper = (contacts?: ContactEntity[]): ContactMapped[] | [] => {
  if (!contacts) {
    return []
  }
  return contacts.map((contact) => {
    return {
      id: contact.id,
      phone: contact.phone,
      email: contact.email,
      emailType: contact.email_type
    }
  }) as ContactMapped[]
}

export const supplierMapper = (supplier?: SupplierEntity): SupplierMapped | undefined => {
  if (!supplier) {
    return undefined
  }

  return {
    address: addressMapper(supplier.address),
    addressId: supplier.address_id,
    name: supplier.name,
    contacts: contactsMapper(supplier.contacts),
    website: supplier.website,
    createdAt: formatDateTime(supplier.created_at),
    deletedAt: formatDateTime(supplier.deleted_at),
    document: supplier.document,
    id: supplier.id
  } as SupplierMapped
}

export const supplierCustomerMapper = (supplierCustomer: SupplierCustomerEntity): SupplierCustomerMapped | undefined => {
  if (!supplierCustomer) {
    return undefined
  }

  return {
    supplierId: supplierCustomer.supplier_id,
    customerId: supplierCustomer.customer_id,
    code: supplierCustomer.code,
    createdAt: supplierCustomer.created_at,
    updatedAt: supplierCustomer.updated_at,
    supplier: supplierMapper(supplierCustomer.supplier)
  } as SupplierCustomerMapped
}

export const customerBranchMapper = (customerBranch: CustomerBranchEntity): CustomerBranchMapped => {
  return {
    id: customerBranch.id,
    activitySectorId: customerBranch.activity_sector_id,
    tariffId: customerBranch.tariff_id,
    address: addressMapper(customerBranch.address),
    // // eslint-disable-next-line @typescript-eslint/no-use-before-define
    customerName: customerBranch.customer_name,
    contacts: contactsMapper(customerBranch.contacts),
    customerId: customerBranch.customer_id,
    taxAddress: customerBranch.tax_address,
    sellers: customerBranch.sellers?.map((seller) => sellerMapper(seller))
  } as CustomerBranchMapped
}

export const customerMapper = (customer?: CustomerEntity): CustomerMapped | undefined => {
  if (!customer) {
    return undefined
  }

  return {
    id: customer.id,
    internalCode: customer.internal_code,
    name: customer.name,
    document: customer.document,
    email: customer.email,
    score: customer.score,
    paymentConditions: customer.payment_conditions,
    supplierCustomers: customer.supplier_customers?.map((supplierCustomer) => supplierCustomerMapper(supplierCustomer)),
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    customerBranches: customerBranchesMapper(customer.customer_branches),
    suppliers: customer.suppliers?.map((supplier) => supplierMapper(supplier)),
    createdAt: formatDateTime(customer.created_at),
    updatedAt: formatDateTime(customer.updated_at),
    deletedAt: formatDateTime(customer.deleted_at)
  } as CustomerMapped
}

export const customerBranchesMapper = (customerBranches?: CustomerBranchEntity[]): CustomerBranchMapped[] | [] => {
  if (!customerBranches) {
    return []
  }
  return customerBranches.map((customerBranch) => customerBranchMapper(customerBranch))
}

const snakingCase = (s: string) => {
  return s.split(/(?=[A-Z])/).join('_').toLowerCase()
}

export const revertMapping = (payload: any): any => {
  if (typeof payload !== 'object') {
    return payload
  }
  for (const k in payload) {
    if (typeof payload[k] === 'object') {
      payload[k] = revertMapping(payload[k])
    }
    const newK = snakingCase(k)
    payload[newK] = payload[k]
    if (newK !== k) {
      delete payload[k]
    }
  }

  return payload
}

export const emailContentDefaultValue = `
<p>Buenas tardes, </p><p><br></p><p>Adjunto cheque del cliente:</p><p><br></p><p><br></p><p>Saludos</p>
`

export const emailSubjectDefaultValue = `
'Comunicación de cobro'
`

export const saleMapper = (sale: SaleEntity): SaleMapped => {
  return {
    id: sale.id,
    saleValue: convertIntegerInFloatValue(sale.sale_value),
    soldAt: sale.sold_at,
    invoice: sale.invoice,
    invoiceType: sale.invoice_type,
    invoiceDate: sale.invoice_date,
    expiresIn: sale.expires_in,
    paidAt: sale.paid_at,
    latePaymentMotive: sale.late_payment_motive,
    checkAttachId: sale.check_attach_id,
    checkImageDescription: sale.check_image_description,
    invoicedAmount: convertIntegerInFloatValue(sale.invoiced_amount),
    supplierId: sale.supplier_id,
    customerBranchId: sale.customer_branch_id,
    sellerId: sale.seller_id,
    userId: sale.user_id,
    createdAt: formatDateTime(sale.created_at),
    updatedAt: formatDateTime(sale.updated_at),
    deletedAt: formatDateTime(sale.deleted_at),
    customerBranch: sale.customer_branch.id ? customerBranchMapper(sale.customer_branch) : null,
    supplier: supplierMapper(sale.supplier),
    seller: sellerMapper(sale.seller),
    visits: sale.visits?.map((visit: VisitEntity) => visitMapper(visit))
  } as SaleMapped
}
