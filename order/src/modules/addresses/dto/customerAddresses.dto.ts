import { CustomerAddressApprovalStatus } from "../models/customerAddressApprovalStatus.models"

interface CustomerAddressesBaseDto {
    country: string
    region: string
    details: string
}

interface CustomerAddressBaseOutputDto extends CustomerAddressesBaseDto {
    id: string
    customerId: string
    approvalStatus: CustomerAddressApprovalStatus
}


export interface CustomerAddressGetOutputDto extends CustomerAddressBaseOutputDto {}

export interface CustomerAddressCreateInputDto extends CustomerAddressesBaseDto {}

export interface CustomerAddressCreateOutputDto extends CustomerAddressBaseOutputDto {}

export interface CustomerAddressUpdateInputDto extends CustomerAddressesBaseDto {}

export interface CustomerAddressUpdateOutputDto extends CustomerAddressBaseOutputDto {}