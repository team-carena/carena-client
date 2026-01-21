// 이름 유효성 검사: 완성형 한글만 허용
// 가-힣 범위는 완성형 한글만 포함 (ㄱ-ㅎ 자음, ㅏ-ㅣ 모음은 포함 X)
// 빈 문자열은 true 반환 → min(1)에서 처리
export const isValidName = (name: string): boolean => {
	if (name === "") return true;
	const validPattern = /^[가-힣\s]+$/;
	return validPattern.test(name);
};
