import { ZodTypeAny } from "zod"

export type TopicValidator = {
    topic: string
    validator: ZodTypeAny
}

export default abstract class KafkaProducerBaseEvent {
    protected static topicsValidators: TopicValidator[] = []

    constructor(
        protected data: any
    ) {}

    public static extendTopicsValidators(topicsValidators: TopicValidator[]) {
        this.topicsValidators = [...this.topicsValidators, ...topicsValidators]
    }

    public static getTopics(): string[] {
        return this.topicsValidators.map(validator => validator.topic)
    }

    public getData(topic: string): object {
        return this.getClass().topicsValidators.find(validator => validator.topic === topic)?.validator.parse(this.data)
    }

    public static getEventName(): string {
        return this.name
    }

    public getClass(): typeof KafkaProducerBaseEvent {
        return KafkaProducerBaseEvent
    }
}