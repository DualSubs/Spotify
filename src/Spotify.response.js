import _ from './ENV/Lodash.mjs'
import $Storage from './ENV/$Storage.mjs'
import ENV from "./ENV/ENV.mjs";
import URI from "./URI/URI.mjs";

import Database from "./database/index.mjs";
import setENV from "./function/setENV.mjs";
import setCache from "./function/setCache.mjs";
import modifiedAccountAttributes from "./function/modifiedAccountAttributes.mjs";

import { TextEncoder , TextDecoder } from "./text-encoding/index.js";
import { WireType, UnknownFieldHandler, reflectionMergePartial, MESSAGE_TYPE, MessageType, BinaryReader, isJsonObject, typeofJsonValue, jsonWriteOptions } from "../node_modules/@protobuf-ts/runtime/build/es2015/index.js";

const $ = new ENV("🍿️ DualSubs: 🎵 Spotify v1.5.1(4) response");

/***************** Processing *****************/
// 解构URL
const URL = URI.parse($request.url);
$.log(`⚠ URL: ${JSON.stringify(URL)}`, "");
// 获取连接参数
const METHOD = $request.method, HOST = URL.host, PATH = URL.path, PATHs = URL.paths;
$.log(`⚠ METHOD: ${METHOD}`, "");
// 解析格式
const FORMAT = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"])?.split(";")?.[0];
$.log(`⚠ FORMAT: ${FORMAT}`, "");
(async () => {
	// 读取设置
	const { Settings, Caches, Configs } = setENV("DualSubs", "Spotify", Database);
	$.log(`⚠ Settings.Switch: ${Settings?.Switch}`, "");
	switch (Settings.Switch) {
		case true:
		default:
			// 获取字幕类型与语言
			const Type = URL.query?.subtype ?? Settings.Type, Languages = [URL.query?.lang?.toUpperCase?.() ?? Settings.Languages[0], (URL.query?.tlang ?? Caches?.tlang)?.toUpperCase?.() ?? Settings.Languages[1]];
			$.log(`⚠ Type: ${Type}, Languages: ${Languages}`, "");
			// 创建空数据
			let body = {};
			// 格式判断
			switch (FORMAT) {
				case undefined: // 视为无body
					break;
				case "application/x-www-form-urlencoded":
				case "text/plain":
				case "text/html":
				default:
					break;
				case "application/x-mpegURL":
				case "application/x-mpegurl":
				case "application/vnd.apple.mpegurl":
				case "audio/mpegurl":
					break;
				case "text/xml":
				case "text/plist":
				case "application/xml":
				case "application/plist":
				case "application/x-plist":
					break;
				case "text/vtt":
				case "application/vtt":
					break;
				case "text/json":
				case "application/json":
					body = JSON.parse($response.body ?? "{}");
					$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					switch (PATH) {
						case "melody/v1/product_state":
							body.country = Settings.Country;
							body["selected-language"] = Settings.Languages[1].toLowerCase();
							break;
						case "v1/tracks":
							body?.tracks?.forEach?.(track => {
								$.log(`🚧 track: ${JSON.stringify(track)}`, "");
								const trackId = track?.id;
								const trackInfo = {
									"track": track?.name,
									"album": track?.album?.name,
									"artist": track?.artists?.[0]?.name
								};
								// 写入数据
								Caches.Metadatas.Tracks.set(trackId, trackInfo);
							});
							// 格式化缓存
							//$.log(`🚧 调试信息`, `Caches.Metadatas.Tracks: ${JSON.stringify([...Caches.Metadatas.Tracks.entries()])}`, "");
							Caches.Metadatas.Tracks = setCache(Caches.Metadatas.Tracks, Settings.CacheSize);
							// 写入持久化储存
							$Storage.setItem(`@DualSubs.${"Spotify"}.Caches.Metadatas.Tracks`, Caches.Metadatas.Tracks);
							break;
					};
					$response.body = JSON.stringify(body);
					break;
				case "application/protobuf":
				case "application/x-protobuf":
				case "application/vnd.google.protobuf":
				case "application/grpc":
				case "application/grpc+proto":
				case "application/octet-stream":
					let rawBody = $.isQuanX() ? new Uint8Array($response.bodyBytes ?? []) : $response.body ?? new Uint8Array();
					switch (FORMAT) {
						case "application/protobuf":
						case "application/x-protobuf":
						case "application/vnd.google.protobuf":
							/******************  initialization start  *******************/
							class Any$Type extends MessageType {
								constructor() {
									super("google.protobuf.Any", [
										{ no: 1, name: "type_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
										{ no: 2, name: "value", kind: "scalar", T: 12 /*ScalarType.BYTES*/ }
									]);
								}
								/**
								 * Pack the message into a new `Any`.
								 *
								 * Uses 'type.googleapis.com/full.type.name' as the type URL.
								 */
								pack(message, type) {
									return {
										typeUrl: this.typeNameToUrl(type.typeName), value: type.toBinary(message),
									};
								}
								/**
								 * Unpack the message from the `Any`.
								 */
								unpack(any, type, options) {
									if (!this.contains(any, type))
										throw new Error("Cannot unpack google.protobuf.Any with typeUrl '" + any.typeUrl + "' as " + type.typeName + ".");
									return type.fromBinary(any.value, options);
								}
								/**
								 * Does the given `Any` contain a packed message of the given type?
								 */
								contains(any, type) {
									if (!any.typeUrl.length)
										return false;
									let wants = typeof type == "string" ? type : type.typeName;
									let has = this.typeUrlToName(any.typeUrl);
									return wants === has;
								}
								/**
								 * Convert the message to canonical JSON value.
								 *
								 * You have to provide the `typeRegistry` option so that the
								 * packed message can be converted to JSON.
								 *
								 * The `typeRegistry` option is also required to read
								 * `google.protobuf.Any` from JSON format.
								 */
								internalJsonWrite(any, options) {
									if (any.typeUrl === "")
										return {};
									let typeName = this.typeUrlToName(any.typeUrl);
									let opt = jsonWriteOptions(options);
									let type = opt.typeRegistry?.find(t => t.typeName === typeName);
									if (!type)
										throw new globalThis.Error("Unable to convert google.protobuf.Any with typeUrl '" + any.typeUrl + "' to JSON. The specified type " + typeName + " is not available in the type registry.");
									let value = type.fromBinary(any.value, { readUnknownField: false });
									let json = type.internalJsonWrite(value, opt);
									if (typeName.startsWith("google.protobuf.") || !isJsonObject(json))
										json = { value: json };
									json["@type"] = any.typeUrl;
									return json;
								}
								internalJsonRead(json, options, target) {
									if (!isJsonObject(json))
										throw new globalThis.Error("Unable to parse google.protobuf.Any from JSON " + typeofJsonValue(json) + ".");
									if (typeof json["@type"] != "string" || json["@type"] == "")
										return this.create();
									let typeName = this.typeUrlToName(json["@type"]);
									let type = options?.typeRegistry?.find(t => t.typeName == typeName);
									if (!type)
										throw new globalThis.Error("Unable to parse google.protobuf.Any from JSON. The specified type " + typeName + " is not available in the type registry.");
									let value;
									if (typeName.startsWith("google.protobuf.") && json.hasOwnProperty("value"))
										value = type.fromJson(json["value"], options);
									else {
										let copy = Object.assign({}, json);
										delete copy["@type"];
										value = type.fromJson(copy, options);
									}
									if (target === undefined)
										target = this.create();
									target.typeUrl = json["@type"];
									target.value = type.toBinary(value);
									return target;
								}
								typeNameToUrl(name) {
									if (!name.length)
										throw new Error("invalid type name: " + name);
									return "type.googleapis.com/" + name;
								}
								typeUrlToName(url) {
									if (!url.length)
										throw new Error("invalid type url: " + url);
									let slash = url.lastIndexOf("/");
									let name = slash > 0 ? url.substring(slash + 1) : url;
									if (!name.length)
										throw new Error("invalid type url: " + url);
									return name;
								}
								create(value) {
									const message = { typeUrl: "", value: new Uint8Array(0) };
									globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
									if (value !== undefined)
										reflectionMergePartial(this, message, value);
									return message;
								}
								internalBinaryRead(reader, length, options, target) {
									let message = target ?? this.create(), end = reader.pos + length;
									while (reader.pos < end) {
										let [fieldNo, wireType] = reader.tag();
										switch (fieldNo) {
											case /* string type_url */ 1:
												message.typeUrl = reader.string();
												break;
											case /* bytes value */ 2:
												message.value = reader.bytes();
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
									/* string type_url = 1; */
									if (message.typeUrl !== "")
										writer.tag(1, WireType.LengthDelimited).string(message.typeUrl);
									/* bytes value = 2; */
									if (message.value.length)
										writer.tag(2, WireType.LengthDelimited).bytes(message.value);
									let u = options.writeUnknownFields;
									if (u !== false)
										(u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
									return writer;
								}
							}
							const Any = new Any$Type();
							/******************  initialization finish  *******************/
							switch (PATH) {
								case "bootstrap/v1/bootstrap":
								case "user-customization-service/v1/customize":
									/******************  initialization start  *******************/
									class BootstrapResponse$Type extends MessageType {
										constructor() {
											super("BootstrapResponse", [
												{ no: 2, name: "ucsResponseV0", kind: "message", T: () => UcsResponseWrapperV0 },
												{ no: 3, name: "trialsFacadeResponseV1", kind: "message", T: () => TrialsFacadeResponseWrapperV1 }
											]);
										}
									}
									const BootstrapResponse = new BootstrapResponse$Type();
									class UcsResponseWrapperV0$Type extends MessageType {
										constructor() {
											super("UcsResponseWrapperV0", [
												{ no: 1, name: "success", kind: "message", T: () => UcsResponseWrapperSuccess },
												{ no: 2, name: "error", kind: "message", T: () => Error }
											]);
										}
									}
									const UcsResponseWrapperV0 = new UcsResponseWrapperV0$Type();
									class UcsResponseWrapperSuccess$Type extends MessageType {
										constructor() {
											super("UcsResponseWrapperSuccess", [
												{ no: 1, name: "customization", kind: "message", T: () => UcsResponseWrapper }
											]);
										}
									}
									const UcsResponseWrapperSuccess = new UcsResponseWrapperSuccess$Type();
									class UcsResponseWrapper$Type extends MessageType {
										constructor() {
											super("UcsResponseWrapper", [
												{ no: 1, name: "success", kind: "message", T: () => UcsResponse },
												{ no: 2, name: "error", kind: "message", T: () => Error }
											]);
										}
									}
									const UcsResponseWrapper = new UcsResponseWrapper$Type();
									class TrialsFacadeResponseWrapperV1$Type extends MessageType {
										constructor() {
											super("TrialsFacadeResponseWrapperV1", [
												{ no: 1, name: "success", kind: "message", T: () => TrialsFacadeResponseWrapperSuccess },
												{ no: 2, name: "error", kind: "message", T: () => Error }
											]);
										}
									}
									const TrialsFacadeResponseWrapperV1 = new TrialsFacadeResponseWrapperV1$Type();
									class TrialsFacadeResponseWrapperSuccess$Type extends MessageType {
										constructor() {
											super("TrialsFacadeResponseWrapperSuccess", [
												{ no: 1, name: "filed1", kind: "scalar", T: 5 /*ScalarType.INT32*/ }
											]);
										}
									}
									const TrialsFacadeResponseWrapperSuccess = new TrialsFacadeResponseWrapperSuccess$Type();
									class UcsResponse$Type extends MessageType {
										constructor() {
											super("UcsResponse", [
												{ no: 1, name: "resolveSuccess", kind: "message", T: () => ResolveSuccess },
												{ no: 2, name: "resolveError", kind: "message", T: () => Error },
												{ no: 3, name: "accountAttributesSuccess", kind: "message", T: () => AccountAttributesResponse },
												{ no: 4, name: "accountAttributesError", kind: "message", T: () => Error },
												{ no: 5, name: "fetchTimeMillis", kind: "scalar", T: 3 /*ScalarType.INT64*/ }
											]);
										}
									}
									const UcsResponse = new UcsResponse$Type();
									class ResolveSuccess$Type extends MessageType {
										constructor() {
											super("ResolveSuccess", [
												{ no: 1, name: "configuration", kind: "message", T: () => Configuration }
											]);
										}
									}
									const ResolveSuccess = new ResolveSuccess$Type();
									class Configuration$Type extends MessageType {
										constructor() {
											super("Configuration", [
												{ no: 1, name: "configurationAssignmentId", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
												{ no: 2, name: "fetchTimeMillis", kind: "scalar", T: 3 /*ScalarType.INT64*/ },
												{ no: 3, name: "assignedValues", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => AssignedValue }
											]);
										}
									}
									const Configuration = new Configuration$Type();
									class AssignedValue$Type extends MessageType {
										constructor() {
											super("AssignedValue", [
												{ no: 1, name: "propertyId", kind: "message", T: () => PropertyId },
												{ no: 2, name: "metadata", kind: "message", T: () => Metadata },
												{ no: 3, name: "boolValue", kind: "message", T: () => BoolValue },
												{ no: 4, name: "intValue", kind: "message", T: () => IntValue },
												{ no: 5, name: "enumValue", kind: "message", T: () => EnumValue }
											]);
										}
									}
									const AssignedValue = new AssignedValue$Type();
									class PropertyId$Type extends MessageType {
										constructor() {
											super("PropertyId", [
												{ no: 1, name: "scope", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
												{ no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
											]);
										}
									}
									const PropertyId = new PropertyId$Type();
									class Metadata$Type extends MessageType {
										constructor() {
											super("Metadata", [
												{ no: 1, name: "policyId", kind: "scalar", T: 3 /*ScalarType.INT64*/ },
												{ no: 2, name: "externalRealm", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
												{ no: 3, name: "externalRealmId", kind: "scalar", T: 3 /*ScalarType.INT64*/ }
											]);
										}
									}
									const Metadata = new Metadata$Type();
									class BoolValue$Type extends MessageType {
										constructor() {
											super("BoolValue", [
												{ no: 1, name: "value", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
											]);
										}
									}
									const BoolValue = new BoolValue$Type();
									class EnumValue$Type extends MessageType {
										constructor() {
											super("EnumValue", [
												{ no: 1, name: "value", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
											]);
										}
									}
									const EnumValue = new EnumValue$Type();
									class IntValue$Type extends MessageType {
										constructor() {
											super("IntValue", [
												{ no: 1, name: "value", kind: "scalar", T: 5 /*ScalarType.INT32*/ }
											]);
										}
									}
									const IntValue = new IntValue$Type();
									class AccountAttributesResponse$Type extends MessageType {
										constructor() {
											super("AccountAttributesResponse", [
												{ no: 1, name: "accountAttributes", kind: "map", K: 9 /*ScalarType.STRING*/, V: { kind: "message", T: () => AccountAttribute } }
											]);
										}
									}
									const AccountAttributesResponse = new AccountAttributesResponse$Type();
									class AccountAttribute$Type extends MessageType {
										constructor() {
											super("AccountAttribute", [
												{ no: 2, name: "boolValue", kind: "scalar", opt: true, T: 8 /*ScalarType.BOOL*/ },
												{ no: 3, name: "longValue", kind: "scalar", opt: true, T: 3 /*ScalarType.INT64*/ },
												{ no: 4, name: "stringValue", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ }
											]);
										}
									}
									const AccountAttribute = new AccountAttribute$Type();
									class Error$Type extends MessageType {
										constructor() {
											super("Error", [
												{ no: 1, name: "errorCode", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
												{ no: 2, name: "message", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
												{ no: 3, name: "logId", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ }
											]);
										}
									}
									const Error = new Error$Type();
							/******************  initialization finish  *******************/
									switch (PATH) {
										case "bootstrap/v1/bootstrap": {
											body = BootstrapResponse.fromBinary(rawBody);
											let accountAttributes = body?.ucsResponseV0?.success?.customization?.success?.accountAttributesSuccess?.accountAttributes;
											if (accountAttributes) {
												accountAttributes["country_code"] = { "stringValue": Settings.Country };
												accountAttributes = modifiedAccountAttributes(accountAttributes);
											};
											rawBody = BootstrapResponse.toBinary(body);
											break;
										};
										case "user-customization-service/v1/customize": {
											body = UcsResponseWrapper.fromBinary(rawBody);
											let accountAttributes = body?.success?.accountAttributesSuccess?.accountAttributes;
											if (accountAttributes) {
												accountAttributes["country_code"] = { "stringValue": Settings.Country };
												accountAttributes = modifiedAccountAttributes(accountAttributes);
											};
											rawBody = UcsResponseWrapper.toBinary(body);
											break;
										};
									};
									break;
								case "extended-metadata/v0/extended-metadata": {
									/******************  initialization start  *******************/
									class BatchedExtensionResponse$Type extends MessageType {
										constructor() {
											super("BatchedExtensionResponse", [
												{ no: 1, name: "header", kind: "message", T: () => BatchedExtensionResponseHeader },
												{ no: 2, name: "extended_metadata", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => EntityExtensionDataArray }
											]);
										}
									}
									const BatchedExtensionResponse = new BatchedExtensionResponse$Type();
									class BatchedExtensionResponseHeader$Type extends MessageType {
										constructor() {
											super("BatchedExtensionResponseHeader", []);
										}
									}
									const BatchedExtensionResponseHeader = new BatchedExtensionResponseHeader$Type();
									class EntityExtensionDataArrayHeader$Type extends MessageType {
										constructor() {
											super("EntityExtensionDataArrayHeader", [
												{ no: 1, name: "provider_error_status", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
												{ no: 2, name: "cache_ttl_in_seconds", kind: "scalar", T: 3 /*ScalarType.INT64*/ },
												{ no: 3, name: "offline_ttl_in_seconds", kind: "scalar", T: 3 /*ScalarType.INT64*/ }
											]);
										}
									}
									const EntityExtensionDataArrayHeader = new EntityExtensionDataArrayHeader$Type();
									class EntityExtensionDataArray$Type extends MessageType {
										constructor() {
											super("EntityExtensionDataArray", [
												{ no: 1, name: "header", kind: "message", T: () => EntityExtensionDataArrayHeader },
												{ no: 3, name: "extension_data", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => EntityExtensionData }
											]);
										}
									}
									const EntityExtensionDataArray = new EntityExtensionDataArray$Type();
									class EntityExtensionData$Type extends MessageType {
										constructor() {
											super("EntityExtensionData", [
												{ no: 1, name: "header", kind: "message", T: () => EntityExtensionDataHeader },
												{ no: 2, name: "entity_uri", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
												{ no: 3, name: "extension_data", kind: "message", T: () => Any }
											]);
										}
									}
									const EntityExtensionData = new EntityExtensionData$Type();
									class EntityExtensionDataHeader$Type extends MessageType {
										constructor() {
											super("EntityExtensionDataHeader", [
												{ no: 1, name: "status_code", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
												{ no: 2, name: "etag", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
												{ no: 3, name: "locale", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
												{ no: 4, name: "cache_ttl_in_seconds", kind: "scalar", T: 3 /*ScalarType.INT64*/ },
												{ no: 5, name: "offline_ttl_in_seconds", kind: "scalar", T: 3 /*ScalarType.INT64*/ }
											]);
										}
									}
									const EntityExtensionDataHeader = new EntityExtensionDataHeader$Type();
									/******************  initialization start  *******************/
									body = BatchedExtensionResponse.fromBinary(rawBody);
									rawBody = BatchedExtensionResponse.toBinary(body);
									break;
								};
							};
							break;
						case "application/grpc":
						case "application/grpc+proto":
							break;
					};
					// 写入二进制数据
					$response.body = rawBody;
					break;
			};
			break;
		case false:
			break;
	};
})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done($response))
