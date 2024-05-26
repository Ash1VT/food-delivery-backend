import appSettings from "@src/core/setup/settings/appSettings"
import KafkaConsumerBuilder from "@src/kafka/consumer/builders/KafkaConsumerBuilder"
import KafkaProducerBuilder from "@src/kafka/producer/builders/KafkaProducerBuilder"
import { Kafka } from "kafkajs"


export const kafka = new Kafka({
    brokers: [`${appSettings.variables.kafkaBootstrapServerHost}:${appSettings.variables.kafkaBootstrapServerPort}`],
    sasl: {
        mechanism: "plain",
        username: appSettings.variables.kafkaBrokerUser,
        password: appSettings.variables.kafkaBrokerPassword
    }
})

export const kafkaConsumerBuilder = new KafkaConsumerBuilder(kafka)

export const kafkaProducerBuilder = new KafkaProducerBuilder(kafka)