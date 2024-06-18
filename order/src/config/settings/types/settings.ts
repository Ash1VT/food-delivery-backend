import KafkaConsumerBaseEvent from "@src/kafka/consumer/events/KafkaConsumerBaseEvent"
import KafkaProducerBaseEvent, { TopicValidator } from "@src/kafka/producer/events/KafkaProducerBaseEvent"

export interface KafkaConsumerEventConstructor {
    new (data: any): KafkaConsumerBaseEvent
    getEventName(): string
}

export interface KafkaProducerEventConstructor {
    new (data: any): KafkaProducerBaseEvent
    extendTopicsValidators(topicsValidators: TopicValidator[]): void
    getTopics(): string[]
    getEventName(): string
}

export type KafkaConsumerTopicEvent = {
    topicName: string
    events: KafkaConsumerEventConstructor[]
}

export type KafkaProducerEventTopics = {
    Event: KafkaProducerEventConstructor
    topicsValidators: TopicValidator[]
}


export type BaseSettingsOptions = {}

export type AppSettingsOptions = {
    kafkaBootstrapServerHost: string
    kafkaBootstrapServerPort: number
    kafkaBrokerUser: string
    kafkaBrokerPassword: string

    kafkaGroupConsumersCount: number
    kafkaConsumerTopicsEvents: KafkaConsumerTopicEvent[]
    kafkaProducerEventsTopics: KafkaProducerEventTopics[]

    bingApiKey: string
    stripeSecretKey: string
} & BaseSettingsOptions

export type ServerSettingsOptions = {
    pgHost: string
    pgPort: string
    pgDatabase: string
    pgUser: string
    pgPassword: string
    databaseURL: string
    appHost: string
    appPort: number
    rolesGrpcServerHost: string
    rolesGrpcServerPort: number
    grayLogHost: string
    grayLogUdpPort: number
} & BaseSettingsOptions