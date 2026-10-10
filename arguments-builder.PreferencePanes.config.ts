import { defineConfig } from "@nsnanocat/arguments-builder";
import { argLanguages0, argLanguages1, argTypes, panelSpotifyLogLevel } from "./arguments-builder.full.config.ts";

export const panels = [
	{ id: "DualSubs.Spotify", scope: "@DualSubs.Spotify.Settings", args: [argTypes, argLanguages0, argLanguages1, panelSpotifyLogLevel] },
];

export const devPanels = [
	{ id: "DualSubs.Spotify", scope: "@DualSubs.Spotify.Settings", args: [argTypes, argLanguages0, argLanguages1, panelSpotifyLogLevel] },
];

export default defineConfig({ args: panels[0].args });
