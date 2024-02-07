import { PromocodeGetOutputDTO, PromocodeCreateInputDTO, PromocodeCreateOutputDTO, PromocodeUpdateInputDTO, PromocodeUpdateOutputDTO } from "../../dto/promocode";

export default interface IPromocodeService {
    // getOne(promocodeId: number): Promise<PromocodeGetOutputDTO>
    // getOneByName(promocodeName: string): Promise<PromocodeGetOutputDTO>
    getRestaurantPromocodes(restaurantId: bigint): Promise<PromocodeGetOutputDTO[]>
    create(promocodeData: PromocodeCreateInputDTO): Promise<PromocodeCreateOutputDTO>
    update(promocodeId: bigint, promocodeData: PromocodeUpdateInputDTO): Promise<PromocodeUpdateOutputDTO>
    deactivate(promocodeId: bigint): Promise<void>
    activate(promocodeId: bigint): Promise<void>
}