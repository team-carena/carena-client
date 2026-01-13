import "@app/styles/global.css";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Modal } from "@/shared/ui/modals/modal";
import { AppProvider } from "./providers/app-provider";
import { GlobalErrorFallback } from "./ui/global-error-fallback";

export const App = () => {
	const [modal1, setModal1] = useState(false);
	const [modal2, setModal2] = useState(false);
	const [modal3, setModal3] = useState(false);
	const [modal4, setModal4] = useState(false);
	const [modal5, setModal5] = useState(false);
	const [modal6, setModal6] = useState(false);

	return (
		<ErrorBoundary FallbackComponent={GlobalErrorFallback}>
			<AppProvider />

			{/* 테스트 버튼들 */}
			<div className="fixed bottom-4 left-4 flex flex-col gap-2 z-40">
				<button
					type="button"
					className="bg-blue-500 text-white px-4 py-2 rounded"
					onClick={() => setModal1(true)}
				>
					Large + 2버튼
				</button>
				<button
					type="button"
					className="bg-blue-500 text-white px-4 py-2 rounded"
					onClick={() => setModal2(true)}
				>
					Large + 1버튼
				</button>
				<button
					type="button"
					className="bg-blue-500 text-white px-4 py-2 rounded"
					onClick={() => setModal3(true)}
				>
					Small + 2버튼
				</button>
				<button
					type="button"
					className="bg-blue-500 text-white px-4 py-2 rounded"
					onClick={() => setModal4(true)}
				>
					Small + 1버튼
				</button>
				<button
					type="button"
					className="bg-green-500 text-white px-4 py-2 rounded"
					onClick={() => setModal5(true)}
				>
					OCR 동의서
				</button>
				<button
					type="button"
					className="bg-green-500 text-white px-4 py-2 rounded"
					onClick={() => setModal6(true)}
				>
					개인정보 수집
				</button>
			</div>

			{/* Large + 2버튼 */}
			<Modal
				open={modal1}
				size="lg"
				title="모달 타이틀"
				description={"모달 설명입니다.\n여러 줄도 지원합니다."}
				primaryAction={{
					label: "확인",
					onClick: () => setModal1(false),
				}}
				secondaryAction={{
					label: "취소",
					onClick: () => setModal1(false),
				}}
				onClose={() => setModal1(false)}
			/>

			{/* Large + 1버튼 */}
			<Modal
				open={modal2}
				size="lg"
				title="알림"
				description="저장이 완료되었습니다."
				primaryAction={{
					label: "확인",
					onClick: () => setModal2(false),
				}}
				onClose={() => setModal2(false)}
			/>

			{/* Small + 2버튼 */}
			<Modal
				open={modal3}
				size="sm"
				description="정말 삭제하시겠습니까?"
				primaryAction={{
					label: "삭제",
					onClick: () => setModal3(false),
				}}
				secondaryAction={{
					label: "취소",
					onClick: () => setModal3(false),
				}}
				onClose={() => setModal3(false)}
			/>

			{/* Small + 1버튼 */}
			<Modal
				open={modal4}
				size="sm"
				description="처리가 완료되었습니다."
				primaryAction={{
					label: "확인",
					onClick: () => setModal4(false),
				}}
				onClose={() => setModal4(false)}
			/>

			{/* OCR 동의서 (긴 텍스트) */}
			<Modal
				open={modal5}
				size="lg"
				title="OCR 사용 동의서"
				description={`• OCR 기능은 검진 결과 입력을 돕기 위한 텍스트 추출 용도로만 사용됩니다.

• 이미지는 추출 즉시 폐기되며, 추출된 텍스트는 저장 시에만 분석 목적으로 이용됩니다.

• 일부 수치는 정확하지 않을 수 있으니 저장 전 확인해 주세요.

• 원활한 인식을 위해 검진 결과서 2페이지를 캡처하여 등록해 주세요.`}
				primaryAction={{
					label: "동의",
					onClick: () => setModal5(false),
				}}
				secondaryAction={{
					label: "취소",
					onClick: () => setModal5(false),
				}}
				onClose={() => setModal5(false)}
			/>

			{/* 개인정보 수집 (더 긴 텍스트) */}
			<Modal
				open={modal6}
				size="lg"
				title="개인정보 수집·이용 내용"
				description={`건강점수 제공을 위해 검진 정보를 수집·이용합니다.
보관기간은 최대 3년이며, 언제든 삭제할 수 있습니다.

1. 수집·이용 목적
• 건강검진 결과의 해석 및 건강점수 제공
• 과거 검진 결과와의 비교 분석
• 개인 맞춤형 건강 정보 제공

2. 수집 항목
• 계정 정보
  • 카카오 로그인 정보(고유 식별자)
  • 사용자 기본정보: 이름, 생년월일, 성별
  • 개인정보 수집·이용 동의 일시

• 건강검진 정보
  • 신체계측, 혈압, 혈액검사 수치 등
  • 사용자가 직접 입력하거나 OCR로 추출 후 저장한 검진 결과

3. 보유 및 이용 기간
• 서비스 제공 목적 달성 시까지 보관하며, 마지막 로그인 후 3년 경과 시 자동 삭제됩니다.
건강점수 제공을 위해 검진 정보를 수집·이용합니다.
보관기간은 최대 3년이며, 언제든 삭제할 수 있습니다.

1. 수집·이용 목적
• 건강검진 결과의 해석 및 건강점수 제공
• 과거 검진 결과와의 비교 분석
• 개인 맞춤형 건강 정보 제공

2. 수집 항목
• 계정 정보
  • 카카오 로그인 정보(고유 식별자)
  • 사용자 기본정보: 이름, 생년월일, 성별
  • 개인정보 수집·이용 동의 일시

• 건강검진 정보
  • 신체계측, 혈압, 혈액검사 수치 등
  • 사용자가 직접 입력하거나 OCR로 추출 후 저장한 검진 결과

3. 보유 및 이용 기간
• 서비스 제공 목적 달성 시까지 보관하며, 마지막 로그인 후 3년 경과 시 자동 삭제됩니다.`}
				primaryAction={{
					label: "확인",
					onClick: () => setModal6(false),
				}}
				onClose={() => setModal6(false)}
			/>
		</ErrorBoundary>
	);
};
