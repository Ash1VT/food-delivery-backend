FROM python:3.10

ENV WEB_APP_DIR=/app

WORKDIR $WEB_APP_DIR

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip

COPY src/ $WEB_APP_DIR/src
COPY requirements.txt alembic.ini $WEB_APP_DIR
COPY docker/app/start.sh $WEB_APP_DIR

RUN apt-get update
RUN apt-get install -y --no-install-recommends netcat-traditional
RUN chmod a+x start.sh
RUN --mount=type=cache,target=/root/.cache/pip pip install -r requirements.txt

CMD ./start.sh