export const extractValue = (text: string, labels: string[]) => {
	for (const label of labels) {
		const regex = new RegExp(`${label}\\s*[:]?\\s*([0-9]+(?:\\.[0-9]+)?)`, "i");
		const match = text.match(regex);
		if (match) return match[1];
	}
	return "";
};
