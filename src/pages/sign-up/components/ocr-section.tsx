import { useLocation } from "react-router";
import { OcrButton } from "@/shared/ui/buttons/ocr-button";

export const OcrSection = () => {
	const location = useLocation();
	const isSignUp = location.pathname === "/signup";

	return (
		<div className="mx-auto pt-[2.4rem]">
			<div className="mb-[2.4rem] flex flex-col items-center gap-[0.9rem]">
				{isSignUp && (
					<p className="head01-b-18">검진 결과 입력하고 케어나 시작하기</p>
				)}
				<p className="body04-r-14">
					결과값이 기억나지 않는 항목은 비워둬도 괜찮아요
				</p>
			</div>
			<OcrButton />
		</div>
	);
};
