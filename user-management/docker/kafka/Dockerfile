FROM openjdk:11-jre-slim

ARG kafka_version=3.5.0
ARG scala_version=2.13

ENV KAFKA_VERSION=$kafka_version \
    SCALA_VERSION=$scala_version \
    KAFKA_HOME=/opt/kafka \
    SCRIPTS_FOLDER=/opt/scripts

ENV PATH=${PATH}:${KAFKA_HOME}/bin:${SCRIPTS_FOLDER}

COPY download-kafka.sh ${SCRIPTS_FOLDER}/

RUN chmod a+x ${SCRIPTS_FOLDER}/*.sh
RUN download-kafka.sh

