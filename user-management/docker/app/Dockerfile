FROM python:3.10

ENV WEB_APP_DIR=/app

RUN mkdir -p WEB_APP_DIR

WORKDIR $WEB_APP_DIR

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip

COPY src/ $WEB_APP_DIR/src
COPY requirements.txt $WEB_APP_DIR
COPY docker/app/start.sh $WEB_APP_DIR

RUN chmod a+x start.sh
RUN pip install -r requirements.txt

CMD ./start.sh