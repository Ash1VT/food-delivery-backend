from abc import ABC, abstractmethod
from typing import Union, List

from kafka import KafkaConsumer


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

    @abstractmethod
    def create(self, topic: str) -> KafkaConsumer:
        """
        Method for creating KafkaConsumer instance.

        Args:
            topic (str): The topic to consume.

        Returns:
            KafkaConsumer: The KafkaConsumer instance.
        """

        raise NotImplementedError


class KafkaConsumerSASLCreator(KafkaConsumerBaseCreator):
    """
    Class for creating KafkaConsumer using SASL PLAINTEXT security protocol.
    """

    def __init__(self, bootstrap_server_host: str,
                 bootstrap_server_port: str,
                 sasl_mechanism: str,
                 sasl_plain_username: str,
                 sasl_plain_password: str):
        """
        Initializes a new instance of the KafkaProducerSASLCreator class.

        Args:
            bootstrap_server_host (str): The host of the bootstrap server.
            bootstrap_server_port (str): The port of the bootstrap server.
            sasl_mechanism (str): The SASL mechanism.
            sasl_plain_username (str): The SASL PLAINTEXT username.
            sasl_plain_password (str): The SASL PLAINTEXT password.
        """

        self._sasl_mechanism = sasl_mechanism
        self._sasl_plain_username = sasl_plain_username
        self._sasl_plain_password = sasl_plain_password
        super().__init__(f"{bootstrap_server_host}:{bootstrap_server_port}", "SASL_PLAINTEXT")

    def create(self, topic: str) -> KafkaConsumer:
        return KafkaConsumer(
            topic,
            bootstrap_servers=self._bootstrap_servers,
            security_protocol=self._security_protocol,
            sasl_mechanism=self._sasl_mechanism,
            sasl_plain_username=self._sasl_plain_username,
            sasl_plain_password=self._sasl_plain_password,
        )
