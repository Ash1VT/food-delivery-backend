FROM python:3.10

ENV TOPICS_DIR=/opt/topics

WORKDIR $TOPICS_DIR

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip

COPY create_topics.py requirements.txt start.sh $TOPICS_DIR

RUN apt-get update
RUN apt-get install -y --no-install-recommends netcat-traditional
RUN chmod a+x start.sh
RUN --mount=type=cache,target=/root/.cache/pip pip install -r requirements.txt

CMD ./start.sh