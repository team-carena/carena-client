import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	type SignupFormData,
	type SignupFormInput,
	signupSchema,
} from "@/pages/signup/model/signup-schema";
import { Button } from "@/shared/ui/buttons/button";
import { CheckBox } from "@/shared/ui/check-box/check-box";
import { DateInput } from "@/shared/ui/inputs/date-input";
import { InputMedium } from "@/shared/ui/inputs/input-medium";
import { RadioButton } from "@/shared/ui/radio/radio";

interface CategoryLabelProps {
	label: string;
}

const CategoryLabel = ({ label }: CategoryLabelProps) => {
	return <h3 className="head02-b-16 text-left text-primary-700">{label}</h3>;
};

export const Signup = () => {
	const [isAgreed, setIsAgreed] = useState(false);

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

	const onSubmit = (_data: SignupFormData) => {};

	// 날짜 에러 메시지 추출 (refine 에러는 root에 저장됨)
	const birthDateError =
		errors.birthDate?.root?.message || errors.birthDate?.message;

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
							<CheckBox checked={isAgreed} onChange={setIsAgreed} />
							<span className="body01-sb-12 whitespace-nowrap pt-[0.2rem] text-black">
								[필수]{" "}
								<button
									type="button"
									className="underline underline-offset-2"
									onClick={() => {
										// TODO: 모달 열기
									}}
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
					disabled={!isAgreed || !isRequiredFilled || !isValid}
				>
					회원가입
				</Button>
			</div>
		</div>
	);
};
