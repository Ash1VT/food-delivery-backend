# User Management Microservice

This microservice is managing user registration and authentication. It is the most important microservice
in **Food Delivery System**, because all other microservices depends on its processes of authentication.

# Microservice Description
The **User Management Microservice** is a pivotal component of the **Food Delivery** system, 
designed to facilitate user registration and authentication processes 
using JWT tokens stored in cookies. 
This microservice is responsible for managing the user-related operations 
in the application, ensuring secure and role-based access for different types of users, 
namely Customers, Couriers, Restaurant Managers, and Moderators.

### Technologies used:

1. **JWT Tokens (JSON Web Tokens)**: JWT tokens are central to the user authentication and authorization process. 
They are used to securely encode user information and roles, 
allowing for stateless, efficient, and secure identity verification. 
The microservice both generates and validates these tokens for user sessions.
JWT tokens are located in Cookies.

2. **gRPC (Google Remote Procedure Call)**: The microservice utilizes gRPC server
as a communication protocol to give for other microservices seamless interaction 
with **User Management Microservice** for authentication.
gRPC provides a high-performance, 
language-agnostic framework for defining service interfaces and methods, 
ensuring efficient and standardized communication. More details at [GRPC](#grpc) section.

3. **Apache Kafka**: Kafka is utilized as a messaging system to enable real-time 
event-driven communication and data streaming between microservices 
within the application ecosystem. It can be employed for 
activities such as notifying other services about user 
registration events or changes in user roles. More details at [Kafka Events](#kafka-events) section.

4. **Django**: Django serves as the web framework for building 
the **User Management Microservice**. 
It provides a robust, high-level Python web development framework 
that simplifies the implementation of user-related features, 
user registration, and user profile management. Django provides one of the best 
ORM systems, so it fits ideally for this microservice.

5. **Django Rest Framework (DRF)**: Django Rest Framework is integrated 
into the microservice to create robust and secure RESTful APIs. 
It simplifies the process of developing and exposing APIs for user registration, 
authentication, and other user-related operations in a structured and scalable manner.
DRF provides high quality permission system for API views, so it makes a lot of tasks
connected with authentication of users with different roles much easier.

6. **PostgreSQL**: PostgreSQL is employed as the relational database 
management system to store user data, including user profiles, 
roles, and authentication-related information.

7. **Docker and Docker Compose**: Wrapping application in docker container makes 
deployment, scaling, and management more streamlined and efficient.

8. **Pytest**: Pytest is a Python testing framework used for unit testing and test automation. 
It allows the microservice to create and execute test cases to ensure the correctness of its functionality. 
This includes testing user registration, authentication, and authorization processes, as well as other core features.

9. **Logging**: Logging is crucial for monitoring and debugging the microservice. 
It is used to record system activities, errors, and security-related events.

# Key Features
1. **Role system**. The User Management Microservice incorporates a robust role-based access control system. 
This feature enables the assignment of distinct roles, such as Customer, Courier, Restaurant Manager, and Moderator, to users. 
Each role comes with specific permissions, ensuring that users have appropriate access to resources and functionalities 
based on their designated roles. This role system is integral to maintaining a secure and granular level of access control within the application.
2. **User registration with email verification**. User registration is a fundamental aspect of the microservice. 
Users can create accounts by providing their personal information, and 
to enhance security and prevent unauthorized access, the system includes an email verification process. 
After registration, users receive an email with a verification link, 
ensuring that the email address provided is valid and belongs to the user. 
3. **User authentication via JWT tokens in Cookies**. User authentication is handled using JSON Web Tokens (JWT), 
which are securely stored in cookies. Upon successful login, users receive a JWT token, 
which serves as their proof of identity and access rights. 
This token is embedded in a cookie for secure client-side storage and is used for subsequent interactions with the microservice. 
JWT tokens provide efficient and stateless authentication, enhancing the user experience while maintaining security.
4. **Producing events for other microservices**. The **User Management Microservice** plays a pivotal role 
in the event-driven architecture of the application. It can produce events to notify other microservices 
about user-related actions or events. For example, when a new user registers, the microservice can generate events 
to trigger actions in other components of the application, ensuring seamless integration and real-time updates 
across the system. More details at [Consumer](#consumer-events) section.
5. **Consuming events from other microservices**. In addition to producing events, 
the microservice can also consume events from other microservices. 
This bidirectional communication allows it to react to events from various parts of the application ecosystem. 
More details at [Producer](#producer-events) section.
6. **Good test coverage (>90%)**. The microservice boasts a test coverage of over 90%, 
signifying that a large portion of the code has been thoroughly tested using **Unit Tests**.

# Kafka Events

Kafka is employed as a message broker to enable asynchronous communication and event-driven architecture within the application. 
Each event contains information about topics where to publish it.
They are easily configured in [settings](src/core/settings.py) file.
Here are events which are currently used in system.

### Consumer Events
For now there are no consumer events.

### Producer Events
1) **RestaurantManagerCreatedEvent**. Raised when Restaurant Manager was created. 
Sends an ID of the created Restaurant Manager.
2) **ModeratorCreatedEvent**. Raised when Moderator was created. 
Sends an ID of the created Moderator.

# GRPC
The gRPC (Google Remote Procedure Call) server is a critical component of the User Management Microservice, 
responsible for facilitating efficient and standardized communication with other microservices 
within the application ecosystem. Other microservices use gRPC channel 
for authentication of the user by access JWT token. 

The structure of gRPC response looks like this:

```json
{
  "user_id": "1",
  "role": "CUSTOMER"
}
```
You can also see [proto file](protos/roles.proto).

# Run Locally 

You can download source code and launch **User Management Microservice** using **Python**.

### Requirements
1) Python 3.10 (it is recommended to use virtual environment)
2) pip
3) PostgreSQL
4) Kafka Broker (with SASL authentication)
5) Email Account for sending verification emails

