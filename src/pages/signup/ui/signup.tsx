import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { ROUTE_PATH } from "@/app/routes/paths";
import {
	type SignupFormData,
	type SignupFormInput,
	signupSchema,
} from "@/pages/signup/model/signup-schema";
import { Button } from "@/shared/ui/buttons/button";
import { CheckBox } from "@/shared/ui/check-box/check-box";
import { DateInput } from "@/shared/ui/inputs/date-input";
import { InputMedium } from "@/shared/ui/inputs/input-medium";
import { CategoryLabel } from "@/shared/ui/labels/category-label";
import { openModal } from "@/shared/ui/overlays/modal/open-modal";
import { notifyError } from "@/shared/ui/overlays/toast/toast";
import { RadioButton } from "@/shared/ui/radio/radio";

export const Signup = () => {
	const navigate = useNavigate();
	const [isAgreed, setIsAgreed] = useState(false);
	const [isCheckboxEnabled, setIsCheckboxEnabled] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		trigger,
		formState: { errors, isValid },
	} = useForm<SignupFormInput, unknown, SignupFormData>({
		resolver: zodResolver(signupSchema),
		mode: "onBlur",
		defaultValues: {
			name: "",
			birthDate: { year: "", month: "", day: "" },
			gender: "MALE",
		},
	});

	// 값 실시간 감시
	const gender = watch("gender");
	const name = watch("name");
	const birthDate = watch("birthDate");

	// 필수 필드가 모두 채워졌는지 확인
	const isRequiredFilled =
		name.trim() !== "" &&
		birthDate.year !== "" &&
		birthDate.month !== "" &&
		birthDate.day !== "";

	// 회원가입 완료 모달 열기
	const openSignupCompleteModal = () => {
		openModal({
			size: "sm",
			title: "회원가입이 완료되었어요",
			description:
				"이미 건강 검진을 받아보셨다면,\n결과를 계속해서 입력할까요?",
			secondaryAction: {
				label: "메인으로 가기",
				onClick: () => navigate(ROUTE_PATH.HOME, { replace: true }),
			},
			primaryAction: {
				label: "이어서 입력하기",
				onClick: () => navigate(ROUTE_PATH.CHECKUP_RESULT, { replace: true }),
			},
		});
	};

	const onSubmit = (_data: SignupFormData) => {
		if (!isAgreed) {
			notifyError("개인정보 수집·이용에 동의해주세요");
			return;
		}

		// TODO: 회원가입 API 실행
		// TODO: 회원가입 API 요청 성공 시 카카오 로그인 실행
		// TODO: 회원가입 실패 시 navigate(ROUTE_PATH.LOGIN, { replace: true }) 후 notifyError("다시 시도해주세요")

		// 임시: 바로 모달 표시 (추후 API 연동 시 성공 콜백에서 호출)
		void openSignupCompleteModal();
	};

	// 개인정보 수집·이용 모달 열기
	const handleOpenPrivacyModal = () => {
		openModal({
			title: "개인정보 수집·이용 동의",
			description: `케어나(이하 '서비스')는 이용자의 건강 정보를 안전하게 보호하기 위해 아래와 같이 개인정보를 수집·이용합니다.

1. 수집하는 개인정보 항목
- 필수 항목: 이름, 생년월일, 성별, 건강검진 결과(검진일자, 검진기관, 검사 수치 등)

2. 개인정보의 수집·이용 목적
- 건강검진 결과 분석 및 맞춤형 건강 정보 제공
- 서비스 이용에 따른 본인 확인
- 서비스 개선 및 신규 서비스 개발

3. 개인정보의 보유 및 이용 기간
- 회원 탈퇴 시까지 또는 동의 철회 시까지
- 단, 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관

4. 동의 거부권 및 불이익
- 이용자는 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다.
- 다만, 필수 항목에 대한 동의를 거부하실 경우 서비스 이용이 제한됩니다.`,
			onScrollEnd: () => setIsCheckboxEnabled(true),
			primaryAction: {
				label: "확인",
				onClick: () => {},
			},
		});
	};

	// 날짜 에러 메시지 추출 (refine 에러는 root에 저장됨)
	const birthDateError =
		errors.birthDate?.root?.message || errors.birthDate?.message;

	const handleOcrComplete = (data: Record<string, string>) => {
		Object.entries(data).forEach(([key, value]) => {
			if (value) {
				setValue(key as keyof SignupFormData, value, {
					shouldDirty: true,
					shouldValidate: true,
				});
			}
		});
	};

	return (
		// 하단 영역을 아래로 밀기 위해 헤더 제외한 높이 지정
		<div className="flex h-[calc(100dvh-var(--header-height))] flex-col bg-white p-[2.4rem_2rem_5rem_2rem]">
			{/* 상단 컨텐츠 영역 */}
			<div className="mb-[4rem] space-y-[1.2rem]">
				<h1 className="head01-b-18 text-center">
					검진 결과 입력하고 케어나 시작하기
				</h1>
				<h2 className="body04-r-14 text-center">
					아래 정보는 필수 입력 정보예요
				</h2>
			</div>

			<form
				id="signup-form"
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-1 flex-col gap-[4rem]"
			>
				{/* 기본정보 */}
				<section className="flex flex-col gap-[2rem]">
					<CategoryLabel label="기본정보" />
					{/* 이름, 생년월일, 성별 */}
					<div className="flex flex-col gap-[1.6rem]">
						<InputMedium
							label="이름"
							required
							{...register("name")}
							errorMessage={errors.name?.message}
						/>

						{/* 생년월일 */}
						<div className="flex flex-col gap-[0.8rem]">
							<span className="body03-r-16 text-black">
								생년월일 <span aria-hidden="true">*</span>
							</span>
							<DateInput
								year={{
									placeholder: "YYYY",
									maxLength: 4,
									...register("birthDate.year", {
										onBlur: () => trigger("birthDate"),
									}),
								}}
								month={{
									placeholder: "MM",
									maxLength: 2,
									...register("birthDate.month", {
										onBlur: () => trigger("birthDate"),
									}),
								}}
								day={{
									placeholder: "DD",
									maxLength: 2,
									...register("birthDate.day", {
										onBlur: () => trigger("birthDate"),
									}),
								}}
								errorMessage={birthDateError}
							/>
						</div>

						{/* 성별 */}
						<div className="flex items-center justify-between">
							<span className="body03-r-16 text-black">
								성별 <span aria-hidden="true">*</span>
							</span>
							<div className="flex gap-[1.2rem]">
								<RadioButton
									name="gender"
									value="MALE"
									text="남자"
									checked={gender === "MALE"}
									onChange={() => setValue("gender", "MALE")}
								/>
								<RadioButton
									name="gender"
									value="FEMALE"
									text="여자"
									checked={gender === "FEMALE"}
									onChange={() => setValue("gender", "FEMALE")}
								/>
							</div>
						</div>
					</div>
				</section>
			</form>

			{/* 하단 영역 (개인정보 동의 + 버튼) */}
			<div className="flex flex-col">
				{/* 개인정보 동의 - 기본정보 입력 완료 시 표시 */}
				{isRequiredFilled && isValid && (
					<section className="fade-in-animation mb-[3.6rem] flex flex-col gap-[2rem]">
						<h3 className="head02-b-16 text-gray-600">
							개인정보 수집·이용 동의
						</h3>
						<div className="flex items-start gap-[0.8rem]">
							<CheckBox
								checked={isAgreed}
								onChange={setIsAgreed}
								disabled={!isCheckboxEnabled}
							/>
							<span className="body01-sb-12 whitespace-nowrap pt-[0.2rem] text-black">
								[필수]{" "}
								<button
									type="button"
									className="underline underline-offset-2"
									onClick={handleOpenPrivacyModal}
								>
									개인정보 수집·이용
								</button>{" "}
								내용을 확인하였으며 이에 동의합니다.
							</span>
						</div>
					</section>
				)}

				<Button
					type="submit"
					form="signup-form"
					size="lg"
					disabled={!isRequiredFilled || !isValid}
				>
					회원가입
				</Button>
			</div>
		</div>
	);
};
