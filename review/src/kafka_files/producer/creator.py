import json
from abc import ABC, abstractmethod
from typing import Union, List

from kafka import KafkaProducer

__all__ = [
    'KafkaProducerBaseCreator',
    'KafkaProducerSASLPlaintextCreator',
    'KafkaProducerSCRAM256Creator'
]


class KafkaProducerBaseCreator(ABC):
    """
    Base class for creating KafkaProducer.
    """

    def __init__(self, bootstrap_servers: Union[str, List[str]], security_protocol: str):
        """
        Constructor for the inherited classes from KafkaProducerBaseCreator class.

        Args:
            bootstrap_servers (Union[str, List[str]]): The bootstrap servers.
            security_protocol (str): The security protocol.
        """

        self._bootstrap_servers = bootstrap_servers
        self._security_protocol = security_protocol
        self._key_serializer = lambda k: k.encode('ascii')
        self._value_serializer = lambda m: json.dumps(m).encode('ascii')

    @abstractmethod
    def create(self) -> KafkaProducer:
        """
        Method for creating KafkaProducer instance.

        Returns:
            KafkaProducer: KafkaProducer instance
        """

        raise NotImplementedError


class KafkaProducerSASLPlaintextCreator(KafkaProducerBaseCreator):
    """
    Class for creating KafkaProducer using SASL PLAINTEXT security protocol.
    """

    def __init__(self, bootstrap_server_host: str,
                 bootstrap_server_port: str,
                 sasl_plain_username: str,
                 sasl_plain_password: str):
        """
        Initializes a new instance of the KafkaProducerSASLCreator class.

        Args:
            bootstrap_server_host (str): The host of the bootstrap server.
            bootstrap_server_port (str): The port of the bootstrap server.
            sasl_plain_username (str): The SASL PLAINTEXT username.
            sasl_plain_password (str): The SASL PLAINTEXT password.
        """

        self._sasl_mechanism = 'PLAIN'
        self._sasl_plain_username = sasl_plain_username
        self._sasl_plain_password = sasl_plain_password
        super().__init__(f"{bootstrap_server_host}:{bootstrap_server_port}", "SASL_PLAINTEXT")

    def create(self) -> KafkaProducer:
        return KafkaProducer(
            bootstrap_servers=self._bootstrap_servers,
            key_serializer=self._key_serializer,
            value_serializer=self._value_serializer,
            security_protocol=self._security_protocol,
            sasl_mechanism=self._sasl_mechanism,
            sasl_plain_username=self._sasl_plain_username,
            sasl_plain_password=self._sasl_plain_password,
        )


class KafkaProducerSCRAM256Creator(KafkaProducerBaseCreator):
    """
    Class for creating KafkaProducer using SCRAM-SHA-256 security protocol.
    """

    def __init__(self, bootstrap_server_host: str,
                 bootstrap_server_port: str,
                 ssl_cafile: str,
                 ssl_certfile: str,
                 ssl_keyfile: str,
                 sasl_plain_username: str,
                 sasl_plain_password: str):
        """
        Initializes a new instance of the KafkaProducerSCRAM256Creator class.

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

    def create(self) -> KafkaProducer:
        return KafkaProducer(
            bootstrap_servers=self._bootstrap_servers,
            sasl_mechanism=self._sasl_mechanism,
            api_version=(2, 7),
            key_serializer=self._key_serializer,
            value_serializer=self._value_serializer,
            sasl_plain_password=self._sasl_plain_password,
            sasl_plain_username=self._sasl_plain_username,
            security_protocol=self._security_protocol,
            ssl_cafile=self._ssl_cafile,
            ssl_certfile=self._ssl_certfile,
            ssl_keyfile=self._ssl_keyfile,
        )
