import { $platform, _, Storage, fetch, notification, log, logError, wait, done, getScript, runScript } from "./utils/utils.mjs";
import Database from "./database/index.mjs";
import setENV from "./function/setENV.mjs";
import setCache from "./function/setCache.mjs";
log("v1.5.0(1006)");
// 构造回复数据
let $response = undefined;
/***************** Processing *****************/
// 解构URL
const url = new URL($request.url);
log(`⚠ url: ${url.toJSON()}`, "");
// 获取连接参数
const METHOD = $request.method, HOST = url.hostname, PATH = url.pathname, PATHs = url.pathname.split("/").filter(Boolean);
log(`⚠ METHOD: ${METHOD}, HOST: ${HOST}, PATH: ${PATH}` , "");
// 解析格式
const FORMAT = ($request.headers?.["Content-Type"] ?? $request.headers?.["content-type"])?.split(";")?.[0];
log(`⚠ FORMAT: ${FORMAT}`, "");
!(async () => {
	// 读取设置
	const { Settings, Caches, Configs } = setENV("DualSubs", "Spotify", Database);
	log(`⚠ Settings.Switch: ${Settings?.Switch}`, "");
	switch (Settings.Switch) {
		case true:
		default:
			// 获取字幕类型与语言
			const Type = url.searchParams.get("subtype") ?? Settings.Type, Languages = [url.searchParams.get("lang")?.toUpperCase?.() ?? Settings.Languages[0], (url.searchParams.get("tlang") ?? Caches?.tlang)?.toUpperCase?.() ?? Settings.Languages[1]];
			log(`⚠ Type: ${Type}, Languages: ${Languages}`, "");
			// 创建空数据
			let body = {};
			// 方法判断
			switch (METHOD) {
				case "POST":
				case "PUT":
				case "PATCH":
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
						case "application/octet-stream":
							let rawBody = ($platform === "Quantumult X") ? new Uint8Array($request.bodyBytes ?? []) : $request.body ?? new Uint8Array();
							switch (FORMAT) {
								case "application/protobuf":
								case "application/x-protobuf":
								case "application/vnd.google.protobuf":
									switch (PATH) {
										case "/bootstrap/v1/bootstrap":
										case "/user-customization-service/v1/customize":
											delete $request.headers?.["If-None-Match"];
											delete $request.headers?.["if-none-match"];
											break;
										case "/extended-metadata/v0/extended-metadata":
											break;
									};
									break;
								case "application/grpc":
								case "application/grpc+proto":
									break;
							};
							// 写入二进制数据
							$request.body = rawBody;
							break;
					};
					//break; // 不中断，继续处理URL
				case "GET":
					if (PATH.startsWith("/color-lyrics/v2/track/")) {
						let trackId = PATHs?.[3];
						log(`🚧 调试信息`, `trackId: ${trackId}`, "");
						let _request = JSON.parse(JSON.stringify($request));
						_request.url = `https://api.spotify.com/v1/tracks?ids=${trackId}`;
						if (_request?.headers?.Accept) _request.headers.Accept = "application/json";
						if (_request?.headers?.accept) _request.headers.accept = "application/json";
						//log(`🚧 调试信息`, `_request: ${JSON.stringify(_request)}`, "");
						const detectStutus = fetch($request);
						const detectTrack = fetch(_request);
						await Promise.allSettled([detectStutus, detectTrack]).then(results => {
							switch (results[0].status) {
								case "fulfilled":
									let response = results[0].value;
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
									};
									break;
								case "rejected":
									if (Settings.Types.includes("External")) url.searchParams.set("subtype", "External");
									break;
							};
							switch (results[1].status) {
								case "fulfilled":
									let response = results[1].value;
									body = JSON.parse(response.body);
									body?.tracks?.forEach?.(track => {
										const trackId = track?.id;
										const trackInfo = {
											"id": track?.id,
											"track": track?.name,
											"album": track?.album?.name,
											"artist": track?.artists?.[0]?.name
										};
										// 写入数据
										Caches.Metadatas.Tracks.set(trackId, trackInfo);
									});
									// 格式化缓存
									Caches.Metadatas.Tracks = setCache(Caches.Metadatas.Tracks, Settings.CacheSize);
									// 写入持久化储存
									Storage.setItem(`@DualSubs.${"Spotify"}.Caches.Metadatas.Tracks`, Caches.Metadatas.Tracks);
									break;
								case "rejected":
									log(`🚧 调试信息`, `detectTrack.reason: ${JSON.stringify(results[1].reason)}`, "");
									break;
							};
						});
					};
				case "HEAD":
				case "OPTIONS":
					break;
				case "CONNECT":
				case "TRACE":
					break;
			};
			$request.url = url.toString();
			log(`🚧 调试信息`, `$request.url: ${$request.url}`, "");
			break;
		case false:
			break;
	};
})()
	.catch((e) => logError(e))
	.finally(() => {
		switch ($response) {
			default: // 有构造回复数据，返回构造的回复数据
				if ($response.headers?.["Content-Encoding"]) $response.headers["Content-Encoding"] = "identity";
				if ($response.headers?.["content-encoding"]) $response.headers["content-encoding"] = "identity";
				switch ($platform) {
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
				};
				break;
			case undefined: // 无构造回复数据，发送修改的请求数据
				done($request);
				break;
		};
	})
