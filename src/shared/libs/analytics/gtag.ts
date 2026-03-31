import "./types";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as
	| string
	| undefined;

export const initGA = () => {
	if (!GA_MEASUREMENT_ID) return;

	const script = document.createElement("script");
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
	document.head.appendChild(script);

	window.dataLayer = window.dataLayer || [];
	window.gtag = function () {
		// biome-ignore lint/complexity/noArguments: GA4 requires native Arguments object for internal type checking
		window.dataLayer.push(arguments);
	};
	window.gtag("js", new Date());
	window.gtag("config", GA_MEASUREMENT_ID, {
		send_page_view: false,
	});
};

export const trackPageView = (path: string) => {
	if (!GA_MEASUREMENT_ID) return;
	window.gtag("config", GA_MEASUREMENT_ID, {
		page_path: path,
	});
};

export const trackEvent = (
	eventName: string,
	params?: Record<string, string | number | boolean>,
) => {
	if (!GA_MEASUREMENT_ID) return;
	window.gtag("event", eventName, params);
};
