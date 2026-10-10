import { type ArgumentItem, defineConfig } from "@nsnanocat/arguments-builder";

export const output = {
	surge: {
		path: "./dist/DualSubs.Spotify.sgmodule",
		transformEgern: {
			enable: true,
			path: "./dist/DualSubs.Spotify.yaml"
		}
	},
	loon: {
		path: "./dist/DualSubs.Spotify.plugin"
	},
	customItems: [
		{
			path: "./dist/DualSubs.Spotify.snippet",
			template: "./template/quantumultx.handlebars"
		},
		{
			path: "./dist/DualSubs.Spotify.stoverride",
			template: "./template/stash.handlebars"
		}
	],
	dts: {
		isExported: true,
		path: "./src/types.d.ts"
	},
	boxjsSettings: {
		path: "./template/boxjs.settings.json",
		scope: "@DualSubs.Spotify.Settings"
	}
};

export const argTypes: ArgumentItem = {
	key: "Types",
	name: "[歌词] 启用类型（多选）",
	defaultValue: [
		"Translate",
		"External"
	],
	type: "array",
	options: [
		{ key: "Translate", label: "翻译歌词（翻译器）" },
		{ key: "External", label: "外部歌词（外部源）" }
	],
	description: "请选择要添加的歌词选项，如果为多选，则会自动决定提供的歌词类型。"
};

export const argLanguages0: ArgumentItem = {
	key: "Languages[0]",
	name: "[翻译器] 主语言（源语言）",
	defaultValue: "AUTO",
	type: "string",
	boxJsType: "selects",
	description: "仅当源语言识别不准确时更改此选项。",
	options: [
		{ key: "AUTO", label: "自动 - Automatic" },
		{ key: "ZH", label: "中文（自动）" },
		{ key: "ZH-HANS", label: "中文（简体）" },
		{ key: "ZH-HK", label: "中文（香港）" },
		{ key: "ZH-HANT", label: "中文（繁体）" },
		{ key: "EN", label: "English - 英语（自动）" },
		{ key: "ES", label: "Español - 西班牙语（自动）" },
		{ key: "JA", label: "日本語 - 日语" },
		{ key: "KO", label: "한국어 - 韩语" },
		{ key: "DE", label: "Deutsch - 德语" },
		{ key: "FR", label: "Français - 法语" },
		{ key: "TR", label: "Türkçe - 土耳其语" },
		{ key: "KM", label: "ភាសាខ្មែរ - 高棉语" }
	]
};

export const argLanguages1: ArgumentItem = {
	key: "Languages[1]",
	name: "[翻译器] 副语言（目标语言）",
	defaultValue: "ZH",
	type: "string",
	boxJsType: "selects",
	description: "请指定翻译歌词的目标语言。",
	options: [
		{ key: "ZH", label: "中文（自动）" },
		{ key: "ZH-HANS", label: "中文（简体）" },
		{ key: "ZH-HK", label: "中文（香港）" },
		{ key: "ZH-HANT", label: "中文（繁体）" },
		{ key: "EN", label: "English - 英语（自动）" },
		{ key: "ES", label: "Español - 西班牙语（自动）" },
		{ key: "JA", label: "日本語 - 日语" },
		{ key: "KO", label: "한국어 - 韩语" },
		{ key: "DE", label: "Deutsch - 德语" },
		{ key: "FR", label: "Français - 法语" },
		{ key: "TR", label: "Türkçe - 土耳其语" },
		{ key: "KM", label: "ភាសាខ្មែរ - 高棉语" }
	]
};

export const argVendor: ArgumentItem = {
	key: "Vendor",
	name: "[翻译器] 服务商API",
	defaultValue: "Google",
	type: "string",
	options: [
		{ key: "Google", label: "Google Translate" },
		{ key: "Microsoft", label: "Microsoft Translator（需填写API）" }
	],
	description: "请选择翻译器所使用的服务商API，更多翻译选项请使用BoxJs。"
};

export const argLrcVendor: ArgumentItem = {
	key: "LrcVendor",
	name: "[歌词] 服务商API",
	defaultValue: "NeteaseMusic",
	type: "string",
	options: [
		{ key: "NeteaseMusic", label: "网易云音乐（官方）" },
		{ key: "QQMusic", label: "QQ音乐（官方）" },
		{ key: "NeteaseMusicNodeJS", label: "网易云音乐 NodeJS API" }
	],
	description: "请选择外部源所使用的服务商API。"
};

export const argLogLevel: ArgumentItem = {
	key: "LogLevel",
	name: "[调试] 日志等级",
	type: "string",
	defaultValue: "WARN",
	description: "选择脚本日志的输出等级，低于所选等级的日志将全部输出。",
	options: [
		{ key: "OFF", label: "🔴 关闭" },
		{ key: "ERROR", label: "❌ 错误" },
		{ key: "WARN", label: "⚠️ 警告" },
		{ key: "INFO", label: "ℹ️ 信息" },
		{ key: "DEBUG", label: "🅱️ 调试" },
		{ key: "ALL", label: "全部" }
	]
};

export const panelSpotifyLogLevel: ArgumentItem = {
	...argLogLevel,
	options: [
		{ key: "OFF", label: "关闭" },
		{ key: "ERROR", label: "❌ 错误" },
		{ key: "WARN", label: "⚠️ 警告" },
		{ key: "INFO", label: "ℹ️ 信息" },
		{ key: "DEBUG", label: "🅱️ 调试" },
		{ key: "ALL", label: "全部" }
	]
};

export const moduleArgs: ArgumentItem[] = [argTypes, argLanguages0, argLanguages1, argVendor, argLrcVendor, argLogLevel];

export default defineConfig({ output, args: moduleArgs });
