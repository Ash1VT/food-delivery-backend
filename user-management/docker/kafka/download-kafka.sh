#!/usr/bin/env sh

FOLDER="kafka_${SCALA_VERSION}-${KAFKA_VERSION}"
FILENAME="${FOLDER}.tgz"

URL="https://downloads.apache.org/kafka/${KAFKA_VERSION}/${FILENAME}"

echo "Downloading Kafka from $URL"
wget "${URL}" -O "/tmp/${FILENAME}"
echo "Download successful"


tar -zxvf "/tmp/${FILENAME}"
rm "/tmp/${FILENAME}"
mv "/tmp/${FOLDER}/*" "${KAFKA_HOME}"