import KafkaBaseEvent from "@src/kafka/consumer/events/KafkaBaseEvent"
import IUserServiceFactory from "@src/modules/users/services/factories/interfaces/IUserServiceFactory"
import ICourierService from "@src/modules/users/services/interfaces/ICourierService"
import { courierCreateValidator } from "@src/modules/users/validators/courier.validators"

export abstract class CourierCreatedBaseEvent extends KafkaBaseEvent {
    protected courierService: ICourierService

    constructor(
        data: object,
        protected userServiceFactory: IUserServiceFactory
    ) {
        super(data)
        this.courierService = userServiceFactory.createCourierService()
    }

    public async action(): Promise<void> {
        const courierData = courierCreateValidator.parse(this.data)
        await this.courierService.create(courierData)
    }

    public static getEventName(): string {
        return "CourierCreatedEvent"
    }
}
