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
		<>
			<form
				id="signup-form"
				onSubmit={handleSubmit(onSubmit)}
				className="flex min-h-dvh w-full flex-col gap-[4rem] bg-white px-[2rem] pt-[4rem] pb-[11.2rem]"
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

				{/* 개인정보 동의 체크박스 */}
				<div className="-mt-[1.6rem] flex items-center gap-[0.8rem]">
					<CheckBox checked={isAgreed} onChange={setIsAgreed} />
					<span className="body04-r-14 text-gray-900">
						서비스 이용을 위한{" "}
						<button
							type="button"
							className="text-primary-500 underline underline-offset-2"
						>
							개인정보 수집·이용
						</button>
						에 동의합니다.
					</span>
				</div>
			</form>

			{/* 저장 버튼 - 하단 고정 */}
			<div className="fixed right-0 bottom-[2rem] left-0 mx-auto max-w-[var(--app-max-width)] px-[2rem]">
				<Button
					type="submit"
					form="signup-form"
					size="lg"
					disabled={!isAgreed || !isRequiredFilled || !isValid}
				>
					저장
				</Button>
			</div>
		</>
	);
};
