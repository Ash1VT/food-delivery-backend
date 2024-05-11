export default abstract class KafkaConsumerBaseEvent {

    constructor(
        protected data: any
    ) {}

    public abstract action(): Promise<void>

    public static getEventName(): string {
        return this.name
    }

}