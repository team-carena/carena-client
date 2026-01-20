// 윤년 체크 함수
export const isLeapYear = (year: number): boolean =>
	(year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

// 해당 월의 최대 일수 반환
export const getDaysInMonth = (year: number, month: number): number => {
	const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if (month === 2 && isLeapYear(year)) return 29;
	return daysInMonth[month - 1];
};

// 유효한 날짜인지 검사
export const isValidDate = (
	year: number,
	month: number,
	day: number,
): boolean => {
	if (month < 1 || month > 12) return false;
	if (day < 1 || day > getDaysInMonth(year, month)) return false;
	return true;
};
