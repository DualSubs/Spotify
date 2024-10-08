// @generated by protobuf-ts 2.9.4 with parameter generate_dependencies,long_type_number,output_javascript
// @generated from protobuf file "Lyrics.proto" (package "com.spotify.lyrics.endpointretrofit.proto", syntax proto3)
// tslint:disable
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { Alternative } from "./public/LyricsModel";
import { Line } from "./public/LyricsModel";
import { SyncType } from "./public/LyricsModel";
import { ColorData } from "./public/LyricsModel";
/**
 * @generated from protobuf message com.spotify.lyrics.endpointretrofit.proto.ColorLyricsResponse
 */
export interface ColorLyricsResponse {
    /**
     * @generated from protobuf field: com.spotify.lyrics.endpointretrofit.proto.LyricsResponse lyrics = 1;
     */
    lyrics?: LyricsResponse;
    /**
     * @generated from protobuf field: com.spotify.lyrics.endpointretrofit.proto.ColorData color_data = 2;
     */
    colorData?: ColorData;
    /**
     * @generated from protobuf field: optional bool vocal_removal = 3;
     */
    vocalRemoval?: boolean;
    /**
     * @generated from protobuf field: optional com.spotify.lyrics.endpointretrofit.proto.ColorData vocal_removal_color_data = 4;
     */
    vocalRemovalColorData?: ColorData;
}
/**
 * @generated from protobuf message com.spotify.lyrics.endpointretrofit.proto.LyricsResponse
 */
export interface LyricsResponse {
    /**
     * @generated from protobuf field: com.spotify.lyrics.endpointretrofit.proto.SyncType sync_type = 1;
     */
    syncType: SyncType;
    /**
     * @generated from protobuf field: repeated com.spotify.lyrics.endpointretrofit.proto.Line lines = 2;
     */
    lines: Line[];
    /**
     * @generated from protobuf field: string provider = 3;
     */
    provider: string;
    /**
     * @generated from protobuf field: string provider_lyrics_id = 4;
     */
    providerLyricsId: string;
    /**
     * @generated from protobuf field: string provider_display_name = 5;
     */
    providerDisplayName: string;
    /**
     * @generated from protobuf field: string sync_lyrics_uri = 7;
     */
    syncLyricsUri: string;
    /**
     * @generated from protobuf field: repeated com.spotify.lyrics.endpointretrofit.proto.Alternative alternatives = 9;
     */
    alternatives: Alternative[];
    /**
     * @generated from protobuf field: string lang = 10;
     */
    lang: string;
    /**
     * @generated from protobuf field: optional bool rtl_lang = 11;
     */
    rtlLang?: boolean;
    /**
     * @generated from protobuf field: optional bool show_upsell = 13;
     */
    showUpsell?: boolean;
}
declare class ColorLyricsResponse$Type extends MessageType<ColorLyricsResponse> {
    constructor();
    create(value?: PartialMessage<ColorLyricsResponse>): ColorLyricsResponse;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ColorLyricsResponse): ColorLyricsResponse;
    internalBinaryWrite(message: ColorLyricsResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message com.spotify.lyrics.endpointretrofit.proto.ColorLyricsResponse
 */
export declare const ColorLyricsResponse: ColorLyricsResponse$Type;
declare class LyricsResponse$Type extends MessageType<LyricsResponse> {
    constructor();
    create(value?: PartialMessage<LyricsResponse>): LyricsResponse;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: LyricsResponse): LyricsResponse;
    internalBinaryWrite(message: LyricsResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message com.spotify.lyrics.endpointretrofit.proto.LyricsResponse
 */
export declare const LyricsResponse: LyricsResponse$Type;
export {};
