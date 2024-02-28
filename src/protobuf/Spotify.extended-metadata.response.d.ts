// @generated by protobuf-ts 2.9.1 with parameter long_type_string,output_javascript,generate_dependencies
// @generated from protobuf file "Spotify.extended-metadata.response.proto" (syntax proto3)
// tslint:disable
import { MessageType } from "@protobuf-ts/runtime";
import { Any } from "./google/protobuf/any";
/**
 * @generated from protobuf message BatchedExtensionResponse
 */
export interface BatchedExtensionResponse {
    /**
     * @generated from protobuf field: BatchedExtensionResponseHeader header = 1;
     */
    header?: BatchedExtensionResponseHeader;
    /**
     * @generated from protobuf field: repeated EntityExtensionDataArray extended_metadata = 2;
     */
    extendedMetadata: EntityExtensionDataArray[];
}
/**
 * @generated from protobuf message BatchedExtensionResponseHeader
 */
export interface BatchedExtensionResponseHeader {
}
/**
 * @generated from protobuf message EntityExtensionDataArrayHeader
 */
export interface EntityExtensionDataArrayHeader {
    /**
     * @generated from protobuf field: int32 provider_error_status = 1;
     */
    providerErrorStatus: number;
    /**
     * @generated from protobuf field: int64 cache_ttl_in_seconds = 2;
     */
    cacheTtlInSeconds: string;
    /**
     * @generated from protobuf field: int64 offline_ttl_in_seconds = 3;
     */
    offlineTtlInSeconds: string;
}
/**
 * @generated from protobuf message EntityExtensionDataArray
 */
export interface EntityExtensionDataArray {
    /**
     * @generated from protobuf field: EntityExtensionDataArrayHeader header = 1;
     */
    header?: EntityExtensionDataArrayHeader;
    /**
     * ExtensionKind extension_kind = 2;
     *
     * @generated from protobuf field: repeated EntityExtensionData extension_data = 3;
     */
    extensionData: EntityExtensionData[];
}
/**
 * @generated from protobuf message EntityExtensionData
 */
export interface EntityExtensionData {
    /**
     * @generated from protobuf field: EntityExtensionDataHeader header = 1;
     */
    header?: EntityExtensionDataHeader;
    /**
     * @generated from protobuf field: string entity_uri = 2;
     */
    entityUri: string;
    /**
     * @generated from protobuf field: google.protobuf.Any extension_data = 3;
     */
    extensionData?: Any;
}
/**
 * @generated from protobuf message EntityExtensionDataHeader
 */
export interface EntityExtensionDataHeader {
    /**
     * @generated from protobuf field: int32 status_code = 1;
     */
    statusCode: number;
    /**
     * @generated from protobuf field: string etag = 2;
     */
    etag: string;
    /**
     * @generated from protobuf field: string locale = 3;
     */
    locale: string;
    /**
     * @generated from protobuf field: int64 cache_ttl_in_seconds = 4;
     */
    cacheTtlInSeconds: string;
    /**
     * @generated from protobuf field: int64 offline_ttl_in_seconds = 5;
     */
    offlineTtlInSeconds: string;
}
declare class BatchedExtensionResponse$Type extends MessageType<BatchedExtensionResponse> {
    constructor();
}
/**
 * @generated MessageType for protobuf message BatchedExtensionResponse
 */
export declare const BatchedExtensionResponse: BatchedExtensionResponse$Type;
declare class BatchedExtensionResponseHeader$Type extends MessageType<BatchedExtensionResponseHeader> {
    constructor();
}
/**
 * @generated MessageType for protobuf message BatchedExtensionResponseHeader
 */
export declare const BatchedExtensionResponseHeader: BatchedExtensionResponseHeader$Type;
declare class EntityExtensionDataArrayHeader$Type extends MessageType<EntityExtensionDataArrayHeader> {
    constructor();
}
/**
 * @generated MessageType for protobuf message EntityExtensionDataArrayHeader
 */
export declare const EntityExtensionDataArrayHeader: EntityExtensionDataArrayHeader$Type;
declare class EntityExtensionDataArray$Type extends MessageType<EntityExtensionDataArray> {
    constructor();
}
/**
 * @generated MessageType for protobuf message EntityExtensionDataArray
 */
export declare const EntityExtensionDataArray: EntityExtensionDataArray$Type;
declare class EntityExtensionData$Type extends MessageType<EntityExtensionData> {
    constructor();
}
/**
 * @generated MessageType for protobuf message EntityExtensionData
 */
export declare const EntityExtensionData: EntityExtensionData$Type;
declare class EntityExtensionDataHeader$Type extends MessageType<EntityExtensionDataHeader> {
    constructor();
}
/**
 * @generated MessageType for protobuf message EntityExtensionDataHeader
 */
export declare const EntityExtensionDataHeader: EntityExtensionDataHeader$Type;
export {};