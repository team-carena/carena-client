// tos(terms-of-services), 약관동의 페이지

import { trackSignupComplete } from "@shared/libs/analytics";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useLocation, useNavigate } from "react-router";
import { ROUTE_PATH } from "@/app/routes/paths";
import { useSignUp } from "@/pages/signup/apis/mutations/use-signup";
import { requestKakaoAuthorize } from "@/shared/libs/request-kakao-authorize";
import { Button } from "@/shared/ui/buttons/button";
import { CheckBox } from "@/shared/ui/check-box/check-box";
import { Header } from "@/shared/ui/navigations/header";
import { openModal } from "@/shared/ui/overlays/modal/open-modal";
import { notifyError } from "@/shared/ui/overlays/toast/toast";

type SignupNavigationState = {
	name: string;
	birthdate: string;
	gender: "MALE" | "FEMALE";
};

const SERVICE_TERMS_TEXT = `시행일자: 2026년 4월 1일

### 제1조(목적)

본 약관은 CareNA(이하 "회사")가 제공하는 건강 정보 관리 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

### 제2조(용어의 정의)

본 약관에서 사용하는 용어의 정의는 다음과 같습니다.

1. **서비스**

    회사가 제공하는 건강검진 결과 기록 및 관리, 건강 정보 제공 등의 모바일 웹 기반 서비스

2. **이용자**

    본 약관에 따라 회사가 제공하는 서비스를 이용하는 회원

3. **건강검진 결과**

    이용자가 직접 입력하거나 이미지 업로드(OCR)를 통해 등록한 건강검진 관련 정보


### 제3조(약관의 효력 및 변경)

1. 본 약관은 서비스 화면에 게시하거나 기타 방법으로 이용자에게 공지함으로써 효력이 발생합니다.
2. 회사는 관련 법령을 위반하지 않는 범위에서 본 약관을 변경할 수 있습니다.
3. 약관이 변경되는 경우 회사는 적용일자 및 변경 내용을 서비스 내 공지사항을 통해 사전에 공지합니다.
4. 이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단하고 탈퇴를 요청할 수 있습니다.
5. 이용자가 변경된 약관의 적용일 이후에도 서비스를 계속 이용하는 경우 변경된 약관에 동의한 것으로 간주합니다.

### 제4조(서비스의 내용)

회사가 제공하는 서비스는 다음과 같습니다.

1. 건강검진 결과 입력 및 관리 서비스
2. 건강검진 결과 기반 정보 제공 서비스
3. 건강 관련 정보 제공 서비스
4. 기타 회사가 추가로 제공하는 서비스

회사는 서비스 내용의 일부를 변경하거나 추가할 수 있습니다.

### 제5조(회원가입)

1. 이용자는 카카오 계정을 이용한 로그인 방식으로 회원가입을 할 수 있으며, 카카오 계정의 인증 및 관리에 관한 사항은 카카오의 정책을 따릅니다.
2. 이용자는 회원가입 시 정확한 정보를 제공해야 합니다.
3. 회사는 다음의 경우 회원가입을 거절할 수 있습니다.
    - 타인의 정보를 도용한 경우
    - 허위 정보를 입력한 경우
    - 법령 또는 약관을 위반한 이력이 있는 경우
    - 기타 회사가 서비스 제공이 어렵다고 판단하는 경우

### 제6조(회원 탈퇴 및 이용계약 해지)

1. 이용자는 언제든지 서비스 내 기능을 통해 회원 탈퇴를 요청할 수 있습니다.
2. 회사는 이용자가 다음에 해당하는 경우 이용계약을 해지할 수 있습니다.
    - 약관을 위반한 경우
    - 서비스 운영을 방해하는 경우
    - 불법적인 목적으로 서비스를 이용하는 경우

### 제7조(서비스 제공)

1. 서비스는 원칙적으로 연중무휴 24시간 제공됩니다.
2. 다만 다음의 경우 서비스 제공이 일시적으로 중단될 수 있습니다.
    - 시스템 점검
    - 서버 장애
    - 서비스 개선 작업
    - 기타 불가피한 사유

### 제8조(건강검진 결과 입력)

1. 이용자는 자신의 건강검진 결과를 직접 입력하거나 이미지 업로드(OCR) 방식으로 등록할 수 있습니다.
2. 이용자가 등록한 건강검진 정보는 이용자의 책임 하에 입력되는 정보이며, 회사는 해당 정보의 정확성 또는 완전성을 보장하지 않습니다.
3. 회사는 이미지 인식(OCR) 기술의 특성상 발생할 수 있는 정보 인식 오류 또는 누락에 대해 책임을 지지 않습니다.

### 제9조(서비스의 범위 및 한계)

회사가 제공하는 서비스는 **건강 정보 관리 및 참고용 정보 제공 서비스**이며 다음에 해당하지 않습니다.

1. 의료행위
2. 의학적 진단
3. 치료 또는 처방

이용자는 건강 관련 의사결정을 위해 반드시 의료 전문가의 상담을 받아야 합니다.

### 제10조(이용자의 의무)

이용자는 다음 행위를 해서는 안 됩니다.

1. 타인의 개인정보 도용
2. 서비스의 정상적인 운영을 방해하는 행위
3. 불법적인 목적으로 서비스를 이용하는 행위
4. 회사의 지적재산권을 침해하는 행위

### 제11조(서비스의 변경 및 종료)

1. 회사는 서비스의 운영상 또는 기술상 필요에 따라 서비스의 일부 또는 전부를 변경하거나 종료할 수 있습니다.

2. 서비스의 변경 또는 종료로 인해 이용자에게 발생한 손해에 대해 회사는 책임을 지지 않습니다.

### 제12조(지적재산권)

1. 서비스에 포함된 콘텐츠 및 시스템에 대한 지적재산권은 회사에 귀속됩니다.
2. 이용자는 회사의 사전 동의 없이 이를 복제, 배포, 수정할 수 없습니다.

### 제13조(면책조항)

1. 회사는 천재지변, 서버 장애 등 불가항력적인 사유로 인한 서비스 중단에 대해 책임을 지지 않습니다.
2. 회사는 이용자가 직접 입력하거나 업로드한 건강검진 정보의 정확성 또는 신뢰성에 대해 책임을 지지 않습니다.
3. 회사는 서비스 이용 과정에서 제공되는 정보로 인해 이용자에게 발생한 손해에 대해 책임을 지지 않습니다.
4. 회사는 OpenAI 등 인공지능(AI) 기술을 활용하여 건강검진 결과에 대한 정보 제공 기능을 제공할 수 있습니다. 다만 해당 정보는 일반적인 건강 정보 제공을 위한 참고 자료이며 의료적 진단, 치료 또는 전문적인 의료 상담을 대체하지 않습니다. 이용자는 서비스에서 제공되는 정보를 참고용으로만 활용해야 하며, 건강 관련 의사결정은 반드시 의료 전문가와 상담해야 합니다.
5. 회사는 이용자의 귀책사유로 인해 발생한 서비스 이용 장애 또는 손해에 대해 책임을 지지 않습니다.
6. 회사는 카카오 로그인 등 외부 서비스의 장애로 인해 발생한 서비스 이용 문제에 대해 책임을 지지 않습니다.
7. 이용자는 자신의 건강검진 정보를 관리할 책임이 있으며, 회사는 서비스 운영을 위해 합리적인 범위 내에서 정보를 보관합니다. 다만 회사는 이용자가 입력한 정보의 영구 보관을 보장하지 않습니다.

### 제14조(준거법 및 분쟁 해결)

1. 본 약관과 관련하여 발생한 분쟁은 대한민국 법률을 준거법으로 합니다.
2. 회사와 이용자는 서비스 이용과 관련하여 발생한 분쟁을 원만하게 해결하기 위해 성실히 협의합니다.
3. 협의로 해결되지 않을 경우, 분쟁에 관한 소송은 서울중앙지방법원을 전속 관할 법원으로 합니다.

---

### 부칙

본 약관은 **2026년 4월 1일부터 시행합니다.**`;

