import json
from abc import ABC, abstractmethod
from typing import Union, List

from kafka import KafkaConsumer

__all__ = [
    "KafkaConsumerBaseCreator",
    "KafkaConsumerSASLPlaintextCreator",
    "KafkaConsumerSCRAM256Creator"
]


class KafkaConsumerBaseCreator(ABC):
    """
    Base class for creating KafkaConsumer.
    """

    def __init__(self, bootstrap_servers: Union[str, List[str]], security_protocol: str):
        """
        Constructor for the inherited classes from KafkaConsumerBaseCreator class.

        Args:
            bootstrap_servers (Union[str, List[str]]): The bootstrap servers.
            security_protocol (str): The security protocol.
        """

        self._bootstrap_servers = bootstrap_servers
        self._security_protocol = security_protocol
        self._key_deserializer = lambda m: m.decode("ascii")
        self._value_deserializer = lambda m: json.loads(m.decode("ascii"))

    @abstractmethod
    def create(self, topic: str, group_id: str) -> KafkaConsumer:
        """
        Method for creating KafkaConsumer instance.

        Args:
            topic (str): The topic to consume.
            group_id (str): The group id.

        Returns:
            KafkaConsumer: The KafkaConsumer instance.
        """

        raise NotImplementedError


class KafkaConsumerSASLPlaintextCreator(KafkaConsumerBaseCreator):
    """
    Class for creating KafkaConsumer using SASL PLAINTEXT security protocol.
    """

    def __init__(self, bootstrap_server_host: str,
                 bootstrap_server_port: int,
                 sasl_plain_username: str,
                 sasl_plain_password: str):
        """
        Initializes a new instance of the KafkaProducerSASLCreator class.

        Args:
            bootstrap_server_host (str): The bootstrap server host.
            bootstrap_server_port (int): The bootstrap server port.
            sasl_plain_username (str): The SASL PLAINTEXT username.
            sasl_plain_password (str): The SASL PLAINTEXT password.
        """

        self._sasl_mechanism = 'PLAIN'
        self._sasl_plain_username = sasl_plain_username
        self._sasl_plain_password = sasl_plain_password
        super().__init__(f'{bootstrap_server_host}:{bootstrap_server_port}', "SASL_PLAINTEXT")

    def create(self, topic: str, group_id: str) -> KafkaConsumer:
        return KafkaConsumer(
            topic,
            bootstrap_servers=self._bootstrap_servers,
            security_protocol=self._security_protocol,
            group_id=group_id,
            key_deserializer=self._key_deserializer,
            value_deserializer=self._value_deserializer,
            sasl_mechanism=self._sasl_mechanism,
            sasl_plain_username=self._sasl_plain_username,
            sasl_plain_password=self._sasl_plain_password,
        )


class KafkaConsumerSCRAM256Creator(KafkaConsumerBaseCreator):
    """
    Class for creating KafkaConsumer using SCRAM-SHA-256 security protocol.
    """

    def __init__(self, bootstrap_server_host: str,
                 bootstrap_server_port: str,
                 ssl_cafile: str,
                 ssl_certfile: str,
                 ssl_keyfile: str,
                 sasl_plain_username: str,
                 sasl_plain_password: str):
        """
        Initializes a new instance of the KafkaConsumerSCRAM256Creator class.

        Args:
            bootstrap_server_host (str): The host of the bootstrap server.
            bootstrap_server_port (str): The port of the bootstrap server.
            sasl_plain_username (str): The SASL PLAINTEXT username.
            sasl_plain_password (str): The SASL PLAINTEXT password.
        """

        self._sasl_mechanism = 'SCRAM-SHA-256'
        self._ssl_cafile = ssl_cafile
        self._ssl_certfile = ssl_certfile
        self._ssl_keyfile = ssl_keyfile
        self._sasl_plain_username = sasl_plain_username
        self._sasl_plain_password = sasl_plain_password
        super().__init__(f"{bootstrap_server_host}:{bootstrap_server_port}", "SASL_SSL")

    def create(self, topic: str, group_id: str) -> KafkaConsumer:
        return KafkaConsumer(
            topic,
            bootstrap_servers=self._bootstrap_servers,
            sasl_mechanism=self._sasl_mechanism,
            api_version=(2, 7),
            auto_offset_reset="earliest",
            group_id=group_id,
            key_deserializer=self._key_deserializer,
            value_deserializer=self._value_deserializer,
            sasl_plain_password=self._sasl_plain_password,
            sasl_plain_username=self._sasl_plain_username,
            security_protocol=self._security_protocol,
            ssl_cafile=self._ssl_cafile,
            ssl_certfile=self._ssl_certfile,
            ssl_keyfile=self._ssl_keyfile,
        )
