#!/usr/bin/env sh

while ! nc -z "$PG_HOST" "$PG_PORT";
  do sleep 1;
  echo "Waiting for $PG_HOST:$PG_PORT...";
done;

sleep 5

python src/manage.py migrate
python src/manage.py grpcserver --port "$GRPC_SERVER_PORT" &
python src/manage.py runserver "$WEB_APP_HOST:$WEB_APP_PORT"
