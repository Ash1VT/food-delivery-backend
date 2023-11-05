# Food Delivery Backend Service

**Food Delivery** is a huge backend service based on event-driven **Microservice** architecture 
designed to power a large-scale food delivery platform.


# Project Description

The **Food Delivery Backend Service** stands as a formidable 
technological infrastructure, driving the operations of a large-scale 
food delivery platform. Its event-driven microservice architecture, 
coupled with a rich feature set, ensures a seamless experience 
for all stakeholders in the food delivery ecosystem. 




# Key Features

1. **Event-Driven Microservice Architecture**:
The service is architected around a powerful event-driven paradigm, 
where various microservices communicate via events. 
This design choice facilitates seamless integration and ensures 
that different components of the platform can react to events in real-time, 
enabling a highly responsive and efficient system.

2. **Scalability and Performance**:
The service is engineered to meet the demands of a high-traffic 
food delivery platform. It leverages horizontal scalability, 
allowing it to handle a large volume of concurrent users, orders, 
and transactions. This ensures a smooth and uninterrupted experience 
for customers, restaurants, and delivery partners.

3. **Comprehensive Feature Set**:
The Food Delivery Backend Service encompasses a wide array of features essential 
for the operation of a food delivery platform. 
This includes user management, restaurant onboarding and management, 
order processing, delivery logistics, and more. 
Each feature is meticulously designed to provide a seamless and user-friendly experience.

4. **Secure Authentication and Authorization**:
A robust authentication and authorization system is integrated to 
safeguard user data and sensitive information. 
This ensures that only authenticated and authorized users have access 
to their respective accounts and functionalities within the platform.

# Microservices

Each microservice has its own documentation. You can get acquainted with it further.

1. [User Management Microservice](user-management). This Microservice stands for processes of authentication of users. 
2. [Menu Microservice](menu). This Microservice takes care of menu-related operations for **Restaurant Managers**.
3. [Restaurant Microservice](restaurant). This Microservice gives **Restaurant Managers** and **Moderators** ability to work with **Restaurants** data.

# Docker

You can use docker files in [Docker directory](docker) to launch Kafka broker.

Clone the repository to your local machine

```bash
  git clone https://github.com/Ash1VT/food-delivery-backend
```

Create an **".env"** file.

Your **env** file should look like this:
```
  ZOOKEEPER_SERVER_USERS=admin
  ZOOKEEPER_SERVER_PASSWORDS=admin
  ZOOKEEPER_CLIENT_USER=admin
  ZOOKEEPER_CLIENT_PASSWORD=admin
  KAFKA_CLIENT_USERS=user
  KAFKA_CLIENT_PASSWORDS=admin
  KAFKA_INTER_BROKER_USER=kafka
  KAFKA_INTER_BROKER_PASSWORD=12345
```

Navigate to the [Docker directory](docker)
```bash
  cd docker
```

Build Docker web app image (don't forget to provide path to your **env** file)
```bash
  docker compose --env-file=../.env build
```

Run Docker containers (don't forget to provide path to your **env** file)
```bash
  docker compose --env-file=../.env up -d
```

To run test containers use following command
```bash
  docker compose --env-file=../.env -f docker-compose.test.yaml up -d
```

# Future Features

1. **Order Management**. The future roadmap of the service includes an order management system. This is the main functionality of **Food Delivery Service**. 
It will give **Customers** easy way to make orders. 
**Couriers** will have an ability to take orders.
2. **Delivery Management**. To streamline the delivery process, the service will introduce a delivery management system. 
This system will optimize delivery routes,
and provide real-time tracking for both customers and delivery partners.
3. **Reviews and Ratings**. The addition of a reviews and ratings system will enable users to provide 
feedback on their food and delivery experiences.
Users can rate **Restaurants**, **Couriers**, and specific **Menu Items**, 
contributing to an enhanced platform reputation.
4. **Payment**. Integrate payment when creating **Orders** and **Restaurants**.
5. **Notifications**. Notifications play a vital role in keeping users informed and engaged. 
Future plans include a comprehensive notification system that covers order updates, 
promotions, delivery status, and personalized recommendations.
6. **Promotions**. To attract and retain users, the service will introduce a promotions engine. 
This engine will facilitate the creation and management 
of various promotions, discounts, and loyalty programs. 


# License

This project is provided with [MIT Licence](LICENSE).