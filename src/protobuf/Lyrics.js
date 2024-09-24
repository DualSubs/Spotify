// @generated by protobuf-ts 2.9.4 with parameter generate_dependencies,long_type_number,output_javascript
// @generated from protobuf file "Lyrics.proto" (package "com.spotify.lyrics.endpointretrofit.proto", syntax proto3)
// tslint:disable
import { WireType } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { Alternative } from "./public/LyricsModel";
import { Line } from "./public/LyricsModel";
import { SyncType } from "./public/LyricsModel";
import { ColorData } from "./public/LyricsModel";
// @generated message type with reflection information, may provide speed optimized methods
class ColorLyricsResponse$Type extends MessageType {
    constructor() {
        super("com.spotify.lyrics.endpointretrofit.proto.ColorLyricsResponse", [
            { no: 1, name: "lyrics", kind: "message", T: () => LyricsResponse },
            { no: 2, name: "color_data", kind: "message", T: () => ColorData },
            { no: 3, name: "vocal_removal", kind: "scalar", opt: true, T: 8 /*ScalarType.BOOL*/ },
            { no: 4, name: "vocal_removal_color_data", kind: "message", T: () => ColorData }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* com.spotify.lyrics.endpointretrofit.proto.LyricsResponse lyrics */ 1:
                    message.lyrics = LyricsResponse.internalBinaryRead(reader, reader.uint32(), options, message.lyrics);
                    break;
                case /* com.spotify.lyrics.endpointretrofit.proto.ColorData color_data */ 2:
                    message.colorData = ColorData.internalBinaryRead(reader, reader.uint32(), options, message.colorData);
                    break;
                case /* optional bool vocal_removal */ 3:
                    message.vocalRemoval = reader.bool();
                    break;
                case /* optional com.spotify.lyrics.endpointretrofit.proto.ColorData vocal_removal_color_data */ 4:
                    message.vocalRemovalColorData = ColorData.internalBinaryRead(reader, reader.uint32(), options, message.vocalRemovalColorData);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* com.spotify.lyrics.endpointretrofit.proto.LyricsResponse lyrics = 1; */
        if (message.lyrics)
            LyricsResponse.internalBinaryWrite(message.lyrics, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* com.spotify.lyrics.endpointretrofit.proto.ColorData color_data = 2; */
        if (message.colorData)
            ColorData.internalBinaryWrite(message.colorData, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* optional bool vocal_removal = 3; */
        if (message.vocalRemoval !== undefined)
            writer.tag(3, WireType.Varint).bool(message.vocalRemoval);
        /* optional com.spotify.lyrics.endpointretrofit.proto.ColorData vocal_removal_color_data = 4; */
        if (message.vocalRemovalColorData)
            ColorData.internalBinaryWrite(message.vocalRemovalColorData, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message com.spotify.lyrics.endpointretrofit.proto.ColorLyricsResponse
 */
export const ColorLyricsResponse = new ColorLyricsResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class LyricsResponse$Type extends MessageType {
    constructor() {
        super("com.spotify.lyrics.endpointretrofit.proto.LyricsResponse", [
            { no: 1, name: "sync_type", kind: "enum", T: () => ["com.spotify.lyrics.endpointretrofit.proto.SyncType", SyncType] },
            { no: 2, name: "lines", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Line },
            { no: 3, name: "provider", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "provider_lyrics_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "provider_display_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "sync_lyrics_uri", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 9, name: "alternatives", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Alternative },
            { no: 10, name: "lang", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 11, name: "rtl_lang", kind: "scalar", opt: true, T: 8 /*ScalarType.BOOL*/ },
            { no: 13, name: "show_upsell", kind: "scalar", opt: true, T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.syncType = 0;
        message.lines = [];
        message.provider = "";
        message.providerLyricsId = "";
        message.providerDisplayName = "";
        message.syncLyricsUri = "";
        message.alternatives = [];
        message.lang = "";
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* com.spotify.lyrics.endpointretrofit.proto.SyncType sync_type */ 1:
                    message.syncType = reader.int32();
                    break;
                case /* repeated com.spotify.lyrics.endpointretrofit.proto.Line lines */ 2:
                    message.lines.push(Line.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* string provider */ 3:
                    message.provider = reader.string();
                    break;
                case /* string provider_lyrics_id */ 4:
                    message.providerLyricsId = reader.string();
                    break;
                case /* string provider_display_name */ 5:
                    message.providerDisplayName = reader.string();
                    break;
                case /* string sync_lyrics_uri */ 7:
                    message.syncLyricsUri = reader.string();
                    break;
                case /* repeated com.spotify.lyrics.endpointretrofit.proto.Alternative alternatives */ 9:
                    message.alternatives.push(Alternative.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* string lang */ 10:
                    message.lang = reader.string();
                    break;
                case /* optional bool rtl_lang */ 11:
                    message.rtlLang = reader.bool();
                    break;
                case /* optional bool show_upsell */ 13:
                    message.showUpsell = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* com.spotify.lyrics.endpointretrofit.proto.SyncType sync_type = 1; */
        if (message.syncType !== 0)
            writer.tag(1, WireType.Varint).int32(message.syncType);
        /* repeated com.spotify.lyrics.endpointretrofit.proto.Line lines = 2; */
        for (let i = 0; i < message.lines.length; i++)
            Line.internalBinaryWrite(message.lines[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* string provider = 3; */
        if (message.provider !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.provider);
        /* string provider_lyrics_id = 4; */
        if (message.providerLyricsId !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.providerLyricsId);
        /* string provider_display_name = 5; */
        if (message.providerDisplayName !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.providerDisplayName);
        /* string sync_lyrics_uri = 7; */
        if (message.syncLyricsUri !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.syncLyricsUri);
        /* repeated com.spotify.lyrics.endpointretrofit.proto.Alternative alternatives = 9; */
        for (let i = 0; i < message.alternatives.length; i++)
            Alternative.internalBinaryWrite(message.alternatives[i], writer.tag(9, WireType.LengthDelimited).fork(), options).join();
        /* string lang = 10; */
        if (message.lang !== "")
            writer.tag(10, WireType.LengthDelimited).string(message.lang);
        /* optional bool rtl_lang = 11; */
        if (message.rtlLang !== undefined)
            writer.tag(11, WireType.Varint).bool(message.rtlLang);
        /* optional bool show_upsell = 13; */
        if (message.showUpsell !== undefined)
            writer.tag(13, WireType.Varint).bool(message.showUpsell);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message com.spotify.lyrics.endpointretrofit.proto.LyricsResponse
 */
export const LyricsResponse = new LyricsResponse$Type();
