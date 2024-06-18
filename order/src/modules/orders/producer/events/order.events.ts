import KafkaProducerBaseEvent from "@src/kafka/producer/events/KafkaProducerBaseEvent";

export class OrderFinishedEvent extends KafkaProducerBaseEvent {
    public getClass(): typeof KafkaProducerBaseEvent {
        return OrderFinishedEvent
    }

    public static getEventName(): string {
        return "OrderFinishedEvent";
    }
}