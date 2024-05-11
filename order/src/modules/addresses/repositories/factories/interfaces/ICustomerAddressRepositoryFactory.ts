import ICustomerAddressRepository from "../../interfaces/ICustomerAddressRepository";

export default interface ICustomerAddressRepositoryFactory {
    createCustomerAddressRepository(): ICustomerAddressRepository;
}
