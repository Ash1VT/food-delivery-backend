import ICreateService from "@src/base/services/interfaces/ICreateService";
import IGetService from "@src/base/services/interfaces/IGetService";
import { PromocodeGetOutputDTO, PromocodeCreateInputDTO, PromocodeCreateOutputDTO, PromocodeUpdateInputDTO, PromocodeUpdateOutputDTO } from "../../dto/promocode";
import IUpdateService from "@src/base/services/interfaces/IUpdateService";

export default interface IPromocodeService extends IGetService<PromocodeGetOutputDTO>, ICreateService<PromocodeCreateInputDTO, PromocodeCreateOutputDTO>, 
                                                   IUpdateService<PromocodeUpdateInputDTO, PromocodeUpdateOutputDTO> {
    getOneByName(name: string): Promise<PromocodeGetOutputDTO>
    deactivate(id: number): Promise<undefined>
    activate(id: number): Promise<undefined>
}