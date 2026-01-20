export const healthTipQueryKeys = {
	all: ["health-tip"] as const,
	list: (hashtagName?: string) =>
		[...healthTipQueryKeys.all, "list", hashtagName ?? "all"] as const,
};
