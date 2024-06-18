import { Producer } from "kafkajs";
import KafkaProducerBaseEvent from "../events/KafkaProducerBaseEvent";
import getLogger from "@src/core/setup/logger";


const logger = getLogger(module)

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

            logger.info(`Event ${EventClass.getEventName()} sent to topic ${topic}`)

        }
    }

    public async connect(): Promise<void> {
        await this.kafkaProducer.connect()
    }
}