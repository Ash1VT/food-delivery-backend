import { idValidator } from "@src/core/validators/idValidator"
import KafkaBaseEvent from "@src/kafka/consumer/events/KafkaBaseEvent"
import IRestaurantServiceFactory from "@src/modules/restaurants/services/factories/interfaces/IRestaurantServiceFactory"
import IRestaurantService from "@src/modules/restaurants/services/interfaces/IRestaurantService"
import { restaurantCreateValidator, restaurantUpdateValidator } from "@src/modules/restaurants/validators/restaurant.validators"

export abstract class RestaurantCreatedBaseEvent extends KafkaBaseEvent {
    protected restaurantService: IRestaurantService

    constructor(
        data: object,
        protected restaurantServiceFactory: IRestaurantServiceFactory
    ) {
        super(data)
        this.restaurantService = restaurantServiceFactory.createRestaurantService()
    }

    public async action(): Promise<void> {
        const restaurantData = restaurantCreateValidator.parse(this.data)
        await this.restaurantService.create(restaurantData)
    }

    public static getEventName(): string {
        return "RestaurantCreatedEvent"
    }
}


export abstract class RestaurantUpdatedBaseEvent extends KafkaBaseEvent {
    protected restaurantService: IRestaurantService

    constructor(
        data: object,
        protected restaurantServiceFactory: IRestaurantServiceFactory
    ) {
        super(data)
        this.restaurantService = restaurantServiceFactory.createRestaurantService()
    }

    public async action(): Promise<void> {
        const data = this.data as {id: bigint}
        const restaurantId = idValidator.parse(data.id)

        const restaurantData = restaurantUpdateValidator.parse(data)
        await this.restaurantService.update(restaurantId, restaurantData)
    }

    public static getEventName(): string {
        return "RestaurantUpdatedEvent"
    }
}