### Installation

Clone the repository to your local machine and navigate to the **User Management Microservice** directory

```bash
  git clone https://github.com/Ash1VT/food-delivery-backend
  cd user-management
```

Install dependencies

```bash
  pip install -r requirements.txt
```

Create an **"env"** folder in this directory. Create an **".env.dev"** file in this directory.

See these configurations for different SMTP servers: 
[yandex](https://wiki.saltcorn.com/view/ShowPage/using-the-yandex-smtp-server), 
[gmail](https://wiki.saltcorn.com/view/ShowPage/using-the-gmail-smtp-server), 
[mail.ru](https://wiki.saltcorn.com/view/ShowPage/using-the-mailru-smtp-server).

Your **env** file should look like this:
```
  SECRET_KEY=your_secret_key
  WEB_APP_PROTOCOL=http
  WEB_APP_HOST=0.0.0.0
  WEB_APP_PORT=8000
  GRPC_SERVER_PORT=50051
  PG_HOST=your_postgres_host
  PG_PORT=your_postgres_port
  PG_DATABASE=user
  PG_USER=your_postgres_user
  PG_PASSWORD=your_postgres_user_password
  EMAIL_HOST=email_smtp_server
  EMAIL_HOST_USER=your_email_address
  EMAIL_HOST_PASSWORD=your_email_password
  EMAIL_PORT=email_smtp_port
  EMAIL_USE_SSL=True/False
  KAFKA_BOOTSTRAP_SERVER_HOST=your_kafka_bootstrap_server_host
  KAFKA_BOOTSTRAP_SERVER_PORT=your_kafka_bootstrap_server_port
  KAFKA_BROKER_USER=your_kafka_username
  KAFKA_BROKER_PASSWORD=your_kafka_password
```

Go to src directory
```bash
  cd src
```

Apply migrations for database

```bash
  python manage.py migrate
```

Run local server

```bash
  python manage.py runserver
```

Run gRPC server
```bash
  python manage.py grpcserver
```


# Docker

You can also use **Docker** and **Docker Compose** instead of **Python** to run microservice .

Clone the repository to your local machine and navigate to the **User Management Microservice** directory

```bash
  git clone https://github.com/Ash1VT/food-delivery-backend
  cd user-management
```

Create an **".env"** file.

See these configurations for different SMTP servers: 
[yandex](https://wiki.saltcorn.com/view/ShowPage/using-the-yandex-smtp-server), 
[gmail](https://wiki.saltcorn.com/view/ShowPage/using-the-gmail-smtp-server), 
[mail.ru](https://wiki.saltcorn.com/view/ShowPage/using-the-mailru-smtp-server).

Your **env** file should look like this:
```
  SECRET_KEY=your_secret_key
  PG_USER=your_postgres_user
  PG_PASSWORD=your_postgres_user_password
  EMAIL_HOST=email_smtp_server
  EMAIL_HOST_USER=your_email_address
  EMAIL_HOST_PASSWORD=your_email_password
  EMAIL_PORT=email_smtp_port
  EMAIL_USE_SSL=True/False
  KAFKA_BROKER_USER=your_kafka_username
  KAFKA_BROKER_PASSWORD=your_kafka_password
```

Navigate to Docker directory
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

# Future Features
1) Implement custom verification email templates tailored for Couriers, Restaurant Managers, and Moderators.
2) Develop an automated user age calculation system based on their date of birth.
3) Introduce an age restriction for Users.
4) Integration of Celery for Email Sending.
5) Introduction of 'send_email' Flag in User Creation Service Methods.
6) Redis Cache for User Profile Database.
7) Implement age restrictions to ensure that users registering with inaccurate or invalid birthdates are not allowed to create accounts.

