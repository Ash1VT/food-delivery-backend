import { idValidator } from '@src/core/validators/idValidator';
import KafkaBaseEvent from "@src/kafka/consumer/events/KafkaBaseEvent";
import IUserServiceFactory from "../../../services/factories/interfaces/IUserServiceFactory";
import IRestaurantManagerService from "@src/modules/users/services/interfaces/IRestaurantManagerService";
import { restaurantManagerCreateValidator } from "@src/modules/users/validators/restaurantManager.validators";


export abstract class RestaurantManagerCreatedBaseEvent extends KafkaBaseEvent {
    protected restaurantManagerService: IRestaurantManagerService

    constructor(
        data: object,
        protected userServiceFactory: IUserServiceFactory
    ) {
        super(data)
        this.restaurantManagerService = userServiceFactory.createRestaurantManagerService()
    }

    public async action(): Promise<void> {
        const restaurantManagerData = restaurantManagerCreateValidator.parse(this.data)
        await this.restaurantManagerService.create(restaurantManagerData)
    }

    public static getEventName(): string {
        return "RestaurantManagerCreatedEvent"
    }
}
