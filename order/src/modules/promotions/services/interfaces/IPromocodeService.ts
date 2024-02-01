import { PromocodeGetOutputDTO, PromocodeCreateInputDTO, PromocodeCreateOutputDTO, PromocodeUpdateInputDTO, PromocodeUpdateOutputDTO } from "../../dto/promocode";

export default interface IPromocodeService {
    // getOne(promocodeId: number): Promise<PromocodeGetOutputDTO>
    // getOneByName(promocodeName: string): Promise<PromocodeGetOutputDTO>
    getRestaurantPromocodes(restaurantId: number): Promise<PromocodeGetOutputDTO[]>
    create(promocodeData: PromocodeCreateInputDTO): Promise<PromocodeCreateOutputDTO>
    update(promocodeId: number, promocodeData: PromocodeUpdateInputDTO): Promise<PromocodeUpdateOutputDTO>
    deactivate(promocodeId: number): Promise<void>
    activate(promocodeId: number): Promise<void>
}