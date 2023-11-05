# Menu Microservice

This microservice takes care of managing restaurant menus. Here **Restaurant Manager** can control 
which menus his restaurant has, what items and categories are in each menu 
and what is the current menu of the restaurant. 

# Microservice Description
The **Menu Microservice** is a dedicated component within the system, 
designed to manage restaurant menus efficiently. It was written using **Onion Architecture**.
It serves as a platform where **Restaurant Managers** can exercise control over the menus 
offered by their respective establishments. The microservice enables them to define the content 
of menus, including items and categories, and specify the current menu being offered to customers. 

### Technologies Used:
1. **FastAPI**: FastAPI serves as the web framework of choice for developing the **Menu Microservice**. 
It provides a robust and efficient platform for building RESTful APIs. 
Its built-in support for asynchronous programming, request validation using pydantic schemas, 
and automatic OpenAPI documentation generation make it well-suited for rapid development 
and easy maintenance.

2. **Pydantic**: Pydantic is used for data validation and consistency. It works in couple with **FastAPI**. 
It ensures that data passed to and from the microservice adheres to predefined structures, 
enhancing data integrity and reducing the risk of errors and inconsistencies.

3. **SQL Alchemy**: SQL Alchemy is used for database operations. 
It facilitates the interaction with the underlying database system, 
enabling retrieval of menu-related data, 
such as menus, their items and categories.

4. **gRPC**: The microservice relies on gRPC requests to the User Microservice 
to provide secure and authenticated access. This technology ensures that users 
and Restaurant Managers can authenticate and interact with the menu management 
functionalities securely.

5. **PostgreSQL**: PostgreSQL is employed as the relational database 
management system to store menu data, including menu items, menu categories and menus themselves.

6. **Docker and Docker Compose**: Wrapping application in docker container makes 
deployment, scaling, and management more streamlined and efficient.

7. **Pytest**: Pytest is a Python testing framework used for unit testing and test automation. 
It allows the microservice to create and execute test cases to ensure the correctness of its functionality. 
This includes testing user registration, authentication, and authorization processes, as well as other core features.

# Key Features

1. **Onion Architecture**. The **Menu Microservice** is designed using the Onion architecture pattern. 
This architectural choice emphasizes the separation of concerns and promotes modularity, 
making it easier to maintain, test, and extend the microservice. 
The architecture includes distinct layers for **Services**, **API**, and **Repositories** (database access), 
ensuring a clean and organized codebase.
2. **Menu Management**.
Central to the microservice's functionality is menu management. 
It allows Restaurant Managers to exercise precise control over restaurant menus. 
This includes defining and managing various aspects of menus:
   1. **Items**: Restaurant Managers can add, modify, or remove items from their menus, 
   specifying details such as name, description, price.
   2. **Categories**: Menus can be organized into categories, making it easier for customers to navigate. 
   Restaurant Managers can create, update, and delete categories.
   3. **Menus**: The microservice enables the creation of different menus, each with its set of items and categories. 
   Restaurant Managers can switch between menus and define the current active menu to reflect the 
   restaurant's offerings at any given time.
3. **Producing events for other microservices**. The **Menu Microservice** can produce events to notify other microservices 
about menu-related actions or events. More details at [Consumer](#consumer-events) section.
4. **Consuming events from other microservices**. In addition to producing events, 
the microservice can also consume events from other microservices. 
This bidirectional communication allows it to react to events from various parts of the application ecosystem. 
More details at [Producer](#producer-events) section.
5. **Good test coverage (>80%)**. The microservice boasts a test coverage of over 80%, 
signifying that a large portion of the code has been thoroughly tested using **Unit Tests**.

# Kafka Events
Kafka is employed as a message broker to enable asynchronous communication and event-driven architecture within the application. 
Each event contains information about topics where to publish it.
They are easily configured in [settings](src/config/settings.py) file.
Here are events which are currently used in system.

### Consumer Events
1. **RestaurantApplicationConfirmedEvent**. Retrieved when **Restaurant Application** was confirmed and new **Restaurant** was created. 
Comes from **Restaurant Microservice**. Receives ID of the created **Restaurant** and **Restaurant Manager** ID.
2. **RestaurantActivatedEvent**. Retrieved when **Restaurant** was activated. 
Comes from **Restaurant Microservice**. Receives ID of the **Restaurant**. 
3. **RestaurantDeactivatedEvent**. Retrieved when **Restaurant** was deactivated.
Comes from **Restaurant Microservice**. Receives ID of the **Restaurant**. 
4. **RestaurantManagerCreatedEvent**. Retrieved when **Restaurant Manager** was created.
Comes from **User Management Microservice**. Receives ID of the **Restaurant Manager**. 

### Producer Events
For now there are no producer events.

# Run Locally

You can download source code and launch **Menu Microservice** using **Python**.

### Requirements
1) Python 3.10 (it is recommended to use virtual environment)
2) pip
3) PostgreSQL
4) Kafka Broker (with SASL authentication)

### Installation

Clone the repository to your local machine and navigate to the **Menu Microservice** directory

```bash
  git clone https://github.com/Ash1VT/food-delivery-backend
  cd menu
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

Clone the repository to your local machine and navigate to the **Menu Microservice** directory

```bash
  git clone https://github.com/Ash1VT/food-delivery-backend
  cd menu
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

# Future Features
1. The **Menu Microservice** aims to introduce the ability to retrieve menu items, 
categories, or menus by a list of specific IDs. 
2. The future roadmap includes the addition of image support for dishes within the menus. 
3. Add Logging.
4. Integrate pagination functionality.
5. Integrate search functionality via ElasticSearch.
