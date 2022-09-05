const env = process.env.NODE_ENV || "development";

let cache;

const config = () => {
	if (!cache) {
		cache = Object.freeze({
			env,
			secrets: {
				apiHost:
					process.env.REACT_APP_ENVIRONMENT === "development"
						? "https://core-staging.smartdeals.com.ng"
						: "https://core.smartdeals.com.ng",
			},
		});
	}
	return cache;
};

export default config;
