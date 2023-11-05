from abc import ABC, abstractmethod
from typing import TypeVar, Generic, List

from pydantic import BaseModel

from models import CustomBase
from uow import GenericUnitOfWork

__all__ = ["Model",
           "RetrieveOut",
           "CreateIn",
           "CreateOut",
           "UpdateIn",
           "UpdateOut",
           "RetrieveMixin",
           "ListMixin",
           "CreateMixin",
           "UpdateMixin",
           "DeleteMixin"
           ]

Model = TypeVar("Model", bound=CustomBase)
RetrieveOut = TypeVar("RetrieveOut", bound=BaseModel)
CreateIn = TypeVar("CreateIn", bound=BaseModel)
CreateOut = TypeVar("CreateOut", bound=BaseModel)
UpdateIn = TypeVar("UpdateIn", bound=BaseModel)
UpdateOut = TypeVar("UpdateOut", bound=BaseModel)


class RetrieveMixin(Generic[Model, RetrieveOut], ABC):
    """
    Mixin class for retrieving instances by ID.

    This mixin provides methods to retrieve instances by their ID using a unit of work and corresponding schemas.

    Attributes:
        schema_retrieve_out (RetrieveOut): The schema for output representation of retrieved instances.
    """

    schema_retrieve_out: RetrieveOut = None

    @abstractmethod
    async def retrieve_instance(self, id: int, uow: GenericUnitOfWork, **kwargs) -> Model:
        """
        Retrieve a database instance by its ID from the repository.

        Args:
            id (int): The ID of the instance to retrieve.
            uow (GenericUnitOfWork): The unit of work instance.

        Returns:
            Model: The retrieved instance.
        """

        raise NotImplementedError

    def get_retrieve_schema(self, instance: Model) -> RetrieveOut:
        """
        Get the output schema for the retrieved instance.

        Args:
            instance (Model): The retrieved instance.

        Returns:
            RetrieveOut: The validated schema for output representation of the retrieved instance.
        """

        return self.schema_retrieve_out.model_validate(instance)

    async def retrieve(self, id: int, uow: GenericUnitOfWork, **kwargs) -> RetrieveOut:
        """
        Retrieve an instance by its ID.

        Args:
            id (int): The ID of the instance to retrieve.
            uow (GenericUnitOfWork): The unit of work instance.

        Returns:
            RetrieveOut: The retrieved instance.
        """

        retrieved_instance = await self.retrieve_instance(id, uow, **kwargs)

        return self.get_retrieve_schema(retrieved_instance)


class ListMixin(Generic[Model, RetrieveOut], ABC):
    """
    Mixin class for listing instances.

    This mixin provides methods to list instances using a unit of work and corresponding schemas.

    Attributes:
        schema_retrieve_out (RetrieveOut): The schema for output representation of retrieved instances.
    """

    schema_retrieve_out: RetrieveOut = None

    @abstractmethod
    async def list_instances(self, uow: GenericUnitOfWork, **kwargs) -> List[Model]:
        """
        List all database instances from the repository.

        Args:
            uow (GenericUnitOfWork): The unit of work instance.

        Returns:
            List[Model]: List of instances.
        """

        raise NotImplementedError

    def get_list_schema(self, instance_list: List[Model]) -> List[RetrieveOut]:
        """
        Get the output schema for the list of instances.

        Args:
            instance_list (List[Model]): The list of instances.

        Returns:
            List[RetrieveOut]: List of validated schemas for output representation of instances.
        """

        return [self.schema_retrieve_out.model_validate(instance) for instance in instance_list]

    async def list(self, uow: GenericUnitOfWork, **kwargs) -> List[RetrieveOut]:
        """
        List all instances.

        Args:
            uow (GenericUnitOfWork): The unit of work instance.

        Returns:
            List[RetrieveOut]: List of instances.
        """

        instance_list = await self.list_instances(uow, **kwargs)

        return self.get_list_schema(instance_list)


