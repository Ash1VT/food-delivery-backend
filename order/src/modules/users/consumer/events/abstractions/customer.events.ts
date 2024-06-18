import ICustomerRepository from "@src/modules/users/repositories/interfaces/ICustomerRepository";
import IUserRepositoryFactory from "@src/modules/users/repositories/factories/interfaces/IUserRepositoryFactory";
import KafkaConsumerBaseEvent from "@src/kafka/consumer/events/KafkaConsumerBaseEvent";
import { customerCreatedValidator } from "../../validators/customer.validators";

export abstract class CustomerCreatedBaseEvent extends KafkaConsumerBaseEvent {
    protected customerRepository: ICustomerRepository

    constructor(
        data: any,
        protected userRepositoryFactory: IUserRepositoryFactory
    ) {
        super(data)
        this.customerRepository = userRepositoryFactory.createCustomerRepository()
    }

    public async action(): Promise<void> {
        const customerData = customerCreatedValidator.parse(this.data)
        await this.customerRepository.create(customerData)
    }

    public static getEventName(): string {
        return "CustomerCreatedEvent"
    }
}
