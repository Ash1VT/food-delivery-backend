import { kafkaConsumerBuilder } from "@src/config/kafka";
import KafkaReceiver from "@src/kafka/consumer/receivers/prisma/KafkaReceiver";
import getLogger from "../logger";
import AppSettings from "@src/config/settings/AppSettings";

const logger = getLogger(module)

export async function runKafkaReceivers(settings: AppSettings) {
    Promise.all([
        settings.variables.kafkaConsumerTopicsEvents.forEach(async (kafkaConsumerTopicEvents) => {
            const topicName = kafkaConsumerTopicEvents.topicName
            const groupId = `${topicName}_group`
            try {
                for (let i = 0; i < settings.variables.kafkaGroupConsumersCount; i++) {
                    const kafkaConsumer = kafkaConsumerBuilder.build(groupId)
                    const kafkaReceiver = new KafkaReceiver(kafkaConsumer, topicName, kafkaConsumerTopicEvents.events)
                    await kafkaReceiver.subscribeConsumer()
                    await kafkaReceiver.run()
                }
                logger.info(`Kafka receivers launched`)
            }
            catch (error) {
                logger.error(`Kafka receivers don't launched. Error: ${error}`)
            }
        })
    ])
}