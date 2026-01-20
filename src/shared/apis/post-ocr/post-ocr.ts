import type { ExtractedTextView } from "../generated/data-contracts";
import { request } from "../request";

export const postOcr = (file: File) => {
	const formData = new FormData();
	formData.append("image", file);

	return request<ExtractedTextView>({
		method: "POST",
		url: "/health-report/ocr",
		body: formData,
	});
};
