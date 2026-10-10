import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const suffix = process.env.SETTINGS_CHANNEL === "dev" ? ".dev" : "";

test("module settings retain both proxy response protocols and bodyless HEAD detection", async () => {
	const expected = JSON.parse(await readFile(`dist/DualSubs.Spotify${suffix}.PreferencePanes.json`, "utf8"));
	const source = await readFile(`dist/config${suffix}.bundle.js`, "utf8");
	for (const method of ["GET", "HEAD"])
		for (const quantumult of [false, true]) {
			let result;
			vm.runInNewContext(source, {
				$request: { method },
				...(quantumult ? { $task: {} } : {}),
				$done: response => { result = quantumult ? response : response.response; },
			});
			assert.equal(result.status, quantumult ? "HTTP/1.1 200 OK" : 200);
			assert.ok(result.headers["X-PreferencePanes-Version"]);
			if (method === "HEAD") assert.equal(result.body, "");
			else assert.deepEqual(JSON.parse(result.body), expected);
		}
});

test("module templates intercept only their own configuration and leave backing downloads untouched", async () => {
	for (const suffix of ["", ".dev"])
		for (const platform of ["surge", "loon", "quantumultx", "stash"]) {
			const template = await readFile(`template/${platform}${suffix}.handlebars`, "utf8");
			const line = template.split("\n").find(line => line.includes("dualsubs\\.github\\.io") && line.includes("/api\\/Spotify"));
			const pattern = line.startsWith("response if") ? line.match(/~= \/(.+)\/[a-z]* then/)[1] : line.includes("pattern=") ? line.match(/pattern=([^,]+)/)[1] : line.match(/(\^https[^ ]+)/)[1];
			const regex = new RegExp(pattern);
			assert.ok(regex.test("https://dualsubs.github.io/api/Spotify?version=1"));
			for (const panel of ["Universal", "Composite", "Translate", "External", "API_Translate", "API_External", "YouTube", "Netflix", "Spotify"].filter(panel => panel !== "Spotify"))
				assert.equal(regex.test(`https://dualsubs.github.io/api/${panel}`), false, `${platform}${suffix}: ${panel}`);
			for (const [url] of template.matchAll(/https:\/\/[^\s"',)]+/g))
				assert.equal(regex.test(url), false, `${platform}${suffix}: download intercepted: ${url}`);
		}
});

test("bundled responses use complete language arrays and preserve argument precedence without Node globals", { timeout: 10000 }, async () => {
	const source = await readFile(`dist/response${suffix}.bundle.js`, "utf8");
	for (const objectArgument of [false, true])
		for (const storage of ["PersistentStore", "Argument"]) {
			const argument = { Storage: storage, Languages: ["EN", "FR"], LogLevel: "OFF" };
			const errors = [];
			const result = await new Promise(resolve => vm.runInNewContext(source, {
				URL,
				console: { log() {}, info() {}, debug() {}, warn() {}, error: (...args) => errors.push(args) },
				$environment: { "surge-version": "test" },
				$script: { startTime: Date.now() / 1000 },
				$argument: objectArgument ? argument : new URLSearchParams({ ...argument, Languages: "EN,FR" }).toString(),
				$persistentStore: { read: key => key === "DualSubs" ? JSON.stringify({ Spotify: { Settings: { Languages: ["EN", "JA"] } } }) : null },
				$request: { url: "https://spclient.wg.spotify.com/melody/v1/product_state", headers: {} },
				$response: { status: 200, headers: { "Content-Type": "application/json" }, body: '{"selected-language":"en"}' },
				$done: resolve,
			}));
			assert.deepEqual(errors, []);
			assert.equal(JSON.parse(result.body)["selected-language"], storage === "Argument" ? "fr" : "ja");
		}
});
