import IModeratorRepository from "@src/modules/users/repositories/interfaces/IModeratorRepository";
import IUserRepositoryFactory from "@src/modules/users/repositories/factories/interfaces/IUserRepositoryFactory";
import KafkaConsumerBaseEvent from "@src/kafka/consumer/events/KafkaConsumerBaseEvent";
import { moderatorCreatedValidator } from "../../validators/moderator.validators";


export abstract class ModeratorCreatedBaseEvent extends KafkaConsumerBaseEvent {
    protected moderatorRepository: IModeratorRepository

    constructor(
        data: any,
        protected userRepositoryFactory: IUserRepositoryFactory
    ) {
        super(data)
        this.moderatorRepository = userRepositoryFactory.createModeratorRepository()
    }

    public async action(): Promise<void> {
        const moderatorData = moderatorCreatedValidator.parse(this.data)
        await this.moderatorRepository.create(moderatorData)
    }

    public static getEventName(): string {
        return "ModeratorCreatedEvent"
    }
}