const PRIVACY_TERMS_TEXT = `CareNA는 건강점수 제공 및 건강 분석 서비스 제공을 위해 아래와 같이 개인정보를 수집·이용합니다.

### 1. 수집·이용 목적
- 건강검진 결과 제공
- 개인 맞춤형 건강 정보 제공
- 서비스 이용 관리 및 운영

### 2. 수집 항목

**① 계정 정보**

- 카카오 로그인 정보(카카오 고유 식별자)

**② 사용자 기본정보**

- 이름, 생년월일, 성별

**③ 서비스 이용 정보**

- 개인정보 수집·이용 동의 일시

### 3. 보유 및 이용 기간

서비스 제공 목적 달성 시까지 보관하며 회원 탈퇴 시 즉시 파기하고, 탈퇴하지 않은 경우에는 마지막 이용일 기준 최대 3년간 보관 후 파기합니다.
단, 관련 법령에 따라 보관이 필요한 경우 해당 법령에서 정한 기간을 따릅니다.

※ 이용자는 개인정보 수집·이용에 대한 동의를 철회할 수 있으며, 동의 철회는 회원 탈퇴를 통해 이루어집니다.

### 4. 동의 거부 권리 및 불이익 안내

귀하는 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다.
단, 동의하지 않을 경우 **회원가입 및 CareNA 서비스 이용이 제한될 수 있습니다.**`;

