export const toNumberOrUndefined = (
	value?: string | number,
): number | undefined => {
	if (value === undefined || value === null) return undefined;
	const normalized = typeof value === "string" ? value.trim() : String(value);
	if (normalized === "") return undefined;
	const num = Number(normalized);
	return Number.isFinite(num) ? num : undefined;
};
