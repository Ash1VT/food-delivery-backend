import { Consumer, Kafka } from "kafkajs";

export default class KafkaConsumerBuilder {

    constructor(
        protected kafka: Kafka
    ) {}

    public build(groupId: string): Consumer {
        return this.kafka.consumer({
            groupId
        })
    }
    
}