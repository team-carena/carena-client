import { Button } from "@shared/ui/buttons/button";
import { BottomSheet } from "@shared/ui/overlays/bottom-sheet/bottom-sheet";
import { overlay } from "overlay-kit";

const PRIVACY_CONSENT_TEXT = `케어나(이하 '서비스')는 이용자의 건강 정보를 안전하게 보호하기 위해 아래와 같이 민감정보를 수집·이용합니다.

1. 수집하는 민감정보 항목
- 건강검진 결과(검진일자, 검진기관, 검사 수치 등)

2. 민감정보의 수집·이용 목적
- 건강검진 결과 분석 및 맞춤형 건강 정보 제공
- 서비스 개선 및 신규 서비스 개발

3. 민감정보의 보유 및 이용 기간
- 회원 탈퇴 시까지 또는 동의 철회 시까지
- 단, 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관

4. 동의 거부권 및 불이익
- 이용자는 민감정보 수집·이용에 대한 동의를 거부할 권리가 있습니다.
- 다만, 필수 항목에 대한 동의를 거부하실 경우 서비스 이용이 제한됩니다.`;

export const openPrivacyConsentSheet = (): Promise<boolean> => {
	return new Promise((resolve) => {
		overlay.open(({ isOpen, close }) => (
			<BottomSheet
				open={isOpen}
				onClose={() => {
					resolve(false);
					close();
				}}
				snapPoints={{ collapsed: "467px", expanded: "779px" }}
				footer={
					<>
						<Button
							size="lg"
							onClick={() => {
								resolve(true);
								close();
							}}
						>
							동의
						</Button>
						<button
							type="button"
							className="label04-r-16 py-[1.2rem] text-gray-700"
							onClick={() => {
								resolve(false);
								close();
							}}
						>
							미동의(저장 불가)
						</button>
					</>
				}
			>
				<div className="flex flex-col gap-[2rem]">
					<h2 className="label01-sb-14 text-center text-gray-900">
						[필수] 민감정보(건강정보) 수집·이용 동의
					</h2>
					<p className="body04-r-14 whitespace-pre-wrap text-gray-900">
						{PRIVACY_CONSENT_TEXT}
					</p>
				</div>
			</BottomSheet>
		));
	});
};
