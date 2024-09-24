import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default [
	{
		input: "src/Spotify.request.beta.js",
		output: {
			file: "js/Spotify.request.beta.js",
			format: "es",
			banner: "/* README: https://github.com/DualSubs */\nconsole.log('🍿 DualSubs: 🎵 Spotify β Request')",
		},
		plugins: [json(), commonjs(), nodeResolve()]
	},
	{
		input: "src/Spotify.response.beta.js",
		output: {
			file: "js/Spotify.response.beta.js",
			format: "es",
			banner: "/* README: https://github.com/DualSubs */\nconsole.log('🍿 DualSubs: 🎵 Spotify β Response')",
		},
		plugins: [json(), commonjs(), nodeResolve()]
	},
];
