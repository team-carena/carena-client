import { Button } from "@shared/ui/buttons/button";
import { BottomSheet } from "@shared/ui/overlays/bottom-sheet/bottom-sheet";
import { overlay } from "overlay-kit";

const PrivacyConsentContent = () => (
	<div className="body04-r-14 flex flex-col gap-[2rem] text-gray-900">
		<p>
			CareNA는 「개인정보보호법」 제23조에 따라 건강정보에 해당하는 민감정보를
			아래와 같이 수집·이용합니다.
		</p>

		<section>
			<h3 className="label01-sb-14 mb-[0.8rem]">1. 수집·이용 목적</h3>
			<ul className="flex list-disc flex-col gap-[0.4rem] pl-[2rem]">
				<li>
					건강검진 결과의 분석 및 건강점수 산출(동일 검진일자 결과 수정 포함)
				</li>
				<li>AI 기술을 활용한 맞춤형 식단 추천 제공</li>
			</ul>
			<p className="mt-[0.4rem] pl-[0.4rem]">
				※ AI 분석 과정에서는 이름·생년월일 등{" "}
				<b>개인을 식별할 수 있는 정보가 제공되지 않습니다.</b>
			</p>
		</section>

		<section>
			<h3 className="label01-sb-14 mb-[0.8rem]">2. 수집 항목</h3>
			<ul className="list-disc pl-[2rem]">
				<li>
					건강검진 결과에 포함된 건강정보(사용자가 입력하거나 OCR로 추출 후
					저장한 정보)
				</li>
			</ul>
		</section>

		<section>
			<h3 className="label01-sb-14 mb-[0.8rem]">3. 보유 및 이용 기간</h3>
			<ul className="flex list-disc flex-col gap-[0.4rem] pl-[2rem]">
				<li>
					서비스 제공 목적 달성 시까지 보관하며 회원 탈퇴 시 즉시 파기하고,
					탈퇴하지 않은 경우에는 마지막 이용일 기준 최대 3년간 보관 후
					파기합니다. 단, 관련 법령에 따라 보관이 필요한 경우 해당 법령에서 정한
					기간을 따릅니다.
				</li>
			</ul>
			<p>
				{" "}
				※ 이용자는 민감정보 수집·이용에 대한 동의를 철회할 수 있으며, 동의
				철회는 회원 탈퇴를 통해 이루어집니다.
			</p>
		</section>

		<section>
			<h3 className="label01-sb-14 mb-[0.8rem]">
				4. 동의 거부 권리 및 불이익 안내
			</h3>
			<ul className="flex list-disc flex-col gap-[0.4rem] pl-[2rem]">
				<li>귀하는 민감정보 수집·이용에 대한 동의를 거부할 권리가 있습니다.</li>
				<li>
					단, 동의를 거부할 경우{" "}
					<b>
						검진 결과 저장 및 건강 분석 서비스, AI 맞춤 식단 추천 기능 이용이
						제한될 수 있습니다.
					</b>
				</li>
			</ul>
		</section>
	</div>
);

export const openPrivacyConsentSheet = (): Promise<boolean> => {
	return new Promise((resolve) => {
		overlay.open(({ isOpen, close }) => (
			<BottomSheet
				open={isOpen}
				onClose={() => {
					resolve(false);
					close();
				}}
				snapPoints={{ collapsed: "467px", expanded: "calc(100dvh - 40px)" }}
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
					<PrivacyConsentContent />
				</div>
			</BottomSheet>
		));
	});
};
