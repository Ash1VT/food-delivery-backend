import { CustomerAddressApprovalStatus } from "./customerAddressApprovalStatus.models"

export interface CustomerAddressModel {
    id: bigint
    country: string
    region: string
    details: string
    approvalStatus: CustomerAddressApprovalStatus
    customerId: bigint
}


export interface CustomerAddressCreateInput {
    id?: bigint
    country: string
    region: string
    details: string
    approvalStatus?: CustomerAddressApprovalStatus
    customerId: bigint
}


export interface CustomerAddressUpdateInput {
    id?: bigint
    country?: string
    region?: string
    details?: string
    approvalStatus?: CustomerAddressApprovalStatus
    customerId?: bigint
}