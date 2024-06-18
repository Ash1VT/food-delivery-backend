while ! nc -z "$PG_HOST" "$PG_PORT";
  do sleep 1;
  echo "Waiting for $PG_HOST:$PG_PORT...";
done;

sleep 5

alembic upgrade head
python src/main.py