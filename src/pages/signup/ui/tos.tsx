// tos(terms-of-services), 약관동의 페이지

import { useState } from "react";
import { useNavigate } from "react-router";
import { ROUTE_PATH } from "@/app/routes/paths";
import { Button } from "@/shared/ui/buttons/button";
import { CheckBox } from "@/shared/ui/check-box/check-box";
import { Header } from "@/shared/ui/navigations/header";

const SERVICE_TERMS_TEXT = `제1조 (목적)
본 약관은 케어나(이하 '서비스')가 제공하는 건강관리 서비스의 이용에 관한 조건 및 절차를 규정함을 목적으로 합니다.

제2조 (서비스 내용)
케어나는 다음과 같은 서비스를 제공합니다.
- 건강검진 결과 분석 및 해석
- 맞춤형 건강 식단 추천
- 건강 정보 및 팁 제공

제3조 (이용 조건)
만 14세 이상의 사용자만 서비스를 이용할 수 있습니다. 서비스 이용을 위해 카카오 계정을 통한 본인 확인이 필요합니다.

제4조 (서비스 제한)
다음의 경우 서비스 이용이 제한될 수 있습니다.
- 서비스의 정상적인 운영을 방해하는 행위
- 타인의 정보를 무단으로 사용하는 행위

제5조 (서비스 변경 및 중단)
케어나는 서비스 개선을 위해 내용을 변경하거나 중단할 수 있으며, 사전에 공지합니다.`;

const PRIVACY_TERMS_TEXT = `CareNA는 건강점수 제공 및 건강 분석 서비스 제공을 위해 아래와 같이 개인정보를 수집·이용합니다.

1. 수집·이용 목적
건강검진 결과 제공
개인 맞춤형 건강 정보 제공

2. 수집 항목
계정 정보
카카오 로그인 정보(고유 식별자)
사용자 기본정보
이름, 생년월일, 성별
서비스 이용 정보
개인정보 수집·이용 동의 일시

3. 보유 및 이용 기간
서비스 제공 목적 달성 시까지 보관하며 회원 탈퇴 시 즉시 파기하고, 탈퇴하지 않은 경우에는 마지막 이용일 기준 최대 3년간 보관 후 파기합니다.
단, 관련 법령에 따라 보관이 필요한 경우 해당 법령에서 정한 기간을 따릅니다.

4. 동의 거부 권리 및 불이익 안내
귀하는 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다.
단, 동의하지 않을 경우 회원가입 및 CareNA 서비스 이용이 불가합니다.`;

type TermsScrollBoxProps = {
	text: string;
};

const TermsScrollBox = ({ text }: TermsScrollBoxProps) => {
	return (
		// overflow-hidden으로 자식 요소(스크롤바 포함)를 rounded 영역 안에 클리핑
		<div className="overflow-hidden rounded-[12px] border border-gray-200 bg-gray-50">
			<div className="h-[13.8rem] overflow-y-auto p-[1.2rem] [scrollbar-color:theme(colors.gray.200)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:block [&::-webkit-scrollbar]:w-[0.5rem]">
				<p className="body06-r-10 whitespace-pre-wrap text-gray-900">{text}</p>
			</div>
		</div>
	);
};

const ToSPage = () => {
	const navigate = useNavigate();
	const [serviceTerms, setServiceTerms] = useState(false);
	const [privacyTerms, setPrivacyTerms] = useState(false);

	const allAgreed = serviceTerms && privacyTerms;

	const handleAllAgreed = (checked: boolean) => {
		setServiceTerms(checked);
		setPrivacyTerms(checked);
	};

	const handleSubmit = () => {
		void navigate(ROUTE_PATH.SIGNUP);
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
					<TermsScrollBox text={SERVICE_TERMS_TEXT} />
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
					<TermsScrollBox text={PRIVACY_TERMS_TEXT} />
				</div>

				{/* 안내 문구 */}
				<p className="body05-r-12 pb-[2rem] text-gray-900">
					{/* TODO: href에 개인정보 처리 방침 외부 URL 입력 필요 */}
					<a
						href="#"
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
				<Button disabled={!allAgreed} onClick={handleSubmit}>
					회원가입
				</Button>
			</div>
		</div>
	);
};

export default ToSPage;
