// @generated by protobuf-ts 2.9.1 with parameter long_type_string,output_javascript,optimize_code_size
// @generated from protobuf file "Spotify.transcript-read-along.proto" (syntax proto3)
// tslint:disable
// @generated by protobuf-ts 2.9.1 with parameter long_type_string,output_javascript,optimize_code_size
// @generated from protobuf file "Spotify.transcript-read-along.proto" (syntax proto3)
// tslint:disable
import { MessageType } from "@protobuf-ts/runtime";
// @generated message type with reflection information, may provide speed optimized methods
class Transcript$Type extends MessageType {
    constructor() {
        super("Transcript", [
            { no: 1, name: "version", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "uri", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "timeStamp", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "sections", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Section }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message Transcript
 */
export const Transcript = new Transcript$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Section$Type extends MessageType {
    constructor() {
        super("Section", [
            { no: 1, name: "startMs", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "content", kind: "message", T: () => Content },
            { no: 4, name: "header", kind: "message", T: () => Header }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message Section
 */
export const Section = new Section$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Content$Type extends MessageType {
    constructor() {
        super("Content", [
            { no: 1, name: "line", kind: "message", T: () => Line }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message Content
 */
export const Content = new Content$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Line$Type extends MessageType {
    constructor() {
        super("Line", [
            { no: 1, name: "startMs", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "text", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message Line
 */
export const Line = new Line$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Header$Type extends MessageType {
    constructor() {
        super("Header", [
            { no: 1, name: "texts", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message Header
 */
export const Header = new Header$Type();
