import KafkaConsumerBaseEvent from "@src/kafka/consumer/events/KafkaConsumerBaseEvent"
import IUserRepositoryFactory from "@src/modules/users/repositories/factories/interfaces/IUserRepositoryFactory"
import ICourierRepository from "@src/modules/users/repositories/interfaces/ICourierRepository"
import { courierCreatedValidator } from "../../validators/courier.validators"

export abstract class CourierCreatedBaseEvent extends KafkaConsumerBaseEvent {
    protected courierRepository: ICourierRepository

    constructor(
        data: any,
        protected userRepositoryFactory: IUserRepositoryFactory
    ) {
        super(data)
        this.courierRepository = userRepositoryFactory.createCourierRepository()
    }

    public async action(): Promise<void> {
        const courierData = courierCreatedValidator.parse(this.data)
        await this.courierRepository.create(courierData)
    }

    public static getEventName(): string {
        return "CourierCreatedEvent"
    }
}
