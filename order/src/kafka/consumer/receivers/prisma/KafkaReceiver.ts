import { KafkaConsumerEventConstructor } from "@src/config/types/settings";
import getLogger from "@src/core/setup/logger";
import { Consumer } from "kafkajs";


const logger = getLogger(module)

export default class KafkaReceiver {
    
    constructor(
        protected consumer: Consumer,
        protected topic: string,
        protected consumerEventConstructors: KafkaConsumerEventConstructor[]
    ) {}


    public async subscribeConsumer() {
        await this.consumer.subscribe({ topic: this.topic, fromBeginning: true })
    }

    private getConsumerEvent(eventName: string): KafkaConsumerEventConstructor | undefined {
        return this.consumerEventConstructors.find(constructor => constructor.getEventName() === eventName)
    }


    public async run() {
        this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                
                const eventName = message.key?.toString()
                
                if (!eventName) {
                    logger.error(`Event name is empty`)
                    return
                }

                const consumerEventConstructor = this.getConsumerEvent(eventName)

                if (!consumerEventConstructor) {
                    logger.error(`Event with name=${eventName} not found`)
                    return
                }
                
                const data = JSON.parse(message.value?.toString() || '{}')
                
                if (!data) {
                    logger.error(`Event data is empty`)
                    return
                }

                const consumerEvent = new consumerEventConstructor(data)
                try {
                    await consumerEvent.action()
                }
                catch (error) {
                    logger.crit(`Critical error. ${error}`)
                }
            }
        })
    }
}