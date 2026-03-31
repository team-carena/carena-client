import { trackEvent } from "./gtag";

const GA_EVENTS = {
	KAKAO_LOGIN_CLICK: "kakao_login_click",
	SIGNUP_COMPLETE: "signup_complete",
	CHECKUP_SUBMIT: "checkup_submit",
	CHECKUP_EDIT: "checkup_edit",
	OCR_UPLOAD_COMPLETE: "ocr_upload_complete",
	HEALTH_ANALYSIS_VIEW: "health_analysis_view",
	HEALTH_REPORT_VIEW: "health_report_view",
	HOSPITAL_SEARCH_VIEW: "hospital_search_view",
	LOGOUT: "logout",
	WITHDRAWAL: "withdrawal",
} as const;

export const trackKakaoLoginClick = () => {
	trackEvent(GA_EVENTS.KAKAO_LOGIN_CLICK);
};

export const trackSignupComplete = () => {
	trackEvent(GA_EVENTS.SIGNUP_COMPLETE);
};

export const trackCheckupSubmit = () => {
	trackEvent(GA_EVENTS.CHECKUP_SUBMIT);
};

export const trackCheckupEdit = () => {
	trackEvent(GA_EVENTS.CHECKUP_EDIT);
};

export const trackOcrUploadComplete = () => {
	trackEvent(GA_EVENTS.OCR_UPLOAD_COMPLETE);
};

export const trackHealthAnalysisView = () => {
	trackEvent(GA_EVENTS.HEALTH_ANALYSIS_VIEW);
};

export const trackHealthReportView = (type: string) => {
	trackEvent(GA_EVENTS.HEALTH_REPORT_VIEW, { report_type: type });
};

export const trackHospitalSearchView = () => {
	trackEvent(GA_EVENTS.HOSPITAL_SEARCH_VIEW);
};

export const trackLogout = () => {
	trackEvent(GA_EVENTS.LOGOUT);
};

export const trackWithdrawal = () => {
	trackEvent(GA_EVENTS.WITHDRAWAL);
};
