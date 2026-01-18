export const TempPage = () => {
	const handleSignUp = () => {
		// api 호출하고 성공하면
		// 그 성공을 트리거로 requestKakaoAuthorize 이걸 호출하기
	};

	return (
		<div>
			<p>회원가입 임시 페이지입니다!</p>
			<button
				onClick={handleSignUp}
				className="border border-primary-50 text-[3rem]"
			>
				{" "}
				저장{" "}
			</button>
		</div>
	);
};