class CreateMixin(Generic[Model, CreateIn, CreateOut], ABC):
    """
    Mixin class for creating instances.

    This mixin provides methods to create instances using a unit of work and corresponding schemas.

    Attributes:
        schema_create_out (CreateOut): The schema for output representation of created instances.
    """

    schema_create_out: CreateOut = None

    @abstractmethod
    async def create_instance(self, item: CreateIn, uow: GenericUnitOfWork, **kwargs) -> Model:
        """
        Create a new instance in the repository and return created database instance.

        Args:
            item (CreateIn): The instance data to create.
            uow (GenericUnitOfWork): The unit of work instance.

        Returns:
            Model: The created instance.
        """

        raise NotImplementedError

    def get_create_schema(self, instance: Model) -> CreateOut:
        """
        Get the output schema for the created instance.

        Args:
            instance (Model): The created instance.

        Returns:
            CreateOut: The validated schema for output representation of the created instance.
        """

        return self.schema_create_out.model_validate(instance)

    async def create(self, item: CreateIn, uow: GenericUnitOfWork, **kwargs) -> CreateOut:
        """
        Create a new instance and return created serialized instance.

        Args:
            item (CreateIn): The instance data to create.
            uow (GenericUnitOfWork): The unit of work instance.

        Returns:
            CreateOut: The created instance.
        """

        created_instance = await self.create_instance(item, uow, **kwargs)

        return self.get_create_schema(created_instance)


class UpdateMixin(Generic[Model, UpdateIn, UpdateOut], ABC):
    """
    Mixin class for updating instances.

    This mixin provides methods to update instances using a unit of work and corresponding schemas.

    Attributes:
        schema_update_out (UpdateOut): The schema for output representation of updated instances.
    """

    schema_update_out: UpdateOut = None

    @abstractmethod
    async def update_instance(self, id: int, item: UpdateIn, uow: GenericUnitOfWork,
                              **kwargs) -> Model:
        """
        Update an instance by its ID in the repository and return updated database instance.

        Args:
            id (int): The ID of the instance to update.
            item (UpdateIn): The updated instance data.
            uow (GenericUnitOfWork): The unit of work instance.

        Returns:
            Model: The updated instance.
        """

        raise NotImplementedError

    def get_update_schema(self, instance: Model) -> UpdateOut:
        """
        Get the output schema for the updated instance.

        Args:
            instance (Model): The updated instance.

        Returns:
            UpdateOut: The validated schema for output representation of the updated instance.
        """

        return self.schema_update_out.model_validate(instance)

    async def update(self, id: int, item: UpdateIn, uow: GenericUnitOfWork, **kwargs) -> UpdateOut:
        """
        Update an instance by its ID and return updated serialized instance.

        Args:
            id (int): The ID of the instance to update.
            item (UpdateIn): The updated instance data.
            uow (GenericUnitOfWork): The unit of work instance.

        Returns:
            UpdateOut: The updated instance.
        """

        updated_instance = await self.update_instance(id, item, uow, **kwargs)

        return self.get_update_schema(updated_instance)


class DeleteMixin(Generic[Model], ABC):
    """
    Mixin class for deleting instances.

    This mixin provides methods to delete instances using a unit of work.
    """

    @abstractmethod
    async def delete_instance(self, id: int, uow: GenericUnitOfWork, **kwargs):
        """
        Delete an instance by its ID from the repository and return deleted database instance.

        Args:
            id (int): The ID of the instance to delete.
            uow (GenericUnitOfWork): The unit of work instance.
        """

        raise NotImplementedError

    async def delete(self, id: int, uow: GenericUnitOfWork, **kwargs):
        """
        Delete an instance by its ID and return deleted serialized instance.

        Args:
            id (int): The ID of the instance to delete.
            uow (GenericUnitOfWork): The unit of work instance.
        """

        await self.delete_instance(id, uow, **kwargs)
