import { kafkaProducerBuilder } from "@src/config/kafka";
import KafkaPublisher from "@src/kafka/producer/publishers/KafkaPublisher";
import getLogger from "../logger";
import AppSettings from "@src/config/settings/AppSettings";

const logger = getLogger(module)

export const initProducerEventsTopics = (settings: AppSettings) => {
    settings.variables.kafkaProducerEventsTopics.forEach((kafkaProducerEventTopics) => {
        kafkaProducerEventTopics.Event.extendTopicsValidators(kafkaProducerEventTopics.topicsValidators)
    })
    logger.info("Kafka producer events topics initialized")
}

const kafkaProducer = kafkaProducerBuilder.build()
export const publisher = new KafkaPublisher(kafkaProducer)
publisher.connect()