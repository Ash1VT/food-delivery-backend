import { Settings } from "@src/config/Settings";
import { kafkaProducerBuilder } from "@src/config/kafka";
import KafkaPublisher from "@src/kafka/producer/publishers/KafkaPublisher";

export const initProducerEventsTopics = (settings: Settings) => {
    settings.variables.kafkaProducerEventsTopics.forEach((kafkaProducerEventTopics) => {
        kafkaProducerEventTopics.Event.extendTopicsValidators(kafkaProducerEventTopics.topicsValidators)
    })
}

const kafkaProducer = kafkaProducerBuilder.build()
export const publisher = new KafkaPublisher(kafkaProducer)