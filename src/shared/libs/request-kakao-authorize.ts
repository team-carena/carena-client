// 카카오 인가 코드 요청 유틸함수
export const requestKakaoAuthorize = () => {
	const url = "https://api.care-na.com/oauth2/authorization/kakao";
	window.location.assign(url);
};
