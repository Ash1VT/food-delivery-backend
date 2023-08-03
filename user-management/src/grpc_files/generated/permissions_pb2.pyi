from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class CheckPermissionRequest(_message.Message):
    __slots__ = ["access_token"]
    ACCESS_TOKEN_FIELD_NUMBER: _ClassVar[int]
    access_token: str
    def __init__(self, access_token: _Optional[str] = ...) -> None: ...

class CheckPermissionResponse(_message.Message):
    __slots__ = ["has_permission", "user_id"]
    HAS_PERMISSION_FIELD_NUMBER: _ClassVar[int]
    USER_ID_FIELD_NUMBER: _ClassVar[int]
    has_permission: bool
    user_id: int
    def __init__(self, has_permission: bool = ..., user_id: _Optional[int] = ...) -> None: ...