type TermsScrollBoxProps = {
	text: string;
	markdown?: boolean;
};

const TermsScrollBox = ({ text, markdown }: TermsScrollBoxProps) => {
	return (
		// overflow-hidden으로 자식 요소(스크롤바 포함)를 rounded 영역 안에 클리핑
		<div className="overflow-hidden rounded-[12px] border border-gray-200 bg-gray-50">
			<div className="h-[13.8rem] overflow-y-auto p-[1.2rem] [scrollbar-color:theme(colors.gray.200)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:block [&::-webkit-scrollbar]:w-[0.5rem]">
				{markdown ? (
					<div className="body06-r-10 max-w-none text-gray-900 [&_h3]:mt-[0.8rem] [&_h3]:mb-[0.4rem] [&_h3]:font-semibold [&_hr]:my-[0.8rem] [&_li]:my-0 [&_ol]:list-decimal [&_ol]:pl-[1.6rem] [&_p]:my-[0.4rem] [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-[1.6rem]">
						<Markdown>{text}</Markdown>
					</div>
				) : (
					<p className="body06-r-10 whitespace-pre-wrap text-gray-900">
						{text}
					</p>
				)}
			</div>
		</div>
	);
};

const ToSPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const signupData = location.state as SignupNavigationState | null;
	const { mutate, isPending } = useSignUp();

	const [serviceTerms, setServiceTerms] = useState(false);
	const [privacyTerms, setPrivacyTerms] = useState(false);

	const allAgreed = serviceTerms && privacyTerms;

	// /signup을 거치지 않고 직접 접근한 경우 되돌려보냄
	useEffect(() => {
		if (!signupData) {
			void navigate(ROUTE_PATH.SIGNUP, { replace: true });
		}
	}, [signupData, navigate]);

	const handleAllAgreed = (checked: boolean) => {
		setServiceTerms(checked);
		setPrivacyTerms(checked);
	};

	const openSignupCompleteModal = () => {
		openModal({
			size: "sm",
			title: "회원가입이 완료되었어요",
			description:
				"이미 건강 검진을 받아보셨다면,\n결과를 계속해서 입력할까요?",
			descriptionAlign: "left",
			secondaryAction: {
				label: "메인으로 가기",
				onClick: () => {
					localStorage.setItem("signupRedirect", "home");
					requestKakaoAuthorize();
				},
			},
			primaryAction: {
				label: "이어서 입력하기",
				onClick: () => {
					localStorage.setItem("signupRedirect", "checkup-result");
					requestKakaoAuthorize();
				},
			},
		});
	};

	const handleSubmit = () => {
		if (!signupData || isPending) return;
		mutate(signupData, {
			onSuccess: () => {
				trackSignupComplete();
				openSignupCompleteModal();
			},
			onError: () => {
				void navigate(ROUTE_PATH.LOGIN, { replace: true });
				notifyError("회원가입에 실패했습니다");
			},
		});
	};

	return (
		<div className="mt-[var(--header-height)] flex h-[calc(100dvh-var(--header-height))] flex-col bg-white">
			<Header variant="back" title="회원가입" />

			{/* 스크롤 가능한 컨텐츠 영역 */}
			<div className="flex-1 overflow-y-auto px-[2rem] pt-[2rem]">
				{/* 타이틀 섹션 */}
				<div className="mb-[3.2rem]">
					<h1 className="head02-b-16 mb-[0.8rem] text-gray-900">
						약관 및 개인정보 수집·이용 동의
					</h1>
					<p className="body05-r-12 text-gray-900">
						회원가입 및 기본 서비스 제공을 위한 필수 동의 사항이며,
						<br />
						동의하지 않을 경우 회원가입이 불가합니다.
					</p>
				</div>

				{/* 전체 동의 섹션 */}
				<div className="mb-[2rem] flex flex-col gap-[0.8rem]">
					<div className="flex items-center gap-[0.8rem]">
						<CheckBox checked={allAgreed} onChange={handleAllAgreed} />
						<span className="body04-r-14 text-gray-900">모두 동의합니다.</span>
					</div>
					<p className="body05-r-12 text-gray-700">
						서비스 이용약관, 개인정보 수집 및 이용 항목에 대한 내용을
						확인하였으며 이에 모두 동의합니다.
					</p>
				</div>

				{/* 구분선 */}
				<hr className="mb-[2rem] border-gray-200" />

				{/* 서비스 이용 약관 */}
				<div className="mb-[2rem] flex flex-col gap-[0.8rem]">
					<div className="flex items-center gap-[0.8rem]">
						<CheckBox checked={serviceTerms} onChange={setServiceTerms} />
						<span className="label01-sb-14 text-gray-900">
							<span className="text-primary-400">(필수)</span> 서비스 이용 약관
							동의
						</span>
					</div>
					<TermsScrollBox text={SERVICE_TERMS_TEXT} markdown />
				</div>

				{/* 개인정보 수집·이용 동의 */}
				<div className="mb-[1.2rem] flex flex-col gap-[0.8rem]">
					<div className="flex items-center gap-[0.8rem]">
						<CheckBox checked={privacyTerms} onChange={setPrivacyTerms} />
						<span className="label01-sb-14 text-gray-900">
							<span className="text-primary-400">(필수)</span> 개인정보
							수집•이용 동의
						</span>
					</div>
					<TermsScrollBox text={PRIVACY_TERMS_TEXT} markdown />
				</div>

				{/* 안내 문구 */}
				<p className="body05-r-12 pb-[2rem] text-gray-900">
					<a
						href="https://petalite-biplane-c36.notion.site/2eb5365471d180fcb539d7caf1ca2310"
						target="_blank"
						rel="noopener noreferrer"
						className="underline underline-offset-2"
					>
						개인정보 처리 방침
					</a>
					을 포함한 모든 내용은 설정에서 확인 가능합니다.
				</p>
			</div>

			{/* 하단 버튼 */}
			<div className="px-[2rem] pt-[2rem] pb-[5rem]">
				<Button disabled={!allAgreed || isPending} onClick={handleSubmit}>
					회원가입
				</Button>
			</div>
		</div>
	);
};

export default ToSPage;
