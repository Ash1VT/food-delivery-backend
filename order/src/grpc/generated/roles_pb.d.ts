// package: roles
// file: roles.proto

import * as jspb from "google-protobuf";

export class GetUserRoleRequest extends jspb.Message {
  getAccessToken(): string;
  setAccessToken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserRoleRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserRoleRequest): GetUserRoleRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetUserRoleRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserRoleRequest;
  static deserializeBinaryFromReader(message: GetUserRoleRequest, reader: jspb.BinaryReader): GetUserRoleRequest;
}

export namespace GetUserRoleRequest {
  export type AsObject = {
    accessToken: string,
  }
}

export class GetUserRoleResponse extends jspb.Message {
  getUserId(): number;
  setUserId(value: number): void;

  getRole(): UserRoleMap[keyof UserRoleMap];
  setRole(value: UserRoleMap[keyof UserRoleMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserRoleResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserRoleResponse): GetUserRoleResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetUserRoleResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserRoleResponse;
  static deserializeBinaryFromReader(message: GetUserRoleResponse, reader: jspb.BinaryReader): GetUserRoleResponse;
}

export namespace GetUserRoleResponse {
  export type AsObject = {
    userId: number,
    role: UserRoleMap[keyof UserRoleMap],
  }
}

export interface UserRoleMap {
  USER_ROLE_UNSPECIFIED: 0;
  USER_ROLE_CUSTOMER: 1;
  USER_ROLE_COURIER: 2;
  USER_ROLE_RESTAURANT_MANAGER: 3;
  USER_ROLE_MODERATOR: 4;
}

export const UserRole: UserRoleMap;

