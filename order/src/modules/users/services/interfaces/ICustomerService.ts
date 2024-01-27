import ICreateService from "@src/base/services/interfaces/ICreateService";
import IGetService from "@src/base/services/interfaces/IGetService";
import { CustomerGetOutputDTO, CustomerCreateInputDTO, CustomerCreateOutputDTO } from "../../dto/customer";

export default interface ICustomerService extends IGetService<CustomerGetOutputDTO>, ICreateService<CustomerCreateInputDTO, CustomerCreateOutputDTO> {}