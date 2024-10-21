import {
	$platform,
	_,
	Storage,
	fetch,
	notification,
	log,
	logError,
	wait,
	done,
	getScript,
	runScript,
} from "./utils/utils.mjs";
import database from "./function/database.mjs";
import setENV from "./function/setENV.mjs";
import setCache from "./function/setCache.mjs";
import modifiedAssignedValues from "./function/modifiedAssignedValues.mjs";
import modifiedAccountAttributes from "./function/modifiedAccountAttributes.mjs";
import { BootstrapResponse } from "./protobuf/spotify/remoteConfig/Bootstrap.js";
import { UcsResponseWrapper } from "./protobuf/spotify/remoteConfig/Ucs.js";
import { BatchedExtensionResponse } from "./protobuf/spotify/ExtendedMetadata.js";
/***************** Processing *****************/
// 解构URL
const url = new URL($request.url);
log(`⚠ url: ${url.toJSON()}`, "");
// 获取连接参数
const METHOD = $request.method;
const HOST = url.hostname;
const PATH = url.pathname;
log(`⚠ METHOD: ${METHOD}, HOST: ${HOST}, PATH: ${PATH}`, "");
// 解析格式
const FORMAT = (
	$response.headers?.["Content-Type"] ?? $response.headers?.["content-type"]
)?.split(";")?.[0];
log(`⚠ FORMAT: ${FORMAT}`, "");
!(async () => {
	// 读取设置
	const { Settings, Caches, Configs } = setENV("DualSubs", "Spotify", database);
	log(`⚠ Settings.Switch: ${Settings?.Switch}`, "");
	switch (Settings.Switch) {
		case false:
			break;
		default: {
			// 获取字幕类型与语言
			const Type = url.searchParams.get("subtype") ?? Settings.Type;
			const Languages = [
					url.searchParams.get("lang")?.toUpperCase?.() ??
						Settings.Languages[0],
					(url.searchParams.get("tlang") ?? Caches?.tlang)?.toUpperCase?.() ??
						Settings.Languages[1],
				];
			log(`⚠ Type: ${Type}, Languages: ${Languages}`, "");
			// 创建空数据
			let body = {};
			// 格式判断
			switch (FORMAT) {
				case undefined: // 视为无body
					break;
				case "application/x-www-form-urlencoded":
				case "text/plain":
				default:
					break;
				case "application/x-mpegURL":
				case "application/x-mpegurl":
				case "application/vnd.apple.mpegurl":
				case "audio/mpegurl":
					//body = M3U8.parse($response.body);
					//log(`🚧 body: ${JSON.stringify(body)}`, "");
					//$response.body = M3U8.stringify(body);
					break;
				case "text/xml":
				case "text/html":
				case "text/plist":
				case "application/xml":
				case "application/plist":
				case "application/x-plist":
					//body = XML.parse($response.body);
					//log(`🚧 body: ${JSON.stringify(body)}`, "");
					//$response.body = XML.stringify(body);
					break;
				case "text/vtt":
				case "application/vtt":
					//body = VTT.parse($response.body);
					//log(`🚧 body: ${JSON.stringify(body)}`, "");
					//$response.body = VTT.stringify(body);
					break;
				case "text/json":
				case "application/json":
					body = JSON.parse($response.body ?? "{}");
					log(`🚧 body: ${JSON.stringify(body)}`, "");
					switch (PATH) {
						case "/melody/v1/product_state":
							//body.product = "premium";
							body.country = Settings.Country;
							//body.ads = "0";
							//body["on-demand"] = "1";
							body["selected-language"] = Settings.Languages[1].toLowerCase();
							//body["multiuserplan-current-size"]
							//body["preferred-locale"]
							//body["multiuserplan-member-type"]
							//body["is-standalone-audiobooks"]
							//body.catalogue = "premium";
							break;
						case "/v1/tracks":
							// biome-ignore lint/complexity/noForEach: <explanation>
							body?.tracks?.forEach?.((track) => {
								log(`🚧 track: ${JSON.stringify(track)}`, "");
								const trackId = track?.id;
								const trackInfo = {
									track: track?.name,
									album: track?.album?.name,
									artist: track?.artists?.[0]?.name,
								};
								// 写入数据
								Caches.Metadatas.Tracks.set(trackId, trackInfo);
							});
							// 格式化缓存
							log(
								`🚧 调试信息`,
								`Caches.Metadatas.Tracks: ${JSON.stringify([...Caches.Metadatas.Tracks.entries()])}`,
								"",
							);
							Caches.Metadatas.Tracks = setCache(
								Caches.Metadatas.Tracks,
								Settings.CacheSize,
							);
							// 写入持久化储存
							Storage.setItem(
								`@DualSubs.${"Spotify"}.Caches.Metadatas.Tracks`,
								Caches.Metadatas.Tracks,
							);
							break;
					}
					$response.body = JSON.stringify(body);
					break;
				case "application/protobuf":
				case "application/x-protobuf":
				case "application/vnd.google.protobuf":
				case "application/grpc":
				case "application/grpc+proto":
				case "application/octet-stream": {
					//log(`🚧 $response: ${JSON.stringify($response, null, 2)}`, "");
					let rawBody =
						$platform === "Quantumult X"
							? new Uint8Array($response.bodyBytes ?? [])
							: ($response.body ?? new Uint8Array());
					//log(`🚧 isBuffer? ${ArrayBuffer.isView(rawBody)}: ${JSON.stringify(rawBody)}`, "");
					switch (FORMAT) {
						case "application/protobuf":
						case "application/x-protobuf":
						case "application/vnd.google.protobuf":
							switch (PATH) {
								case "/bootstrap/v1/bootstrap":
								case "/user-customization-service/v1/customize":
									switch (PATH) {
										case "/bootstrap/v1/bootstrap": {
											body = BootstrapResponse.fromBinary(rawBody);
											log(`🚧 调试信息`, `body: ${JSON.stringify(body)}`, "");
											let assignedValues =
												body?.ucsResponseV0?.result?.success?.customization
													?.result?.success?.resolveResult?.resolveSuccess
													?.configuration?.assignedValues;
											if (assignedValues) {
												assignedValues = modifiedAssignedValues(assignedValues);
											}
											let accountAttributes =
												body?.ucsResponseV0?.result?.success?.customization
													?.result?.success?.accountAttributesResult
													?.accountAttributesSuccess?.accountAttributes;
											if (accountAttributes) {
												accountAttributes.country_code = {
													value: {
														oneofKind: "stringValue",
														stringValue: Settings.CountryCode,
													},
												};
												accountAttributes =
													modifiedAccountAttributes(accountAttributes);
											}
											//log(`🚧 调试信息`, `body: ${JSON.stringify(body)}`, "");
											rawBody = BootstrapResponse.toBinary(body);
											break;
										}
										case "/user-customization-service/v1/customize": {
											body = UcsResponseWrapper.fromBinary(rawBody);
											log(`🚧 调试信息`, `body: ${JSON.stringify(body)}`, "");
											let assignedValues =
												body?.result?.success?.resolveResult?.resolveSuccess
													?.configuration?.assignedValues;
											if (assignedValues) {
												assignedValues = modifiedAssignedValues(assignedValues);
											}
											let accountAttributes =
												body?.result?.success?.accountAttributesResult
													?.accountAttributesSuccess?.accountAttributes;
											if (accountAttributes) {
												accountAttributes.country_code = {
													value: {
														oneofKind: "stringValue",
														stringValue: Settings.CountryCode,
													},
												};
												accountAttributes =
													modifiedAccountAttributes(accountAttributes);
											}
											log(`🚧 调试信息`, `body: ${JSON.stringify(body)}`, "");
											rawBody = UcsResponseWrapper.toBinary(body);
											break;
										}
									}
									break;
								case "/extended-metadata/v0/extended-metadata": {
									body = BatchedExtensionResponse.fromBinary(rawBody);
									log(`🚧 调试信息`, `body: ${JSON.stringify(body)}`, "");
									//log(`🚧 调试信息`, `body: ${JSON.stringify(body)}`, "");
									rawBody = BatchedExtensionResponse.toBinary(body);
									break;
								}
							}
							break;
						case "application/grpc":
						case "application/grpc+proto":
							break;
					}
					// 写入二进制数据
					$response.body = rawBody;
					break;
				}
			}
			break;
		}
	}
})()
	.catch((e) => logError(e))
	.finally(() => done($response));
