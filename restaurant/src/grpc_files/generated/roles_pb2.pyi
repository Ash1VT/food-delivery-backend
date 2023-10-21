from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class UserRole(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = []
    CUSTOMER: _ClassVar[UserRole]
    COURIER: _ClassVar[UserRole]
    RESTAURANT_MANAGER: _ClassVar[UserRole]
    MODERATOR: _ClassVar[UserRole]
CUSTOMER: UserRole
COURIER: UserRole
RESTAURANT_MANAGER: UserRole
MODERATOR: UserRole

class GetUserRoleRequest(_message.Message):
    __slots__ = ["access_token"]
    ACCESS_TOKEN_FIELD_NUMBER: _ClassVar[int]
    access_token: str
    def __init__(self, access_token: _Optional[str] = ...) -> None: ...

class GetUserRoleResponse(_message.Message):
    __slots__ = ["user_id", "role"]
    USER_ID_FIELD_NUMBER: _ClassVar[int]
    ROLE_FIELD_NUMBER: _ClassVar[int]
    user_id: int
    role: UserRole
    def __init__(self, user_id: _Optional[int] = ..., role: _Optional[_Union[UserRole, str]] = ...) -> None: ...
