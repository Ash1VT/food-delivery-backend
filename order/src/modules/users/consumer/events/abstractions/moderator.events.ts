import KafkaBaseEvent from "@src/kafka/consumer/events/KafkaBaseEvent";
import IUserServiceFactory from "../../../services/factories/interfaces/IUserServiceFactory";
import IModeratorService from "@src/modules/users/services/interfaces/IModeratorService";
import { moderatorCreateValidator } from "@src/modules/users/validators/moderator.validators";


export abstract class ModeratorCreatedBaseEvent extends KafkaBaseEvent {
    protected moderatorService: IModeratorService

    constructor(
        data: object,
        protected userServiceFactory: IUserServiceFactory
    ) {
        super(data)
        this.moderatorService = userServiceFactory.createModeratorService()
    }

    public async action(): Promise<void> {
        const moderatorData = moderatorCreateValidator.parse(this.data)
        await this.moderatorService.create(moderatorData)
    }

    public static getEventName(): string {
        return "ModeratorCreatedEvent"
    }
}
