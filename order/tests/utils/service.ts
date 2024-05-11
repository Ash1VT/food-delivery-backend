import IBaseService from "@src/core/services/IBaseService";

export const resetService = async (service: IBaseService) => {
    service.customer = undefined
    service.courier = undefined
    service.moderator = undefined
    service.restaurantManager = undefined
}