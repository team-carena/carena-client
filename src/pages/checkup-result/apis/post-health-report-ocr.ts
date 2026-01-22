import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type { ExtractedTextView } from "../../../shared/apis/generated/data-contracts";
import { HTTP_METHOD, request } from "../../../shared/apis/request";

export const postHealthReportOcr = (file: File) => {
	const formData = new FormData();
	formData.append("image", file);

	return request<ExtractedTextView>({
		method: HTTP_METHOD.POST,
		url: API_ENDPOINTS.healthReport.ocr,
		body: formData,
	});
};
