import { Producer } from "kafkajs";
import KafkaProducerBaseEvent from "../events/KafkaProducerBaseEvent";

export default class KafkaPublisher {

    constructor(
        protected kafkaProducer: Producer
    ) {}

    public async publish(event: KafkaProducerBaseEvent): Promise<void> {
        const EventClass = event.getClass()
        for (const topic of EventClass.getTopics()) {
            await this.kafkaProducer.send({
                topic,
                messages: [{
                    key: EventClass.getEventName(),
                    value: JSON.stringify(event.getData(topic))
                }]
            })
        }
    }
}