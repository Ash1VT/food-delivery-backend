import KafkaConsumerBaseEvent from "@src/kafka/consumer/events/KafkaConsumerBaseEvent"
import IRestaurantRepositoryFactory from "@src/modules/restaurants/repositories/factories/interfaces/IRestaurantRepositoryFactory"
import { workingHoursCreatedValidator, workingHoursDeletedValidator, workingHoursUpdatedValidator } from "../../validators/workingHours.validatots"
import IWorkingHoursRepository from "@src/modules/restaurants/repositories/interfaces/IWorkingHoursRepository"

export abstract class WorkingHoursCreatedBaseEvent extends KafkaConsumerBaseEvent {
    protected workingHoursRepository: IWorkingHoursRepository

    constructor(
        data: any,
        protected restaurantRepositoryFactory: IRestaurantRepositoryFactory
    ) {
        super(data)
        this.workingHoursRepository = restaurantRepositoryFactory.createWorkingHoursRepository()
    }

    public async action(): Promise<void> {
        const workingHoursData = workingHoursCreatedValidator.parse(this.data)
        await this.workingHoursRepository.create(workingHoursData)
    }

    public static getEventName(): string {
        return "WorkingHoursCreatedEvent"
    }
}


export abstract class WorkingHoursUpdatedBaseEvent extends KafkaConsumerBaseEvent {
    protected workingHoursRepository: IWorkingHoursRepository

    constructor(
        data: any,
        protected restaurantRepositoryFactory: IRestaurantRepositoryFactory
    ) {
        super(data)
        this.workingHoursRepository = restaurantRepositoryFactory.createWorkingHoursRepository()
    }

    public async action(): Promise<void> {
        const { id: workingHoursId, ...workingHoursData } = workingHoursUpdatedValidator.parse(this.data)
        await this.workingHoursRepository.update(workingHoursId, workingHoursData)
    }

    public static getEventName(): string {
        return "WorkingHoursUpdatedEvent"
    }
}


export abstract class WorkingHoursDeletedBaseEvent extends KafkaConsumerBaseEvent {
    protected workingHoursRepository: IWorkingHoursRepository

    constructor(
        data: any,
        protected restaurantRepositoryFactory: IRestaurantRepositoryFactory
    ) {
        super(data)
        this.workingHoursRepository = restaurantRepositoryFactory.createWorkingHoursRepository()
    }

    public async action(): Promise<void> {
        const {id: workingHoursId } = workingHoursDeletedValidator.parse(this.data)
        await this.workingHoursRepository.delete(workingHoursId)
    }

    public static getEventName(): string {
        return "WorkingHoursDeletedEvent"
    }
}