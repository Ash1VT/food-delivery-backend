while ! nc -z "$PG_HOST" "$PG_PORT";
  do sleep 1;
  echo "Waiting for $PG_HOST:$PG_PORT...";
done;

sleep 5

node_modules/.bin/prisma migrate dev
node dist/src/app.js