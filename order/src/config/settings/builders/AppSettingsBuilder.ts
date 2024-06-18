import EnvManager from "@src/config/EnvManager";
import { MenuItemCreatedPrismaEvent, MenuItemUpdatedPrismaEvent, MenuItemDeletedPrismaEvent } from "@src/modules/menu/consumer/events/prisma/menuItem.events";
import { OrderFinishedEvent } from "@src/modules/orders/producer/events/order.events";
import { orderFinishedToReviewValidator } from "@src/modules/orders/producer/validators/order.validators";
import { RestaurantCreatedPrismaEvent, RestaurantUpdatedPrismaEvent } from "@src/modules/restaurants/consumer/events/prisma/restaurant.events";
import { WorkingHoursCreatedPrismaEvent, WorkingHoursUpdatedPrismaEvent, WorkingHoursDeletedPrismaEvent } from "@src/modules/restaurants/consumer/events/prisma/workingHours.events";
import { CourierCreatedPrismaEvent } from "@src/modules/users/consumer/events/prisma/courier.events";
import { CustomerCreatedPrismaEvent } from "@src/modules/users/consumer/events/prisma/customer.events";
import { ModeratorCreatedPrismaEvent } from "@src/modules/users/consumer/events/prisma/moderator.events";
import { RestaurantManagerCreatedPrismaEvent } from "@src/modules/users/consumer/events/prisma/restaurantManager.events";
import AppSettings from "../AppSettings";
import ISettingsBuilder from "./ISettingsBuilder";

export class AppSettingsBuilder implements ISettingsBuilder {

    public build(): AppSettings {
        return new AppSettings({
            "kafkaBootstrapServerHost": EnvManager.getVariable("KAFKA_BOOTSTRAP_SERVER_HOST"),
            "kafkaBootstrapServerPort": Number(EnvManager.getVariable("KAFKA_BOOTSTRAP_SERVER_PORT")),
            "kafkaBrokerUser": EnvManager.getVariable("KAFKA_BROKER_USER"),
            "kafkaBrokerPassword": EnvManager.getVariable("KAFKA_BROKER_PASSWORD"),
            "kafkaGroupConsumersCount": 1,
            "kafkaConsumerTopicsEvents": [
                {
                    topicName: "user_order",
                    events: [CustomerCreatedPrismaEvent, CourierCreatedPrismaEvent, ModeratorCreatedPrismaEvent, RestaurantManagerCreatedPrismaEvent]
                },
                {
                    topicName: "menu_order",
                    events: [MenuItemCreatedPrismaEvent, MenuItemUpdatedPrismaEvent, MenuItemDeletedPrismaEvent]
                },
                {
                    topicName: "restaurant_order",
                    events: [RestaurantCreatedPrismaEvent, RestaurantUpdatedPrismaEvent, WorkingHoursCreatedPrismaEvent, WorkingHoursUpdatedPrismaEvent, WorkingHoursDeletedPrismaEvent]
                },
            ],
            "kafkaProducerEventsTopics": [
                {
                    Event: OrderFinishedEvent,
                    topicsValidators: [
                        {
                            topic: "order_review",
                            validator: orderFinishedToReviewValidator
                        }
                    ]
                }
            ],
            "bingApiKey": EnvManager.getVariable("BING_API_KEY"),
            "stripeSecretKey": EnvManager.getVariable("STRIPE_SECRET_KEY"),
        })
    }
}