import { $app, Console, done, fetch, Lodash as _, notification, Storage, wait } from "@nsnanocat/util";
import database from "./function/database.mjs";
import setENV from "./function/setENV.mjs";
import setCache from "./function/setCache.mjs";
import modifiedAssignedValues from "./function/modifiedAssignedValues.mjs";
import modifiedAccountAttributes from "./function/modifiedAccountAttributes.mjs";
import { BootstrapResponse } from "./protobuf/spotify/remoteConfig/Bootstrap.js";
import { UcsResponseWrapper } from "./protobuf/spotify/remoteConfig/Ucs.js";
import { BatchedExtensionResponse } from "./protobuf/spotify/ExtendedMetadata.js";
Console.debug = () => {};
/***************** Processing *****************/
// 解构URL
const url = new URL($request.url);
Console.info(`url: ${url.toJSON()}`, "");
// 获取连接参数
const PATH = url.pathname;
Console.info(`PATH: ${PATH}`, "");
// 解析格式
const FORMAT = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"])?.split(";")?.[0];
Console.info(`FORMAT: ${FORMAT}`, "");
!(async () => {
	/**
	 * 设置
	 * @type {{Settings: import('./types').Settings}}
	 */
	const { Settings, Caches, Configs } = setENV("DualSubs", "Spotify", database);
	// 获取字幕类型与语言
	const Type = url.searchParams.get("subtype") ?? Settings.Type;
	const Languages = [url.searchParams.get("lang")?.toUpperCase?.() ?? Settings.Languages[0], (url.searchParams.get("tlang") ?? Caches?.tlang)?.toUpperCase?.() ?? Settings.Languages[1]];
	Console.info(`Type: ${Type}`, `Languages: ${Languages}`);
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
			break;
		case "text/xml":
		case "text/html":
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
			Console.debug(`body: ${JSON.stringify(body)}`, "");
			switch (PATH) {
				case "/melody/v1/product_state":
					body.country = Settings.Country;
					body["selected-language"] = Settings.Languages[1].toLowerCase();
					break;
				case "/v1/tracks":
					body?.tracks?.forEach?.(track => {
						Console.debug(`track: ${JSON.stringify(track)}`, "");
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
					Caches.Metadatas.Tracks = setCache(Caches.Metadatas.Tracks, Settings.CacheSize);
					// 写入持久化储存
					Storage.setItem(`@DualSubs.${"Spotify"}.Caches.Metadatas.Tracks`, Caches.Metadatas.Tracks);
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
			let rawBody = $app === "Quantumult X" ? new Uint8Array($response.bodyBytes ?? []) : ($response.body ?? new Uint8Array());
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
									let assignedValues = body?.ucsResponseV0?.result?.success?.customization?.result?.success?.resolveResult?.resolveSuccess?.configuration?.assignedValues;
									if (assignedValues) {
										assignedValues = modifiedAssignedValues(assignedValues);
									}
									let accountAttributes = body?.ucsResponseV0?.result?.success?.customization?.result?.success?.accountAttributesResult?.accountAttributesSuccess?.accountAttributes;
									if (accountAttributes) {
										accountAttributes.country_code = {
											value: {
												oneofKind: "stringValue",
												stringValue: Settings.CountryCode,
											},
										};
										accountAttributes = modifiedAccountAttributes(accountAttributes);
									}
									rawBody = BootstrapResponse.toBinary(body);
									break;
								}
								case "/user-customization-service/v1/customize": {
									body = UcsResponseWrapper.fromBinary(rawBody);
									let assignedValues = body?.result?.success?.resolveResult?.resolveSuccess?.configuration?.assignedValues;
									if (assignedValues) {
										assignedValues = modifiedAssignedValues(assignedValues);
									}
									let accountAttributes = body?.result?.success?.accountAttributesResult?.accountAttributesSuccess?.accountAttributes;
									if (accountAttributes) {
										accountAttributes.country_code = {
											value: {
												oneofKind: "stringValue",
												stringValue: Settings.CountryCode,
											},
										};
										accountAttributes = modifiedAccountAttributes(accountAttributes);
									}
									rawBody = UcsResponseWrapper.toBinary(body);
									break;
								}
							}
							break;
						case "/extended-metadata/v0/extended-metadata": {
							body = BatchedExtensionResponse.fromBinary(rawBody);
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
})()
	.catch(e => Console.error(e))
	.finally(() => done($response));
