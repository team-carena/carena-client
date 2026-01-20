import { request } from "../request";

interface OcrResponse {
	height: number;
	weight: number;
	waistCircumference: number;
	bmi: number;
	systolicBp: number;
	diastolicBp: number;
	hemoglobin: number;
	fastingGlucose: number;
	totalCholesterol: number;
	hdl: number;
	ldl: number;
	triglyceride: number;
	serumCreatinine: number;
	egfr: number;
	ast: number;
	alt: number;
	gammaGtp: number;
}

export const postOcr = (file: File) => {
	const formData = new FormData();
	formData.append("image", file);

	return request<OcrResponse>({
		method: "POST",
		url: "/health-report/ocr",
		body: formData,
	});
};
