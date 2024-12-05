import { $app, Console, done, fetch, Lodash as _, Storage } from "@nsnanocat/util";
import database from "./function/database.mjs";
import setENV from "./function/setENV.mjs";
import setCache from "./function/setCache.mjs";
// 构造回复数据
// biome-ignore lint/style/useConst: <explanation>
let $response = undefined;
/***************** Processing *****************/
// 解构URL
const url = new URL($request.url);
Console.info(`url: ${url.toJSON()}`);
// 获取连接参数
const PATHs = url.pathname.split("/").filter(Boolean);
Console.info(`PATHs: ${PATHs}`);
// 解析格式
const FORMAT = ($request.headers?.["Content-Type"] ?? $request.headers?.["content-type"])?.split(";")?.[0];
Console.info(`FORMAT: ${FORMAT}`);
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
	// 方法判断
	switch ($request.method) {
		case "POST":
		case "PUT":
		case "PATCH":
		// biome-ignore lint/suspicious/noFallthroughSwitchClause: <explanation>
		case "DELETE":
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
					break;
				case "application/protobuf":
				case "application/x-protobuf":
				case "application/vnd.google.protobuf":
				case "application/grpc":
				case "application/grpc+proto":
				case "application/octet-stream": {
					let rawBody = $app === "Quantumult X" ? new Uint8Array($request.bodyBytes ?? []) : ($request.body ?? new Uint8Array());
					switch (FORMAT) {
						case "application/protobuf":
						case "application/x-protobuf":
						case "application/vnd.google.protobuf":
							switch (url.pathname) {
								case "/bootstrap/v1/bootstrap":
								case "/user-customization-service/v1/customize":
									delete $request.headers?.["If-None-Match"];
									delete $request.headers?.["if-none-match"];
									break;
								case "/extended-metadata/v0/extended-metadata":
									break;
							}
							break;
						case "application/grpc":
						case "application/grpc+proto":
							break;
					}
					// 写入二进制数据
					$request.body = rawBody;
					break;
				}
			}
		//break; // 不中断，继续处理URL
		// biome-ignore lint/suspicious/noFallthroughSwitchClause: <explanation>
		case "GET":
			if (url.pathname.startsWith("/color-lyrics/v2/track/")) {
				const trackId = PATHs?.[3];
				Console.debug(`trackId: ${trackId}`);
				const _request = JSON.parse(JSON.stringify($request));
				_request.url = `https://api.spotify.com/v1/tracks?ids=${trackId}`;
				if (_request?.headers?.Accept) _request.headers.Accept = "application/json";
				if (_request?.headers?.accept) _request.headers.accept = "application/json";
				//Console.debug(`_request: ${JSON.stringify(_request)}`);
				const detectStutus = fetch($request);
				const detectTrack = fetch(_request);
				await Promise.allSettled([detectStutus, detectTrack]).then(results => {
					switch (results[0].status) {
						case "fulfilled": {
							const response = results[0].value;
							switch (response?.statusCode ?? response?.status) {
								case 200:
									if (Settings.Types.includes("Translate")) url.searchParams.set("subtype", "Translate");
									else if (Settings.Types.includes("External")) url.searchParams.set("subtype", "External");
									break;
								case 401:
								default:
									break;
								case 404:
									if (Settings.Types.includes("External")) url.searchParams.set("subtype", "External");
									break;
							}
							break;
						}
						case "rejected":
							if (Settings.Types.includes("External")) url.searchParams.set("subtype", "External");
							break;
					}
					switch (results[1].status) {
						case "fulfilled": {
							const response = results[1].value;
							body = JSON.parse(response.body);
							body?.tracks?.forEach?.(track => {
								const trackId = track?.id;
								const trackInfo = {
									id: track?.id,
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
						case "rejected":
							Console.debug(`detectTrack.reason: ${JSON.stringify(results[1].reason)}`);
							break;
					}
				});
			}
		case "HEAD":
		case "OPTIONS":
			break;
		case "CONNECT":
		case "TRACE":
			break;
	}
	$request.url = url.toString();
	Console.debug(`$request.url: ${$request.url}`);
})()
	.catch(e => Console.error(e))
	.finally(() => {
		switch (typeof $response) {
			case "object": // 有构造回复数据，返回构造的回复数据
				//Console.debug("finally", `echo $response: ${JSON.stringify($response, null, 2)}`);
				if ($response.headers?.["Content-Encoding"]) $response.headers["Content-Encoding"] = "identity";
				if ($response.headers?.["content-encoding"]) $response.headers["content-encoding"] = "identity";
				switch ($app) {
					default:
						done({ response: $response });
						break;
					case "Quantumult X":
						if (!$response.status) $response.status = "HTTP/1.1 200 OK";
						delete $response.headers?.["Content-Length"];
						delete $response.headers?.["content-length"];
						delete $response.headers?.["Transfer-Encoding"];
						done($response);
						break;
				}
				break;
			case "undefined": // 无构造回复数据，发送修改的请求数据
				//Console.debug("finally", `$request: ${JSON.stringify($request, null, 2)}`);
				done($request);
				break;
			default:
				Console.error(`不合法的 $response 类型: ${typeof $response}`);
				break;
		}
	});
