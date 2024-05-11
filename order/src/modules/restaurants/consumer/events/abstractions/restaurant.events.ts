import { idValidator } from "@src/core/validators/idValidator"
import KafkaConsumerBaseEvent from "@src/kafka/consumer/events/KafkaConsumerBaseEvent"
import IRestaurantRepositoryFactory from "@src/modules/restaurants/repositories/factories/interfaces/IRestaurantRepositoryFactory"
import IRestaurantRepository from "@src/modules/restaurants/repositories/interfaces/IRestaurantRepository"
import { restaurantCreatedValidator, restaurantUpdatedValidator } from "../../validators/restaurant.validators"

export abstract class RestaurantCreatedBaseEvent extends KafkaConsumerBaseEvent {
    protected restaurantRepository: IRestaurantRepository

    constructor(
        data: any,
        protected restaurantRepositoryFactory: IRestaurantRepositoryFactory
    ) {
        super(data)
        this.restaurantRepository = restaurantRepositoryFactory.createRestaurantRepository()
    }

    public async action(): Promise<void> {
        const restaurantData = restaurantCreatedValidator.parse(this.data)
        await this.restaurantRepository.create(restaurantData)
    }

    public static getEventName(): string {
        return "RestaurantCreatedEvent"
    }
}


export abstract class RestaurantUpdatedBaseEvent extends KafkaConsumerBaseEvent {
    protected restaurantRepository: IRestaurantRepository

    constructor(
        data: any,
        protected restaurantRepositoryFactory: IRestaurantRepositoryFactory
    ) {
        super(data)
        this.restaurantRepository = restaurantRepositoryFactory.createRestaurantRepository()
    }

    public async action(): Promise<void> {
        const {id: restaurantId, ...restaurantData} = restaurantUpdatedValidator.parse(this.data)
        await this.restaurantRepository.update(restaurantId, restaurantData)
    }

    public static getEventName(): string {
        return "RestaurantUpdatedEvent"
    }
}