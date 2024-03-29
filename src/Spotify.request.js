import _ from './ENV/Lodash.mjs'
import $Storage from './ENV/$Storage.mjs'
import ENV from "./ENV/ENV.mjs";
import URI from "./URI/URI.mjs";

import Database from "./database/index.mjs";
import setENV from "./function/setENV.mjs";
import setCache from "./function/setCache.mjs";

const $ = new ENV("🍿 DualSubs: 🎵 Spotify v1.3.6(5) request");

// 构造回复数据
let $response = undefined;

/***************** Processing *****************/
// 解构URL
const URL = URI.parse($request.url);
$.log(`⚠ URL: ${JSON.stringify(URL)}`, "");
// 获取连接参数
const METHOD = $request.method, HOST = URL.host, PATH = URL.path, PATHs = URL.paths;
$.log(`⚠ METHOD: ${METHOD}`, "");
// 解析格式
const FORMAT = ($request.headers?.["Content-Type"] ?? $request.headers?.["content-type"])?.split(";")?.[0];
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
							break;
						case "application/protobuf":
						case "application/x-protobuf":
						case "application/vnd.google.protobuf":
						case "application/grpc":
						case "application/grpc+proto":
						case "application/octet-stream":
							let rawBody = $.isQuanX() ? new Uint8Array($request.bodyBytes ?? []) : $request.body ?? new Uint8Array();
							switch (FORMAT) {
								case "application/protobuf":
								case "application/x-protobuf":
								case "application/vnd.google.protobuf":
									switch (PATH) {
										case "bootstrap/v1/bootstrap":
										case "user-customization-service/v1/customize":
											delete $request.headers?.["If-None-Match"];
											delete $request.headers?.["if-none-match"];
											break;
										case "extended-metadata/v0/extended-metadata":
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
					if (PATH.startsWith("color-lyrics/v2/track/")) {
						let trackId = PATHs?.[3];
						$.log(`🚧 调试信息`, `trackId: ${trackId}`, "");
						let _request = JSON.parse(JSON.stringify($request));
						_request.url = `https://api.spotify.com/v1/tracks?ids=${trackId}`;
						delete _request?.headers?.Host;
						if (_request?.headers?.Accept) _request.headers.Accept = "application/json";
						if (_request?.headers?.accept) _request.headers.accept = "application/json";
						//$.log(`🚧 调试信息`, `_request: ${JSON.stringify(_request)}`, "");
						const detectStutus = $.fetch($request);
						const detectTrack = $.fetch(_request);
						await Promise.allSettled([detectStutus, detectTrack]).then(results => {
							switch (results[0].status) {
								case "fulfilled":
									let response = results[0].value;
									switch (response?.statusCode ?? response?.status) {
										case 200:
											if (Settings.Types.includes("Translate")) _.set(URL, "query.subtype", "Translate");
											else if (Settings.Types.includes("External")) _.set(URL, "query.subtype", "External");
											break;
										case 401:
										default:
											break;
										case 404:
											if (Settings.Types.includes("External")) _.set(URL, "query.subtype", "External");
											break;
									};
									break;
								case "rejected":
									if (Settings.Types.includes("External")) _.set(URL, "query.subtype", "External");
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
									//$.log(`🚧 Caches.Metadatas.Tracks: ${JSON.stringify([...Caches.Metadatas.Tracks.entries()])}`, "");
									Caches.Metadatas.Tracks = setCache(Caches.Metadatas.Tracks, Settings.CacheSize);
									// 写入持久化储存
									$Storage.setItem(`@DualSubs.${"Spotify"}.Caches.Metadatas.Tracks`, Caches.Metadatas.Tracks);
									break;
								case "rejected":
									$.log(`🚧 调试信息`, `detectTrack.reason: ${JSON.stringify(results[1].reason)}`, "");
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
			if ($request.headers?.Host) $request.headers.Host = URL.host;
			$request.url = URI.stringify(URL);
			$.log(`🚧 调试信息`, `$request.url: ${$request.url}`, "");
			break;
		case false:
			break;
	};
})()
	.catch((e) => $.logErr(e))
	.finally(() => {
		switch ($response) {
			default: // 有构造回复数据，返回构造的回复数据
				if ($response.headers?.["Content-Encoding"]) $response.headers["Content-Encoding"] = "identity";
				if ($response.headers?.["content-encoding"]) $response.headers["content-encoding"] = "identity";
				if ($.isQuanX()) {
					if (!$response.status) $response.status = "HTTP/1.1 200 OK";
					delete $response.headers?.["Content-Length"];
					delete $response.headers?.["content-length"];
					delete $response.headers?.["Transfer-Encoding"];
					$.done($response);
				} else $.done({ response: $response });
				break;
			case undefined: // 无构造回复数据，发送修改的请求数据
				$.done($request);
				break;
		};
	})
