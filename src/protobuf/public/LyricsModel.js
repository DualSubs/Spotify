// @generated by protobuf-ts 2.9.4 with parameter generate_dependencies,long_type_number,output_javascript
// @generated from protobuf file "public/LyricsModel.proto" (package "com.spotify.lyrics.endpointretrofit.proto", syntax proto3)
// tslint:disable
import { WireType } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * Lyrics content type
 *
 * @generated from protobuf enum com.spotify.lyrics.endpointretrofit.proto.SyncType
 */
export var SyncType;
(function (SyncType) {
    /**
     * @generated from protobuf enum value: UNSYNCED = 0;
     */
    SyncType[SyncType["UNSYNCED"] = 0] = "UNSYNCED";
    /**
     * @generated from protobuf enum value: LINE_SYNCED = 1;
     */
    SyncType[SyncType["LINE_SYNCED"] = 1] = "LINE_SYNCED";
    /**
     * @generated from protobuf enum value: SYLLABLE_SYNCED = 2;
     */
    SyncType[SyncType["SYLLABLE_SYNCED"] = 2] = "SYLLABLE_SYNCED";
})(SyncType || (SyncType = {}));
// @generated message type with reflection information, may provide speed optimized methods
class ColorData$Type extends MessageType {
    constructor() {
        super("com.spotify.lyrics.endpointretrofit.proto.ColorData", [
            { no: 1, name: "background", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "text", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "highlight_text", kind: "scalar", T: 5 /*ScalarType.INT32*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.background = 0;
        message.text = 0;
        message.highlightText = 0;
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* int32 background */ 1:
                    message.background = reader.int32();
                    break;
                case /* int32 text */ 2:
                    message.text = reader.int32();
                    break;
                case /* int32 highlight_text */ 3:
                    message.highlightText = reader.int32();
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
        /* int32 background = 1; */
        if (message.background !== 0)
            writer.tag(1, WireType.Varint).int32(message.background);
        /* int32 text = 2; */
        if (message.text !== 0)
            writer.tag(2, WireType.Varint).int32(message.text);
        /* int32 highlight_text = 3; */
        if (message.highlightText !== 0)
            writer.tag(3, WireType.Varint).int32(message.highlightText);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message com.spotify.lyrics.endpointretrofit.proto.ColorData
 */
export const ColorData = new ColorData$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Alternative$Type extends MessageType {
    constructor() {
        super("com.spotify.lyrics.endpointretrofit.proto.Alternative", [
            { no: 1, name: "language", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "lines", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Line },
            { no: 3, name: "rtl_lang", kind: "scalar", opt: true, T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.language = "";
        message.lines = [];
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string language */ 1:
                    message.language = reader.string();
                    break;
                case /* repeated com.spotify.lyrics.endpointretrofit.proto.Line lines */ 2:
                    message.lines.push(Line.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* optional bool rtl_lang */ 3:
                    message.rtlLang = reader.bool();
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
        /* string language = 1; */
        if (message.language !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.language);
        /* repeated com.spotify.lyrics.endpointretrofit.proto.Line lines = 2; */
        for (let i = 0; i < message.lines.length; i++)
            Line.internalBinaryWrite(message.lines[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* optional bool rtl_lang = 3; */
        if (message.rtlLang !== undefined)
            writer.tag(3, WireType.Varint).bool(message.rtlLang);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message com.spotify.lyrics.endpointretrofit.proto.Alternative
 */
export const Alternative = new Alternative$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Line$Type extends MessageType {
    constructor() {
        super("com.spotify.lyrics.endpointretrofit.proto.Line", [
            { no: 1, name: "start_time_ms", kind: "scalar", T: 3 /*ScalarType.INT64*/, L: 2 /*LongType.NUMBER*/ },
            { no: 2, name: "text", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "syllables", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Syllable }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.startTimeMs = 0;
        message.text = "";
        message.syllables = [];
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* int64 start_time_ms */ 1:
                    message.startTimeMs = reader.int64().toNumber();
                    break;
                case /* string text */ 2:
                    message.text = reader.string();
                    break;
                case /* repeated com.spotify.lyrics.endpointretrofit.proto.Syllable syllables */ 3:
                    message.syllables.push(Syllable.internalBinaryRead(reader, reader.uint32(), options));
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
        /* int64 start_time_ms = 1; */
        if (message.startTimeMs !== 0)
            writer.tag(1, WireType.Varint).int64(message.startTimeMs);
        /* string text = 2; */
        if (message.text !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.text);
        /* repeated com.spotify.lyrics.endpointretrofit.proto.Syllable syllables = 3; */
        for (let i = 0; i < message.syllables.length; i++)
            Syllable.internalBinaryWrite(message.syllables[i], writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message com.spotify.lyrics.endpointretrofit.proto.Line
 */
export const Line = new Line$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Syllable$Type extends MessageType {
    constructor() {
        super("com.spotify.lyrics.endpointretrofit.proto.Syllable", [
            { no: 1, name: "start_time_ms", kind: "scalar", T: 3 /*ScalarType.INT64*/, L: 2 /*LongType.NUMBER*/ },
            { no: 2, name: "num_chars", kind: "scalar", T: 3 /*ScalarType.INT64*/, L: 2 /*LongType.NUMBER*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.startTimeMs = 0;
        message.numChars = 0;
        if (value !== undefined)
            reflectionMergePartial(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* int64 start_time_ms */ 1:
                    message.startTimeMs = reader.int64().toNumber();
                    break;
                case /* int64 num_chars */ 2:
                    message.numChars = reader.int64().toNumber();
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
        /* int64 start_time_ms = 1; */
        if (message.startTimeMs !== 0)
            writer.tag(1, WireType.Varint).int64(message.startTimeMs);
        /* int64 num_chars = 2; */
        if (message.numChars !== 0)
            writer.tag(2, WireType.Varint).int64(message.numChars);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message com.spotify.lyrics.endpointretrofit.proto.Syllable
 */
export const Syllable = new Syllable$Type();
