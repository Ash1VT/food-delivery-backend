import getSettings from "@src/core/utils/getSettings"
import KafkaConsumerBuilder from "@src/kafka/consumer/builders/KafkaConsumerBuilder"
import KafkaProducerBuilder from "@src/kafka/producer/builders/KafkaProducerBuilder"
import { Kafka } from "kafkajs"

const settings = getSettings()

export const kafka = new Kafka({
    brokers: [`${settings.variables.kafkaBootstrapServerHost}:${settings.variables.kafkaBootstrapServerPort}`],
    sasl: {
        mechanism: "plain",
        username: settings.variables.kafkaBrokerUser,
        password: settings.variables.kafkaBrokerPassword
    }
})

export const kafkaConsumerBuilder = new KafkaConsumerBuilder(kafka)

export const kafkaProducerBuilder = new KafkaProducerBuilder(kafka)