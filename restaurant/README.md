# Restaurant Microservice

This microservice takes care of managing restaurants. Here **Restaurant Manager** leave an application for creating his restaurant,
If he had restaurant, he can control restaurant's parameters.
**Moderator** can manage applications left by **Restaurant Managers**. 

# Microservice Description
The **Restaurant Microservice** serves as a crucial component within the application 
ecosystem, offering a comprehensive solution for managing restaurants. 
It caters to the needs of both **Restaurant Managers**, 
who can initiate the restaurant creation process or control restaurant parameters 
if they already own one, and **Moderators**, 
who are responsible for managing applications submitted by **Restaurant Managers**. 
The microservice is built using **FastAPI**, with **pydantic schemas** for data validation, 
**SQL Alchemy** for database operations, and gRPC requests to the **User Microservice** 
for user authentication.

### Technologies Used:
1. **FastAPI**: FastAPI serves as the web framework of choice for developing the **Restaurant Microservice**. 
It provides a robust and efficient platform for building RESTful APIs. 
Its built-in support for asynchronous programming, request validation using pydantic schemas, 
and automatic OpenAPI documentation generation make it well-suited for rapid development 
and easy maintenance.

2. **Pydantic**: Pydantic is used for data validation and consistency. It works in couple with **FastAPI**. 
It ensures that data passed to and from the microservice adheres to predefined structures, 
enhancing data integrity and reducing the risk of errors and inconsistencies.

3. **SQL Alchemy**: SQL Alchemy is used for database operations. 
It facilitates the interaction with the underlying database system, 
enabling retrieval of restaurant-related data.

4. **gRPC**: The microservice relies on gRPC requests to the **User Microservice**
to provide secure and authenticated access. This technology ensures that users 
and **Restaurant Managers** can authenticate and interact with the restaurant management 
functionalities securely.

5. **PostgreSQL**: PostgreSQL is employed as the relational database 
management system to store restaurant data.

6. **Docker and Docker Compose**: Wrapping application in docker container makes 
deployment, scaling, and management more streamlined and efficient.

# Key Features
1. **Onion Architecture**. The **Restaurant Microservice** is designed using the 
Onion architecture pattern. This architectural choice emphasizes the 
separation of concerns and promotes modularity, making it easier to maintain, 
test, and extend the microservice. The architecture includes distinct layers 
for Services, API, and Repositories (database access), 
ensuring a clean and organized codebase.
2. **Restaurant Creation Applications**.
**Restaurant Managers** can initiate the restaurant creation process by 
submitting applications through the microservice. 
These applications encompass essential information such as restaurant name, 
location, and contact details. The microservice ensures the validation 
of this data and initiates the application review process.
3. **Restaurant Parameter Control**.
For **Restaurant Managers** who already own a restaurant, 
the microservice provides the means to control and modify various restaurant parameters. 
These parameters can include menu configurations, opening hours, 
and other settings crucial for restaurant management.
4. **Moderator Application Management**.
Moderators play a significant role in the microservice by 
reviewing and managing applications submitted by **Restaurant Managers**. 
They can approve or decline applications, 
thereby controlling the onboarding of new restaurants into the system.
5. **Producing events for other microservices**. The **Restaurant Microservice** can produce events to notify other microservices 
about restaurant-related actions or events. More details at [Consumer](#consumer-events) section.
6. **Consuming events from other microservices**. In addition to producing events, 
the microservice can also consume events from other microservices. 
This bidirectional communication allows it to react to events from various parts of the application ecosystem. 
More details at [Producer](#producer-events) section.

# Kafka Events
Kafka is employed as a message broker to enable asynchronous communication and event-driven architecture within the application. 
Each event contains information about topics where to publish it.
They are easily configured in [settings](src/config/settings.py) file.
Here are events which are currently used in system.

### Consumer Events
1. **RestaurantManagerCreatedEvent**. Retrieved when **Restaurant Manager** was created.
Comes from **User Management Microservice**. Receives ID of the **Restaurant Manager**. 
2. **ModeratorCreatedEvent**. Retrieved when **Moderator** was created.
Comes from **User Management Microservice**. Receives ID of the **Moderator**. 

### Producer Events
1. **RestaurantActivatedEvent**. Raised when **Restaurant** was activated. 
Sends an ID of the **Restaurant**.
2. **RestaurantDeactivatedEvent**. Raised when **Restaurant** was deactivated. 
Sends an ID of the **Restaurant**.
3. **RestaurantApplicationConfirmedEvent**. Raised when **Restaurant Application** was confirmed. 
Sends an ID of created **Restaurant** and ID of corresponding **Restaurant Manager**.


# Run Locally

You can download source code and launch **Restaurant Microservice** using **Python**.

### Requirements
1) Python 3.10 (it is recommended to use virtual environment)
2) pip
3) PostgreSQL
4) Kafka Broker (with SASL authentication)

### Installation

Clone the repository to your local machine and navigate to the **Restaurant Microservice** directory

```bash
  git clone https://github.com/Ash1VT/food-delivery-backend
  cd restaurant
```

Install dependencies

```bash
  pip install -r requirements.txt
```

Create an **"env"** folder in this directory. Create an **".env.dev"** file in this directory.

Your **env** file should look like this:
```
  ROLES_GRPC_SERVER_HOST=host_of_grpc_server(see User Management Microservice documentation)
  ROLES_GRPC_SERVER_PORT=port_of_grpc_server
  WEB_APP_HOST=0.0.0.0
  WEB_APP_PORT=8000
  PG_HOST=your_postgres_host
  PG_PORT=your_postgres_port
  PG_DATABASE=user
  PG_USER=your_postgres_user
  PG_PASSWORD=your_postgres_user_password
  KAFKA_BOOTSTRAP_SERVER_HOST=your_kafka_bootstrap_server_host
  KAFKA_BOOTSTRAP_SERVER_PORT=your_kafka_bootstrap_server_port
  KAFKA_BROKER_USER=your_kafka_username
  KAFKA_BROKER_PASSWORD=your_kafka_password
```

Apply migrations for database

```bash
  alembic upgrade head
```

Go to src directory
```bash
  cd src
```

Run local server

```bash
  python main.py
```


# Docker

You can also use **Docker** and **Docker Compose** instead of **Python** to run microservice.

Clone the repository to your local machine and navigate to the **Restaurant Microservice** directory

```bash
  git clone https://github.com/Ash1VT/food-delivery-backend
  cd restaurant
```

Create an **".env"** file.

Your **env** file should look like this:
```
  PG_USER=your_postgres_user
  PG_PASSWORD=your_postgres_user_password
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