import { Settings } from "@src/config/Settings";
import { kafkaProducerBuilder } from "@src/config/kafka";
import KafkaPublisher from "@src/kafka/producer/publishers/KafkaPublisher";
import getLogger from "../logger";

const logger = getLogger(module)

export const initProducerEventsTopics = (settings: Settings) => {
    settings.variables.kafkaProducerEventsTopics.forEach((kafkaProducerEventTopics) => {
        kafkaProducerEventTopics.Event.extendTopicsValidators(kafkaProducerEventTopics.topicsValidators)
    })
    logger.info("Kafka producer events topics initialized")
}

const kafkaProducer = kafkaProducerBuilder.build()
export const publisher = new KafkaPublisher(kafkaProducer)