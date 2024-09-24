import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default [
	{
		input: "src/Spotify.request.js",
		output: {
			file: "js/Spotify.request.js",
			format: "es",
			banner: "/* README: https://github.com/DualSubs */\nconsole.log('🍿 DualSubs: 🎵 Spotify Request')",
		},
		plugins: [json(), commonjs(), nodeResolve(), terser()]
	},
	{
		input: "src/Spotify.response.js",
		output: {
			file: "js/Spotify.response.js",
			format: "es",
			banner: "/* README: https://github.com/DualSubs */\nconsole.log('🍿 DualSubs: 🎵 Spotify Response')",
		},
		plugins: [json(), commonjs(), nodeResolve(), terser()]
	},
];
