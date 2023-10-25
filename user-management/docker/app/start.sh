#!/usr/bin/env sh


python src/manage.py migrate
python src/manage.py grpcserver --port "$GRPC_SERVER_PORT" &
python src/manage.py runserver "$WEB_APP_HOST:$WEB_APP_PORT"
