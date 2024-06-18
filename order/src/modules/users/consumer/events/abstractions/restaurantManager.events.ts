import IRestaurantManagerRepository from '@src/modules/users/repositories/interfaces/IRestaurantManagerRepository';
import IUserRepositoryFactory from '@src/modules/users/repositories/factories/interfaces/IUserRepositoryFactory';
import KafkaConsumerBaseEvent from '@src/kafka/consumer/events/KafkaConsumerBaseEvent';
import { restaurantManagerCreatedValidator } from '../../validators/restaurantManager.validators';


export abstract class RestaurantManagerCreatedBaseEvent extends KafkaConsumerBaseEvent {
    protected restaurantManagerRepository: IRestaurantManagerRepository

    constructor(
        data: object,
        protected userRepositoryFactory: IUserRepositoryFactory
    ) {
        super(data)
        this.restaurantManagerRepository = userRepositoryFactory.createRestaurantManagerRepository()
    }

    public async action(): Promise<void> {
        const restaurantManagerData = restaurantManagerCreatedValidator.parse(this.data)
        await this.restaurantManagerRepository.create(restaurantManagerData)
    }

    public static getEventName(): string {
        return "RestaurantManagerCreatedEvent"
    }
}
