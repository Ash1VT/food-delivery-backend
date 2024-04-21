export default abstract class KafkaBaseEvent {

    constructor(
        protected data: object
    ) {}

    public abstract action(): Promise<void>

    public static getEventName(): string {
        return this.name
    }

}