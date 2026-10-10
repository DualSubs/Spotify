import { defineConfig } from "@nsnanocat/arguments-builder";
import { moduleArgs } from "./arguments-builder.full.config.ts";

export default defineConfig({
	output: {
		surge: {
			path: "./dist/DualSubs.Spotify.dev.sgmodule",
			template: "./template/surge.dev.handlebars",
			transformEgern: {
				enable: true,
				path: "./dist/DualSubs.Spotify.dev.yaml"
			}
		},
		loon: {
			path: "./dist/DualSubs.Spotify.dev.plugin",
			template: "./template/loon.dev.handlebars"
		},
		customItems: [
			{
				path: "./dist/DualSubs.Spotify.dev.snippet",
				template: "./template/quantumultx.dev.handlebars"
			},
			{
				path: "./dist/DualSubs.Spotify.dev.stoverride",
				template: "./template/stash.dev.handlebars"
			}
		],
		boxjsSettings: {
			path: "./dist/DualSubs.Spotify.dev.boxjs.json",
			scope: "@DualSubs.Spotify.Settings"
		}
	},
	args: moduleArgs,
});
