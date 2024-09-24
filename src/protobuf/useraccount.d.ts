// @generated by protobuf-ts 2.9.4 with parameter generate_dependencies,long_type_number,output_javascript
// @generated from protobuf file "useraccount.proto" (package "spotify.remote_config.ucs.proto", syntax proto3)
// tslint:disable
//
// Extracted from: Spotify 1.1.61.583 (Windows)
//
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message spotify.remote_config.ucs.proto.AccountAttribute
 */
export interface AccountAttribute {
    /**
     * @generated from protobuf oneof: value
     */
    value: {
        oneofKind: "boolValue";
        /**
         * @generated from protobuf field: bool bool_value = 2;
         */
        boolValue: boolean;
    } | {
        oneofKind: "longValue";
        /**
         * @generated from protobuf field: int64 long_value = 3;
         */
        longValue: number;
    } | {
        oneofKind: "stringValue";
        /**
         * @generated from protobuf field: string string_value = 4;
         */
        stringValue: string;
    } | {
        oneofKind: undefined;
    };
}
declare class AccountAttribute$Type extends MessageType<AccountAttribute> {
    constructor();
}
/**
 * @generated MessageType for protobuf message spotify.remote_config.ucs.proto.AccountAttribute
 */
export declare const AccountAttribute: AccountAttribute$Type;
export {};
