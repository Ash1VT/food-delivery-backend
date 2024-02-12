import { PromocodeGetOutputDto, PromocodeCreateInputDto, PromocodeCreateOutputDto, PromocodeUpdateInputDto, PromocodeUpdateOutputDto } from "../../dto/promocode.dto";

export default interface IPromocodeService {
    // getOne(promocodeId: number): Promise<PromocodeGetOutputDTO>
    // getOneByName(promocodeName: string): Promise<PromocodeGetOutputDTO>
    getRestaurantPromocodes(restaurantId: bigint): Promise<PromocodeGetOutputDto[]>
    create(promocodeData: PromocodeCreateInputDto): Promise<PromocodeCreateOutputDto>
    update(promocodeId: bigint, promocodeData: PromocodeUpdateInputDto): Promise<PromocodeUpdateOutputDto>
    deactivate(promocodeId: bigint): Promise<void>
    activate(promocodeId: bigint): Promise<void>
}