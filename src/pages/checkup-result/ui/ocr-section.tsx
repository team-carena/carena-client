import { useRef, useState } from "react";
import { useLocation } from "react-router";
import { ROUTE_PATH } from "@/app/routes/paths";
import { postHealthReportOcr } from "@/pages/checkup-result/apis/post-health-report-ocr";
import { OcrButton } from "@/shared/ui/buttons/ocr-button";
import { openModal } from "@/shared/ui/overlays/modal/open-modal";
import { notifyError } from "@/shared/ui/overlays/toast/toast";
import { FullScreenOcrLoading } from "./full-screen-ocr-loading";

type OcrSectionProps = {
	onOcrComplete?: (data: Record<string, string>) => void;
};

export const OcrSection = ({ onOcrComplete }: OcrSectionProps) => {
	const location = useLocation();
	const isSignUp = location.pathname === ROUTE_PATH.SIGNUP;
	const isEdit = location.pathname === ROUTE_PATH.CHECKUP_RESULT_EDIT;
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [isOcrLoading, setIsOcrLoading] = useState(false);

	const handleOcrButtonClick = () => {
		openModal({
			title: "OCR 기능 안내",
			description: (
				<>
					• OCR 기능은 검진 결과 입력을 돕기 위한 텍스트 추출 용도로만
					사용됩니다.
					{"\n\n"}• 업로드된 이미지는 네이버 클라우드 OCR을 통해 일시적으로
					처리되며, 텍스트 추출 후 즉시 폐기됩니다.
					{"\n\n"}• 추출된 텍스트는 저장 시에만 분석 및 서비스 제공 목적으로
					이용됩니다.
					{"\n\n"}• OCR 결과에는 일부 오류가 있을 수 있으므로,{" "}
					<span className="text-primary-400">
						저장 전 반드시 내용을 확인해 주세요.
					</span>
					{"\n\n"}• 원활한 인식을 위해{" "}
					<span className="text-primary-400">검진 결과서 두 번째 페이지를</span>{" "}
					캡처하여 등록해 주세요.
				</>
			),
			secondaryAction: {
				label: "취소",
				onClick: () => {},
			},
			primaryAction: {
				label: "확인",
				onClick: () => {
					fileInputRef.current?.click();
				},
			},
		});
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setIsOcrLoading(true);

		try {
			const data = await postHealthReportOcr(file);

			const stringifiedData = Object.fromEntries(
				Object.entries(data).map(([key, value]) => [
					key,
					value != null ? String(value) : "",
				]),
			);

			onOcrComplete?.(stringifiedData);
		} catch (_err) {
			notifyError("OCR 변환에 실패했어요. 잠시 후 다시 시도해 주세요.");
		} finally {
			setIsOcrLoading(false);
			e.target.value = "";
		}
	};

	return (
		<>
			{isOcrLoading && <FullScreenOcrLoading />}
			<section className="mx-auto w-full bg-white pt-[calc(var(--header-height)+2.4rem)]">
				<div className="mb-[2.4rem] flex flex-col items-center gap-[0.8rem]">
					{isSignUp && (
						<p className="head01-b-18">검진 결과 입력하고 케어나 시작하기</p>
					)}

					{isEdit && (
						<p className="body04-r-14 text-center">
							해당 일자에 동의한 민감정보 이용 범위 내에서 관리됩니다
						</p>
					)}
					<p className="body04-r-14 text-center">
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
		</>
	);
};
