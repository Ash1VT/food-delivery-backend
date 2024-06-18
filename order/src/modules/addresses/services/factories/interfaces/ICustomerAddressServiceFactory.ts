import ICustomerAddressService from "../../interfaces/ICustomerAddressService";

export default interface ICustomerAddressServiceFactory {
    createCustomerAddressService(): ICustomerAddressService
}