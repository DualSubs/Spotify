import { _, log } from "../utils/utils.mjs";

export default function modifiedAccountAttributes(accountAttributes = {}) {
	accountAttributes["audiobook-onboarding-completed"] = {
		value: { oneofKind: "boolValue", boolValue: true },
	}; // false
	accountAttributes["has-audiobooks-subscription"] = {
		value: { oneofKind: "boolValue", boolValue: true },
	}; // false
	accountAttributes["player-license"] = {
		value: { oneofKind: "stringValue", stringValue: "premium" },
	}; // "mft"
	/*
	accountAttributes["country_code"] = {
		value: { oneofKind: "stringValue", stringValue: Settings.Country },
	};
	*/
	accountAttributes["mobile"] = {
		value: { oneofKind: "boolValue", boolValue: true },
	}; // false
	accountAttributes["financial-product"] = {
		value: { oneofKind: "stringValue", stringValue: "pr:premium,tc:0" },
	}; // "pr:free,tc:0"
	accountAttributes["premium-mini"] = {
		value: { oneofKind: "boolValue", boolValue: true },
	}; // false
	accountAttributes["streaming-rules"] = {
		value: { oneofKind: "stringValue", stringValue: "" },
	}; // "shuffle-mode"
	accountAttributes["license-acceptance-grace-days"] = {
		value: { oneofKind: "longValue", longValue: 30 },
	}; // "0"
	accountAttributes["name"] = {
		value: { oneofKind: "stringValue", stringValue: "Spotify Premium" },
	}; // "Spotify Free"
	accountAttributes["mobile-login"] = {
		value: { oneofKind: "boolValue", boolValue: true },
	}; // false
	accountAttributes["hifi-optin-intent"] = {
		value: { oneofKind: "boolValue", boolValue: true },
	}; // false
	accountAttributes["pick-and-shuffle"] = {
		value: { oneofKind: "boolValue", boolValue: false },
	}; // true
	accountAttributes["on-demand"] = {
		value: { oneofKind: "boolValue", boolValue: true },
	}; // false
	accountAttributes["ads"] = {
		value: { oneofKind: "boolValue", boolValue: false },
	}; // true
	accountAttributes["catalogue"] = {
		value: { oneofKind: "stringValue", stringValue: "premium" },
	}; // "free"
	accountAttributes["high-bitrate"] = {
		value: { oneofKind: "boolValue", boolValue: true },
	}; // false
	accountAttributes["libspotify"] = {
		value: { oneofKind: "boolValue", boolValue: true },
	}; // false
	accountAttributes["nft-disabled"] = {
		value: { oneofKind: "stringValue", stringValue: "1" },
	}; // "0"
	accountAttributes["shuffle"] = {
		value: { oneofKind: "boolValue", boolValue: false },
	}; // true
	accountAttributes["audio-quality"] = {
		value: { oneofKind: "stringValue", stringValue: "1" },
	}; // "0"
	accountAttributes["offline"] = {
		value: { oneofKind: "boolValue", boolValue: true },
	}; // false
	accountAttributes["hifi-eligible"] = {
		value: { oneofKind: "boolValue", boolValue: true },
	}; // false
	accountAttributes["pause-after"] = {
		value: { oneofKind: "longValue", longValue: 0 },
	}; // "18000"
	accountAttributes["addon-hifi"] = {
		value: { oneofKind: "boolValue", boolValue: true },
	}; // false
	accountAttributes["can_use_superbird"] = {
		value: { oneofKind: "boolValue", boolValue: true },
	}; // false
	accountAttributes["type"] = {
		value: { oneofKind: "stringValue", stringValue: "premium" },
	}; // "free"
	accountAttributes["india-experience"] = {
		value: { oneofKind: "stringValue", stringValue: "1" },
	}; // "0"
	accountAttributes["loudness-levels"] = {
		value: { oneofKind: "stringValue", stringValue: "1:-9.0,0.0,3.0:-2.0" },
	};
	accountAttributes["payments-initial-campaign"] = {
		value: { oneofKind: "stringValue", stringValue: "web" },
	};
	accountAttributes["shuffle-eligible"] = {
		value: { oneofKind: "boolValue", boolValue: true },
	};
	accountAttributes["unrestricted"] = {
		value: { oneofKind: "boolValue", boolValue: true },
	};
	accountAttributes["com.spotify.madprops.use.ucs.product.state"] = {
		value: { oneofKind: "boolValue", boolValue: false },
	};
	return accountAttributes;
}
