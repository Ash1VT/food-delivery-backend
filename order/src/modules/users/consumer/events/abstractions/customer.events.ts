import KafkaBaseEvent from "@src/kafka/consumer/events/KafkaBaseEvent";
import IUserServiceFactory from "../../../services/factories/interfaces/IUserServiceFactory";
import ICustomerService from "../../../services/interfaces/ICustomerService";
import { customerCreateValidator } from "@src/modules/users/validators/customer.validators";

export abstract class CustomerCreatedBaseEvent extends KafkaBaseEvent {
    protected customerService: ICustomerService

    constructor(
        data: object,
        protected userServiceFactory: IUserServiceFactory
    ) {
        super(data)
        this.customerService = userServiceFactory.createCustomerService()
    }

    public async action(): Promise<void> {
        const customerData = customerCreateValidator.parse(this.data)
        await this.customerService.create(customerData)
    }

    public static getEventName(): string {
        return "CustomerCreatedEvent"
    }
}
