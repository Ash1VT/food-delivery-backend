import KafkaBaseEvent from "@src/kafka/consumer/events/KafkaBaseEvent"

export interface KafkaEventConstructor {
    new (data: object): KafkaBaseEvent
    getEventName(): string
}

export type KafkaConsumerTopicEvent = {
    topicName: string
    events: KafkaEventConstructor[]
}


export type SettingsOptions = {
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

    kafkaBootstrapServerHost: string
    kafkaBootstrapServerPort: number
    kafkaBrokerUser: string
    kafkaBrokerPassword: string

    kafkaGroupConsumersCount: number
    kafkaConsumerTopicsEvents: KafkaConsumerTopicEvent[],
}