import json from '@rollup/plugin-json';
import commonjs from "@rollup/plugin-commonjs";
import terser from '@rollup/plugin-terser';

export default [
	{
		input: 'src/Spotify.request.js',
		output: {
			file: 'js/Spotify.request.js',
			format: 'es',
			banner: '/* README: https://github.com/DualSubs */',
		},
		plugins: [json(), commonjs(), terser()]
	},
	{
		input: 'src/Spotify.response.js',
		output: {
			file: 'js/Spotify.response.js',
			format: 'es',
			banner: '/* README: https://github.com/DualSubs */',
		},
		plugins: [json(), commonjs(), terser()]
	},
];
