import _ from './ENV/Lodash.mjs'
import $Storage from './ENV/$Storage.mjs'
import ENV from "./ENV/ENV.mjs";

import Database from "./database/index.mjs";
import setENV from "./function/setENV.mjs";
import setCache from "./function/setCache.mjs";

const $ = new ENV("🍿 DualSubs: 🎵 Spotify v1.4.1(1004) request.beta");

// 构造回复数据
let $response = undefined;

/***************** Processing *****************/
// 解构URL
const url = new URL($request.url);
$.log(`⚠ url: ${url.toJSON()}`, "");
// 获取连接参数
const METHOD = $request.method, HOST = url.hostname, PATH = url.pathname, PATHs = url.pathname.split("/").filter(Boolean);
$.log(`⚠ METHOD: ${METHOD}, HOST: ${HOST}, PATH: ${PATH}` , "");
// 解析格式
const FORMAT = ($request.headers?.["Content-Type"] ?? $request.headers?.["content-type"])?.split(";")?.[0];
$.log(`⚠ FORMAT: ${FORMAT}`, "");
!(async () => {
	// 读取设置
	const { Settings, Caches, Configs } = setENV("DualSubs", "Spotify", Database);
	$.log(`⚠ Settings.Switch: ${Settings?.Switch}`, "");
	switch (Settings.Switch) {
		case true:
		default:
			// 获取字幕类型与语言
			const Type = url.searchParams.get("subtype") ?? Settings.Type, Languages = [url.searchParams.get("lang")?.toUpperCase?.() ?? Settings.Languages[0], (url.searchParams.get("tlang") ?? Caches?.tlang)?.toUpperCase?.() ?? Settings.Languages[1]];
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
						default:
							break;
						case "application/x-mpegURL":
						case "application/x-mpegurl":
						case "application/vnd.apple.mpegurl":
						case "audio/mpegurl":
							//body = M3U8.parse($request.body);
							//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
							//$request.body = M3U8.stringify(body);
							break;
						case "text/xml":
						case "text/html":
						case "text/plist":
						case "application/xml":
						case "application/plist":
						case "application/x-plist":
							//body = XML.parse($request.body);
							//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
							//$request.body = XML.stringify(body);
							break;
						case "text/vtt":
						case "application/vtt":
							//body = VTT.parse($request.body);
							//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
							//$request.body = VTT.stringify(body);
							break;
						case "text/json":
						case "application/json":
							//body = JSON.parse($request.body ?? "{}");
							//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
							//$request.body = JSON.stringify(body);
							break;
						case "application/protobuf":
						case "application/x-protobuf":
						case "application/vnd.google.protobuf":
						case "application/grpc":
						case "application/grpc+proto":
						case "application/octet-stream":
							//$.log(`🚧 调试信息`, `$request: ${JSON.stringify($request, null, 2)}`, "");
							let rawBody = $.isQuanX() ? new Uint8Array($request.bodyBytes ?? []) : $request.body ?? new Uint8Array();
							//$.log(`🚧 调试信息`, `isBuffer? ${ArrayBuffer.isView(rawBody)}: ${JSON.stringify(rawBody)}`, "");
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
						if ($request.headers["Spotify-App-Version"]) $request.headers["Spotify-App-Version"] = "8.8.96.395";
						if ($request.headers["spotify-app-version"]) $request.headers["spotify-app-version"] = "8.8.96.395";
						if ($request.headers["User-Agent"]) $request.headers["User-Agent"] = "Spotify/8.8.96 iOS/17.2.1 (iPhone14,3)";
						if ($request.headers["user-agent"]) $request.headers["user-agent"] = "Spotify/8.8.96 iOS/17.2.1 (iPhone14,3)";
						let trackId = PATHs?.[3];
						$.log(`🚧 调试信息`, `trackId: ${trackId}`, "");
						let _request = JSON.parse(JSON.stringify($request));
						_request.url = `https://api.spotify.com/v1/tracks?ids=${trackId}`;
						if (_request?.headers?.Accept) _request.headers.Accept = "application/json";
						if (_request?.headers?.accept) _request.headers.accept = "application/json";
						//$.log(`🚧 调试信息`, `_request: ${JSON.stringify(_request)}`, "");
						const detectStutus = $.fetch($request);
						const detectTrack = $.fetch(_request);
						await Promise.allSettled([detectStutus, detectTrack]).then(results => {
							/*
							results.forEach((result, i) => {
								$.log(`🚧 调试信息`, `result[${i}]: ${JSON.stringify(result)}`, "");
							});
							*/
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
									$.log(`🚧 调试信息`, `detectStutus.reason: ${JSON.stringify(results[0].reason)}`, "");
									if (Settings.Types.includes("External")) url.searchParams.set("subtype", "External");
									break;
							};
							switch (results[1].status) {
								case "fulfilled":
									let response = results[1].value;
									body = JSON.parse(response.body);
									body?.tracks?.forEach?.(track => {
										//$.log(`🚧 调试信息`, `track: ${JSON.stringify(track)}`, "");
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
									$.log(`🚧 Caches.Metadatas.Tracks: ${JSON.stringify([...Caches.Metadatas.Tracks.entries()])}`, "");
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
			$request.url = url.toString();
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
				//$.log(`🚧 finally`, `echo $response: ${JSON.stringify($response, null, 2)}`, "");
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
				//$.log(`🚧 finally`, `$request: ${JSON.stringify($request, null, 2)}`, "");
				$.done($request);
				break;
		};
	})
