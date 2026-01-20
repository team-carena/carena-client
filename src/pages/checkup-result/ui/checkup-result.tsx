import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	type CheckupFormData,
	type CheckupFormInput,
	checkupSchema,
} from "@/pages/checkup-result/model/checkup-schema";
import { Button } from "@/shared/ui/buttons/button";
import { CheckBox } from "@/shared/ui/check-box/check-box";
import { DateInput } from "@/shared/ui/inputs/date-input";
import { InputMedium } from "@/shared/ui/inputs/input-medium";
import { InputSmall } from "@/shared/ui/inputs/input-small";
import { CategoryLabel } from "@/shared/ui/labels/category-label";
import { RadioButton } from "@/shared/ui/radio/radio";

export const CheckupResultPage = () => {
	const [isAgreed, setIsAgreed] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		trigger,
		formState: { errors, isValid },
	} = useForm<CheckupFormInput, unknown, CheckupFormData>({
		resolver: zodResolver(checkupSchema),
		mode: "onBlur",
		defaultValues: {
			name: "",
			birthDate: { year: "", month: "", day: "" },
			gender: "MALE",
			checkupDate: { year: "", month: "", day: "" },
			hospital: "",
			height: "",
			weight: "",
			bmi: "",
			waistCircumference: "",
			systolicBp: "",
			diastolicBp: "",
			hemoglobin: "",
			fastingGlucose: "",
			serumCreatinine: "",
			egfr: "",
			ast: "",
			alt: "",
			gammaGtp: "",
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

	const onSubmit = (_data: CheckupFormData) => {};

	// 날짜 에러 메시지 추출 (refine 에러는 root에 저장됨)
	const birthDateError =
		errors.birthDate?.root?.message || errors.birthDate?.message;
	const checkupDateError =
		errors.checkupDate?.root?.message || errors.checkupDate?.message;

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

					{/* 검진일자, 검진병원 */}
					<div className="flex flex-col gap-[1.2rem]">
						<div className="flex flex-col gap-[0.8rem]">
							<span className="body03-r-16 text-black">검진일자</span>
							<DateInput
								year={{
									placeholder: "YYYY",
									maxLength: 4,
									...register("checkupDate.year", {
										onBlur: () => trigger("checkupDate"),
									}),
								}}
								month={{
									placeholder: "MM",
									maxLength: 2,
									...register("checkupDate.month", {
										onBlur: () => trigger("checkupDate"),
									}),
								}}
								day={{
									placeholder: "DD",
									maxLength: 2,
									...register("checkupDate.day", {
										onBlur: () => trigger("checkupDate"),
									}),
								}}
								errorMessage={checkupDateError}
							/>
						</div>

						<InputMedium
							label="검진병원"
							placeholder="병원명 입력"
							{...register("hospital")}
							errorMessage={errors.hospital?.message}
						/>
					</div>
				</section>

				{/* 계측검사 */}
				<section className="flex flex-col gap-[2rem]">
					<CategoryLabel label="계측검사" />

					{/*키, 체질량, 허리둘레 */}
					<div className="flex flex-col gap-[1.2rem]">
						<InputSmall
							left={{
								label: "키",
								unit: "cm",
								...register("height"),
							}}
							right={{
								label: "몸무게",
								unit: "kg",
								...register("weight"),
							}}
							errorMessage={errors.height?.message || errors.weight?.message}
						/>
						<InputMedium
							label="체질량 지수"
							unit="kg/m²"
							numeric
							{...register("bmi")}
							errorMessage={errors.bmi?.message}
						/>
						<InputMedium
							label="허리둘레"
							unit="cm"
							numeric
							{...register("waistCircumference")}
							errorMessage={errors.waistCircumference?.message}
						/>
					</div>

					{/* 고혈압 */}
					<div className="flex flex-col gap-[2rem]">
						<span className="head02-b-16 text-black">고혈압</span>
						<InputSmall
							left={{
								label: "수축기",
								unit: "mmHg",
								...register("systolicBp"),
							}}
							right={{
								label: "이완기",
								unit: "mmHg",
								...register("diastolicBp"),
							}}
							errorMessage={
								errors.systolicBp?.message || errors.diastolicBp?.message
							}
						/>
					</div>
				</section>

				{/* 혈액검사 */}
				<section className="flex flex-col gap-[2rem]">
					<CategoryLabel label="혈액검사" />
					<div className="flex flex-col gap-[1.2rem]">
						<InputMedium
							label="혈색소"
							unit="g/dL"
							numeric
							{...register("hemoglobin")}
							errorMessage={errors.hemoglobin?.message}
						/>
						<InputMedium
							label="공복혈당"
							unit="mg/dL"
							numeric
							{...register("fastingGlucose")}
							errorMessage={errors.fastingGlucose?.message}
						/>
						<InputMedium
							label="혈청 크레아티닌"
							unit="mg/dL"
							numeric
							{...register("serumCreatinine")}
							errorMessage={errors.serumCreatinine?.message}
						/>
						<InputMedium
							label="신사구체여과율"
							unit="mL/min/1.73m²"
							numeric
							{...register("egfr")}
							errorMessage={errors.egfr?.message}
						/>
						<InputMedium
							label="에이에스티"
							unit="IU/L"
							numeric
							{...register("ast")}
							errorMessage={errors.ast?.message}
						/>
						<InputMedium
							label="에이엘티"
							unit="IU/L"
							numeric
							{...register("alt")}
							errorMessage={errors.alt?.message}
						/>
						<InputMedium
							label="감마지티피"
							unit="IU/L"
							numeric
							{...register("gammaGtp")}
							errorMessage={errors.gammaGtp?.message}
						/>
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
