export const HTTP_STATUS = {
	OK: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	CONFLICT: 409,
	SERVER_ERROR: 500,
} as const;

export const RESPONSE_MESSAGE: Record<number, string> = {
	[HTTP_STATUS.OK]: "요청이 성공했습니다.",
	[HTTP_STATUS.CREATED]: "데이터가 성공적으로 생성되었습니다.",
	[HTTP_STATUS.BAD_REQUEST]: "잘못된 요청입니다. 입력값을 확인해주세요.",
	[HTTP_STATUS.NOT_FOUND]: "존재하지 않는 데이터입니다.",
	[HTTP_STATUS.UNAUTHORIZED]: "인증이 필요합니다. 로그인 후 다시 시도해주세요.",
	[HTTP_STATUS.FORBIDDEN]: "접근 권한이 없습니다.",
	[HTTP_STATUS.CONFLICT]: "이미 존재하는 데이터입니다.",
	[HTTP_STATUS.SERVER_ERROR]: "서버 내부 오류가 발생했습니다.",
};
