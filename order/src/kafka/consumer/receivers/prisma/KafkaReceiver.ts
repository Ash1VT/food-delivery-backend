import { KafkaEventConstructor } from "@src/config/types/settings";
import { Consumer } from "kafkajs";

export default class KafkaReceiver {
    
    constructor(
        protected consumer: Consumer,
        protected topic: string,
        protected consumerEventConstructors: KafkaEventConstructor[]
    ) {}


    public async subscribeConsumer() {
        await this.consumer.subscribe({ topic: this.topic, fromBeginning: true })
    }

    private getConsumerEvent(eventName: string): KafkaEventConstructor | undefined {
        return this.consumerEventConstructors.find(constructor => constructor.getEventName() === eventName)
    }


    public async run() {
        this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                
                const eventName = message.key?.toString()
                
                if (!eventName) {
                    console.log("Error: No event name")
                    return
                }

                const consumerEventConstructor = this.getConsumerEvent(eventName)

                if (!consumerEventConstructor) {
                    console.log("Error: Unknown event")
                    return
                }
                
                const data = JSON.parse(message.value?.toString() || '{}')
                
                if (!data) {
                    console.log("Error: No data")
                    return
                }

                const consumerEvent = new consumerEventConstructor(data)
                try {
                    await consumerEvent.action()
                }
                catch (error) {
                    console.log("Critical error. This should never happen")
                    console.error(error)
                }
            }
        })
    }
}