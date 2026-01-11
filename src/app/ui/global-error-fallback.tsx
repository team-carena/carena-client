import type { FallbackProps } from "react-error-boundary";

export const GlobalErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
	return (
		<div>
			{/* 미처리 에러로 인한 앱 크래시를 방지하기 위한 전역 ErrorBoundary UI */}
			<h2>문제가 발생했습니다</h2>
			<button onClick={resetErrorBoundary}>다시 시도</button>
		</div>
	);
};
