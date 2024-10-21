import { defineConfig } from "@iringo/arguments-builder";

export default defineConfig({
	output: {
		surge: {
			path: "./dist/Spotify.sgmodule",
		},
		loon: {
			path: "./dist/Spotify.plugin",
		},
		customItems: [
			{
				path: "./dist/Spotify.snippet",
				template: "./template/quantumultx.handlebars",
			},
			{
				path: "./dist/Spotify.stoverride",
				template: "./template/stash.handlebars",
			},
			{
				path: "./dist/Spotify.yaml",
				template: "./template/egern.handlebars",
			},
		],
		dts: {
			isExported: true,
			path: "./src/types.d.ts",
		},
		boxjsSettings: {
			path: "./template/boxjs.settings.json",
			scope: "@DualSubs.Spotify.Settings",
		},
	},
	args: [
		{
			key: "Switch",
			name: "总功能开关",
			defaultValue: true,
			type: "boolean",
			description: "是否启用此APP修改",
			exclude: ["surge", "loon"],
		},
		{
			key: "Types",
			name: "[歌词]启用类型（多选）",
			defaultValue: ["Translate", "External"],
			type: "array",
			options: [
				{
					key: "Translate",
					label: "翻译歌词（翻译器）",
				},
				{
					key: "External",
					label: "外部歌词（外部源）",
				},
			],
			description:
				"请选择要添加的歌词选项，如果为多选，则会自动决定提供的歌词类型。",
		},
		{
			key: "Vendor",
			name: "[翻译器]服务商API",
			defaultValue: "Google",
			type: "string",
			options: [
				{
					"key": "Google",
					"label": "Google Translate"
				},
				{
					"key": "Microsoft",
					"label": "Microsoft Translator（需填写API）"
				},
			],
			description: "请选择翻译器所使用的服务商API，更多翻译选项请使用BoxJs。",
		},
		{
			key: "LrcVendor",
			name: "[歌词]服务商API",
			defaultValue: "NeteaseMusic",
			type: "string",
			options: [
				{
					"key": "NeteaseMusic",
					"label": "网易云音乐（官方）"
				},
				{
					"key": "QQMusic",
					"label": "QQ音乐（官方）"
				},
				{
					"key": "NeteaseMusicNodeJS",
					"label": "网易云音乐 NodeJS API"
				},
			],
			description: "请选择外部源所使用的服务商API。",
		},
	],
});
