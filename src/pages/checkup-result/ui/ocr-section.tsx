import { useRef } from "react";
import { useLocation } from "react-router";
import { ROUTE_PATH } from "@/app/routes/paths";
import { postOcr } from "@/pages/checkup-result/apis/post-ocr";
import { OcrButton } from "@/shared/ui/buttons/ocr-button";

type OcrSectionProps = {
	onOcrComplete?: (data: Record<string, string>) => void;
};

export const OcrSection = ({ onOcrComplete }: OcrSectionProps) => {
	const location = useLocation();
	const isSignUp = location.pathname === ROUTE_PATH.SIGNUP;
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleOcrButtonClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		try {
			const data = await postOcr(file);

			// 서버에서 number로 내려오므로 Signup setValue용으로 string 변환
			const stringifiedData = Object.fromEntries(
				Object.entries(data).map(([key, value]) => [
					key,
					value != null ? String(value) : "",
				]),
			);
			onOcrComplete?.(stringifiedData);
		} catch (err) {
			console.error(err);
		} finally {
			e.target.value = "";
		}
	};

	return (
		<section className="mx-auto w-full bg-white pt-[2.4rem]">
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
				className="sr-only"
				aria-label="검진 결과지 이미지 선택"
				onChange={handleFileChange}
			/>

			<OcrButton onClick={handleOcrButtonClick} />
		</section>
	);
};
