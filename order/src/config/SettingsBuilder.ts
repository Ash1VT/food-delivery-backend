import { CustomerCreatedPrismaEvent } from "@src/modules/users/consumer/events/prisma/customer.events";
import EnvManager from "./EnvManager";
import { Settings } from "./Settings";
import { CourierCreatedPrismaEvent } from "@src/modules/users/consumer/events/prisma/courier.events";
import { ModeratorCreatedPrismaEvent } from "@src/modules/users/consumer/events/prisma/moderator.events";
import { RestaurantManagerCreatedPrismaEvent } from "@src/modules/users/consumer/events/prisma/restaurantManager.events";
import { MenuItemCreatedPrismaEvent, MenuItemDeletedPrismaEvent, MenuItemUpdatedPrismaEvent } from "@src/modules/menu/consumer/events/prisma/menuItem.events";
import { RestaurantCreatedPrismaEvent, RestaurantUpdatedPrismaEvent } from "@src/modules/restaurants/consumer/events/prisma/restaurant.events";
import { OrderFinishedEvent } from "@src/modules/orders/producer/events/order.events";
import { orderFinishedToReviewValidator } from "@src/modules/orders/producer/validators/order.validators";
import { WorkingHoursCreatedPrismaEvent, WorkingHoursDeletedPrismaEvent, WorkingHoursUpdatedPrismaEvent } from "@src/modules/restaurants/consumer/events/prisma/workingHours.events";

export abstract class BaseSettingsBuilder {
    public abstract build(): Settings;
}

export class SettingsBuilder extends BaseSettingsBuilder {

    public build(): Settings {
        return new Settings({
            "pgHost": EnvManager.getVariable("PG_HOST"), 
            "pgPort": EnvManager.getVariable("PG_PORT"), 
            "pgDatabase": EnvManager.getVariable("PG_DATABASE"),
            "pgUser": EnvManager.getVariable("PG_USER"), 
            "pgPassword": EnvManager.getVariable("PG_PASSWORD"),
            "databaseURL": EnvManager.getVariable("DATABASE_URL"),
            "appHost": EnvManager.getVariable("APP_HOST"),
            "appPort": Number.parseInt(EnvManager.getVariable("APP_PORT")),
            "rolesGrpcServerHost": EnvManager.getVariable("ROLES_GRPC_SERVER_HOST"),
            "rolesGrpcServerPort": Number(EnvManager.getVariable("ROLES_GRPC_SERVER_PORT")),
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
            "bingApiKey": EnvManager.getVariable("BING_API_KEY")
        })
    }
}
