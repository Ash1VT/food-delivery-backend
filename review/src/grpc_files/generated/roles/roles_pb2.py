# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: roles/roles.proto
# Protobuf Python Version: 5.26.1
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x11roles/roles.proto\x12\x05roles\"*\n\x12GetUserRoleRequest\x12\x14\n\x0c\x61\x63\x63\x65ss_token\x18\x01 \x01(\t\"E\n\x13GetUserRoleResponse\x12\x0f\n\x07user_id\x18\x01 \x01(\t\x12\x1d\n\x04role\x18\x02 \x01(\x0e\x32\x0f.roles.UserRole*\x8f\x01\n\x08UserRole\x12\x19\n\x15USER_ROLE_UNSPECIFIED\x10\x00\x12\x16\n\x12USER_ROLE_CUSTOMER\x10\x01\x12\x15\n\x11USER_ROLE_COURIER\x10\x02\x12 \n\x1cUSER_ROLE_RESTAURANT_MANAGER\x10\x03\x12\x17\n\x13USER_ROLE_MODERATOR\x10\x04\x32T\n\x0cRolesService\x12\x44\n\x0bGetUserRole\x12\x19.roles.GetUserRoleRequest\x1a\x1a.roles.GetUserRoleResponseb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'roles.roles_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  DESCRIPTOR._loaded_options = None
  _globals['_USERROLE']._serialized_start=144
  _globals['_USERROLE']._serialized_end=287
  _globals['_GETUSERROLEREQUEST']._serialized_start=28
  _globals['_GETUSERROLEREQUEST']._serialized_end=70
  _globals['_GETUSERROLERESPONSE']._serialized_start=72
  _globals['_GETUSERROLERESPONSE']._serialized_end=141
  _globals['_ROLESSERVICE']._serialized_start=289
  _globals['_ROLESSERVICE']._serialized_end=373
# @@protoc_insertion_point(module_scope)
