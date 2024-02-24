import { Kafka, Producer } from "kafkajs";

export default class KafkaProducerBuilder {

    constructor(
        protected kafka: Kafka
    ) {}

    public build(): Producer {
        return this.kafka.producer()
    }
}