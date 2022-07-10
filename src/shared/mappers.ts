import { convertIntegerInFloatValue } from 'lib/masks';
import { formatDateTime } from 'lib/datetime';

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
    id: string
    name: string
    createdAt: string
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
    id: string;
    name: string;
    document?: string;
    website?: string;
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

export interface ProcedureEntity {
    id: string;
    tuss_remuneration_name: string;
    provider_name: string;
    provider_social_name: string;
    provider_cnpj: string;
    address_street: string | null;
    street_number: string | null;
    zip_code: string | null;
    complementary: string | null;
    city: string | null;
    state: string | null;
    initials: string | null;
    total: string | null;
}

export interface ProcedureMapped {
    id: string;
    tussRemunerationName: string;
    providerName: string;
    providerSocialName: string;
    providerCnpj: string;
    addressStreet: string | null;
    streetNumber: string | null;
    zipCode: string | null;
    complementary: string | null;
    city: string | null;
    state: string | null;
    initials: string | null;
    total: string | null;
}

export type SupplierMapped = {
    id: string;
    name: string;
    document?: string;
    website?: string;
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

export interface PersonalDetailEntity {
    id: string
    name: string
    birthday: string
    cpf: string
    rg: string
    ssp: any
    email: string
    address: string
    zip_code: string
    neighborhood: string
    complement: any
    number: string
    lat: string
    lng: string
    city_id: number
    city: CityOption
    phone_number: string
    mobile_number: string
    business_number: string
    website: string
    nationality: string
    naturalness: string
    profession: string
    civil_state: string
    civilState: CivilStateOption
    gender: GenderOption
    type: string
    created_at: string
}

export interface PersonalDetailMapped {
    id: string
    name: string
    birthday: string
    cpf: string
    rg: string
    ssp: any
    email: string
    address: string
    zipCode: string
    neighborhood: string
    complement: any
    number: string
    lat: string
    lng: string
    cityId: number
    city: CityOption
    phoneNumber: string
    mobileNumber: string
    businessNumber: string
    website: string
    nationality: string
    naturalness: string
    profession: string
    civilState: CivilStateOption
    gender: GenderOption
    type: string
    createdAt: string
}

export interface CityOption {
    label: string
    value: number
}

export interface CivilStateOption {
    value: string
    label: string
}

export interface GenderOption {
    label: string
    value: string
}

export interface UserEntity {
    id: string
    name: string
    email: string
    lgpd_verified: boolean
    email_verified: boolean
    phone_number: string
    phone_number_verified: boolean
    created_at: string
    updated_at: string
    is_admin: boolean
    is_seller: boolean
    is_contractor: boolean
    is_beneficiary: boolean
    is_supplier: boolean
    is_nurse: boolean
    is_specialist: boolean
    is_urgency: boolean
    roles: RoleEntity[]
    register_mail_sent_at: any
    personalDetail: PersonalDetailEntity
}

export type UserMapped = {
    createdAt: string;
    email: string;
    phoneNumber: string;
    lgpdVerified: boolean;
    emailVerified: boolean;
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

export type ProviderEntity = {
    id: string;
    contract_attachment_id: any;
    social_name: string;
    fantasy_name: string;
    cnpj: string;
    cnes: string;
    state_number: string;
    address_id: any;
    assigned_at: string;
    started_at: string;
    responsible_name: string;
    financial_email: any;
    financial_phone: string;
    commercial_email: string;
    commercial_phone: string;
    contract_type: string;
    bank_id: any;
    bank_account: string;
    bank_agency: string;
    user_id: any;
    created_at: string;
    updated_at: string;
    deleted_at: any;
    observations: any;
    attachments: any[];
    contractAttachment: any;
    address: any;
    bank: any;
    serviceTypes: any[];
    assistanceTypes: any[];
};

export type ProviderMapped = {
    id: string;
    contractAttachmentId: any;
    socialName: string;
    fantasyName: string;
    cnpj: string;
    cnes: string;
    stateNumber: string;
    addressId: any;
    assignedAt: string;
    startedAt: string;
    responsibleName: string;
    financialEmail: any;
    financialPhone: string;
    commercialEmail: string;
    commercialPhone: string;
    contractType: string;
    bankId: any;
    bankAccount: string;
    bankAgency: string;
    userId: any;
    createdAt: string;
    updatedAt: string;
    deletedAt: any;
    observations: any;
    attachments: any[];
    contractAttachment: any;
    address: any;
    bank: any;
    serviceTypes: any[];
    assistanceTypes: any[];
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
    return undefined;
  }

  return {
    id: tariff.id,
    name: tariff.name,
    createdAt: formatDateTime(tariff.created_at),
    updatedAt: formatDateTime(tariff.updated_at),
  } as TariffMapped;
};

export const rolesMapper = (roles?: RoleEntity[]): RoleMapped[] | [] => {
  if (!roles) {
    return [];
  }
  return roles.map((role) => ({
    createdAt: formatDateTime(role.created_at),
    deletedAt: formatDateTime(role.deleted_at),
    id: role.id,
    name: role.name,
    updatedAt: formatDateTime(role.updated_at),
  })) as RoleMapped[];
};

export const addressMapper = (address?: AddressEntity): AddressMapped | undefined => {
  if (!address) {
    return undefined;
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
    register: address.register,
  } as AddressMapped;
};

export const userMapper = (user: UserEntity): UserMapped | undefined => {
  if (!user) {
    return undefined;
  }

  return {
    createdAt: formatDateTime(user.created_at),
    email: user.email,
    emailVerified: user.email_verified,
    name: user.name,
    phoneNumber: user.phone_number,
    lgpdVerified: user.lgpd_verified,
    id: user.id,
    roles: rolesMapper(user.roles),
    updatedAt: formatDateTime(user.updated_at),
  } as UserMapped;
};

export interface ContractEntity {
    id: string
    name: string
    effective_date: string
    health_plan_cost: number
    status_id: string
    created_at: string
    updated_at: string
    deleted_at: any
    contract_number: any
    contract_url: any
    health_plan_cost_formatted: string
    health_plan_cost_total_formatted: string
    contractor_id: string
    already_assigned: boolean
    status_name: string
    status_color: string
}

export interface ContractMapped {
    id: string
    name: string
    effectiveDate: string
    healthPlanCost: number
    statusId: string
    createdAt: string
    updatedAt: string
    deletedAt: any
    contractNumber: any
    contractUrl: any
    healthPlanCostFormatted: string
    healthPlanCostTotalFormatted: string
    contractorId: string
    alreadyAssigned: boolean
    statusName: string
    status_color: string
}

export const providerMapper = (provider: ProviderEntity): ProviderMapped | undefined => {
  if (!provider) {
    return undefined;
  }

  return {
    id: provider.id,
    contractAttachmentId: provider.contract_attachment_id,
    socialName: provider.social_name,
    fantasyName: provider.fantasy_name,
    cnpj: provider.cnpj,
    cnes: provider.cnes,
    stateNumber: provider.state_number,
    addressId: provider.address_id,
    assignedAt: provider.assigned_at,
    startedAt: provider.started_at,
    responsibleName: provider.responsible_name,
    financialEmail: provider.financial_email,
    financialPhone: provider.financial_phone,
    commercialEmail: provider.commercial_email,
    commercialPhone: provider.commercial_phone,
    contractType: provider.contract_type,
    bankId: provider.bank_id,
    bankAccount: provider.bank_account,
    bankAgency: provider.bank_agency,
    userId: provider.user_id,
    createdAt: provider.created_at,
    updatedAt: provider.updated_at,
    deletedAt: provider.deleted_at,
    observations: provider.observations,
    attachments: provider.attachments,
    contractAttachment: provider.contractAttachment,
    address: provider.address,
    bank: provider.bank,
    serviceTypes: provider.serviceTypes,
    assistanceTypes: provider.assistanceTypes,
  } as ProviderMapped;
};

export const visitMapper = (visit: VisitEntity): VisitMapped | undefined => {
  if (!visit) {
    return undefined;
  }

  return {
    id: visit.id,
    saleId: visit.sale_id,
    visitStatus: visit.visit_status,
    observation: visit.observation,
    createdAt: visit.created_at,
    updatedAt: visit.updated_at,
    deletedAt: visit.deleted_at,
  } as VisitMapped;
};

export const sellerMapper = (seller?: SellerEntity): SellerMapped | undefined => {
  if (!seller) {
    return undefined;
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
    inactivate: !!seller.deleted_at,
  } as SellerMapped;
};

export const contactsMapper = (contacts?: ContactEntity[]): ContactMapped[] | [] => {
  if (!contacts) {
    return [];
  }
  return contacts.map((contact) => ({
    id: contact.id,
    phone: contact.phone,
    email: contact.email,
    emailType: contact.email_type,
  })) as ContactMapped[];
};

export const supplierMapper = (supplier?: SupplierEntity): SupplierMapped | undefined => {
  if (!supplier) {
    return undefined;
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
    id: supplier.id,
  } as SupplierMapped;
};

export const supplierCustomerMapper = (supplierCustomer: SupplierCustomerEntity): SupplierCustomerMapped | undefined => {
  if (!supplierCustomer) {
    return undefined;
  }

  return {
    supplierId: supplierCustomer.supplier_id,
    customerId: supplierCustomer.customer_id,
    code: supplierCustomer.code,
    createdAt: supplierCustomer.created_at,
    updatedAt: supplierCustomer.updated_at,
    supplier: supplierMapper(supplierCustomer.supplier),
  } as SupplierCustomerMapped;
};

export const customerBranchMapper = (customerBranch: CustomerBranchEntity): CustomerBranchMapped => ({
  id: customerBranch.id,
  activitySectorId: customerBranch.activity_sector_id,
  tariffId: customerBranch.tariff_id,
  address: addressMapper(customerBranch.address),
  // // eslint-disable-next-line @typescript-eslint/no-use-before-define
  customerName: customerBranch.customer_name,
  contacts: contactsMapper(customerBranch.contacts),
  customerId: customerBranch.customer_id,
  taxAddress: customerBranch.tax_address,
  sellers: customerBranch.sellers?.map((seller) => sellerMapper(seller)),
} as CustomerBranchMapped);

export const customerMapper = (customer?: CustomerEntity): CustomerMapped | undefined => {
  if (!customer) {
    return undefined;
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
    deletedAt: formatDateTime(customer.deleted_at),
  } as CustomerMapped;
};

export const procedureMapper = (procedure?: ProcedureEntity): ProcedureMapped | undefined => {
  if (!procedure) {
    return undefined;
  }

  return {
    id: procedure.id,
    tussRemunerationName: procedure.tuss_remuneration_name,
    providerName: procedure.provider_name,
    providerSocialName: procedure.provider_social_name,
    providerCnpj: procedure.provider_cnpj,
    addressStreet: procedure.address_street,
    streetNumber: procedure.street_number,
    zipCode: procedure.zip_code,
    complementary: procedure.complementary,
    city: procedure.city,
    state: procedure.state,
    initials: procedure.initials,
    total: procedure.total,
  } as ProcedureMapped;
};

export const customerBranchesMapper = (customerBranches?: CustomerBranchEntity[]): CustomerBranchMapped[] | [] => {
  if (!customerBranches) {
    return [];
  }
  return customerBranches.map((customerBranch) => customerBranchMapper(customerBranch));
};

const snakingCase = (s: string) => s.split(/(?=[A-Z])/).join('_').toLowerCase();

export const revertMapping = (payload: any): any => {
  if (typeof payload !== 'object') {
    return payload;
  }
  for (const k in payload) {
    if (typeof payload[k] === 'object') {
      payload[k] = revertMapping(payload[k]);
    }
    const newK = snakingCase(k);
    payload[newK] = payload[k];
    if (newK !== k) {
      delete payload[k];
    }
  }

  return payload;
};

export const emailContentDefaultValue = `
<p>Buenas tardes, </p><p><br></p><p>Adjunto cheque del cliente:</p><p><br></p><p><br></p><p>Saludos</p>
`;

export const emailSubjectDefaultValue = `
'Comunicación de cobro'
`;

export const saleMapper = (sale: SaleEntity): SaleMapped => ({
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
  visits: sale.visits?.map((visit: VisitEntity) => visitMapper(visit)),
} as SaleMapped);

export const personalDetailMapper = (personalDetail: PersonalDetailEntity): PersonalDetailMapped => ({
  id: personalDetail.id,
  name: personalDetail.name,
  birthday: personalDetail.birthday,
  cpf: personalDetail.cpf,
  rg: personalDetail.rg,
  ssp: personalDetail.ssp,
  email: personalDetail.email,
  address: personalDetail.address,
  zipCode: personalDetail.zip_code,
  neighborhood: personalDetail.neighborhood,
  complement: personalDetail.complement,
  number: personalDetail.number,
  lat: personalDetail.lat,
  lng: personalDetail.lng,
  cityId: personalDetail.city_id,
  city: personalDetail.city,
  phoneNumber: personalDetail.phone_number,
  mobileNumber: personalDetail.mobile_number,
  businessNumber: personalDetail.business_number,
  website: personalDetail.website,
  nationality: personalDetail.nationality,
  naturalness: personalDetail.naturalness,
  profession: personalDetail.profession,
  civilState: personalDetail.civilState,
  gender: personalDetail.gender,
  type: personalDetail.type,
  createdAt: personalDetail.created_at,
} as PersonalDetailMapped);

export const beneficiaryMapper = (beneficiary: BeneficiaryEntity): BeneficiaryMapped => ({
  id: beneficiary.id,
  personalDetailId: beneficiary.personal_detail_id,
  beneficiaryId: beneficiary.beneficiary_id,
  mothersName: beneficiary.mothers_name,
  beneficiaryNumber: beneficiary.beneficiary_number,
  bloodType: beneficiary.blood_type,
  contractorId: beneficiary.contractor_id,
  createdAt: beneficiary.created_at,
  statusId: beneficiary.status_id,
  statusName: beneficiary.status_name,
  statusColor: beneficiary.status_color,
  notes: beneficiary.notes,
  personalDetail: personalDetailMapper(beneficiary.personalDetail),
  dependents: beneficiary.dependents,
  degreeOfKinship: beneficiary.degreeOfKinship,
  beneficiaryAttachment: beneficiary.beneficiaryAttachment,
  lgpdAssigned: beneficiary.lgpd_assigned,
  lgpdAssignedAt: beneficiary.lgpd_assigned_at,
} as BeneficiaryMapped);

export interface DegreeOfKinshipOption {
    value: string
    label: string
}

export interface BeneficiaryEntity {
    id: string
    personal_detail_id: string
    beneficiary_id: any
    mothers_name: string
    beneficiary_number: string
    degree_of_kinship: string
    blood_type: string
    contractor_id: string
    created_at: string
    lgpd_assigned_at: string
    status_id: string
    status_name: string
    status_color: string
    notes: any[]
    personalDetail: PersonalDetailEntity
    dependents: number
    degreeOfKinship: DegreeOfKinshipOption
    beneficiaryAttachment: any
    lgpd_assigned: boolean
}

export interface BeneficiaryMapped {
    id: string
    personalDetailId: string
    beneficiaryId: any
    mothersName: string
    beneficiaryNumber: string
    bloodType: string
    contractorId: string
    lgpdAssignedAt: string
    createdAt: string
    statusId: string
    statusName: string
    statusColor: string
    notes: any[]
    personalDetail: PersonalDetailMapped
    dependents: number
    degreeOfKinship: DegreeOfKinshipOption
    beneficiaryAttachment: any
    lgpdAssigned: boolean
}

export interface ContractorEntity {
    id: string
    social_name: string
    fantasy_name: string
    cnpj: string
    cpf: string
    state_number: string
    municipality_number: string
    personal_detail_id: string
    contractor_type: string
    user_id: string
    status_id: string
    status_name: string
    status_color: string
    created_at: string
    personalDetail: PersonalDetailEntity
    beneficiaries: number
    health_plan_cost_formatted: string
    health_plan_cost_total_formatted: string
    contractorAttachment: any
    billing_address_id: string
    company_address_id: any
    billingAddress: BillingAddressEntity
    companyAddress: any
}

export interface ContractorMapped {
    id: string
    socialName: string
    fantasyName: string
    cnpj: string
    cpf: string
    stateNumber: string
    municipalityNumber: string
    personalDetailId: string
    contractorType: string
    userId: string
    statusId: string
    statusName: string
    statusColor: string
    createdAt: string
    personalDetail: PersonalDetailMapped
    beneficiaries: number
    healthPlanCostFormatted: string
    healthPlanCostTotalFormatted: string
    contractorAttachment: any
    billingAddressId: string
    companyAddressId: any
    billingAddress: BillingAddressMapped
    companyAddress: any
}

export interface BillingAddressEntity {
    id: string
    country: string
    street: string
    street_number: string
    neighborhood: string
    complementary: string
    zip_code: string
    type: string
    city_id: number
    city: CityOption
}

export interface BillingAddressMapped {
    id: string
    country: string
    street: string
    streetNumber: string
    neighborhood: string
    complementary: string
    zipCode: string
    type: string
    cityId: number
    city: CityOption
}
