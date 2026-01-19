import { useRef } from "react";
import { useLocation } from "react-router";
import Tesseract from "tesseract.js";
import { OcrButton } from "@/shared/ui/buttons/ocr-button";
import { parseOcrText } from "../libs/parse-ocr-text";

type OcrSectionProps = {
	onOcrComplete?: (data: Record<string, string>) => void;
};

export const OcrSection = ({ onOcrComplete }: OcrSectionProps) => {
	const location = useLocation();
	const isSignUp = location.pathname === "/signup";

	const fileInputRef = useRef<HTMLInputElement>(null);

	// 버튼 클릭 -> 파일 선택창 열기
	const handleOcrButtonClick = () => {
		fileInputRef.current?.click();
	};

	// 이미지 선택 후 OCR 실행
	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const { data } = await Tesseract.recognize(file, "kor+eng", {
			logger: (m) => console.log(m), // 인식 진행 상황을 추적
		});

		const text = data.text;
		console.log("OCR RESULT:", text);

		const parsedData = parseOcrText(text);

		onOcrComplete?.(parsedData); // 파싱된 데이터를 상위로 전달

		// 같은 이미지 다시 선택 가능하게 초기화
		e.target.value = "";
	};

	return (
		<section className="mx-auto pt-[2.4rem]">
			<div className="mb-[2.4rem] flex flex-col items-center gap-[0.9rem]">
				{isSignUp && (
					<p className="head01-b-18">검진 결과 입력하고 케어나 시작하기</p>
				)}
				<p className="body04-r-14">
					결과값이 기억나지 않는 항목은 비워둬도 괜찮아요
				</p>
			</div>

			<input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				hidden
				onChange={handleFileChange}
			/>

			<OcrButton onClick={handleOcrButtonClick} />
		</section>
	);
};
