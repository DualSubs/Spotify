import json from '@rollup/plugin-json';
import commonjs from "@rollup/plugin-commonjs";

export default [
	{
		input: 'src/Spotify.request.beta.js',
		output: {
			file: 'js/Spotify.request.beta.js',
			format: 'es',
			banner: '/* README: https://github.com/DualSubs */',
		},
		plugins: [json(), commonjs()]
	},
	{
		input: 'src/Spotify.response.beta.js',
		output: {
			file: 'js/Spotify.response.beta.js',
			format: 'es',
			banner: '/* README: https://github.com/DualSubs */',
		},
		plugins: [json(), commonjs()]
	},
];
