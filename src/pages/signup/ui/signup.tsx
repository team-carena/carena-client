import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { ROUTE_PATH } from "@/app/routes/paths";
import {
	type SignupFormData,
	type SignupFormInput,
	signupSchema,
} from "@/pages/signup/model/signup-schema";
import { Button } from "@/shared/ui/buttons/button";
import { DateInput } from "@/shared/ui/inputs/date-input";
import { InputMedium } from "@/shared/ui/inputs/input-medium";
import { CategoryLabel } from "@/shared/ui/labels/category-label";
import { Header } from "@/shared/ui/navigations/header";
import { RadioButton } from "@/shared/ui/radio/radio";

export const Signup = () => {
	const navigate = useNavigate();

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
			birthdate: { year: "", month: "", day: "" },
			gender: undefined, // 초기에는 성별 미결정 상태
		},
	});

	// 값 실시간 감시
	const gender = watch("gender");
	const name = watch("name");
	const birthdate = watch("birthdate");

	// 필수 필드가 모두 채워졌는지 확인
	const isRequiredFilled =
		name.trim() !== "" &&
		birthdate.year !== "" &&
		birthdate.month !== "" &&
		birthdate.day !== "" &&
		gender !== undefined;

	const onSubmit = (data: SignupFormData) => {
		void navigate(ROUTE_PATH.SIGNUP_TOS, {
			state: {
				name: data.name,
				birthdate: `${data.birthdate.year}-${data.birthdate.month.padStart(2, "0")}-${data.birthdate.day.padStart(2, "0")}`,
				gender: data.gender,
			},
		});
	};

	// 날짜 에러 메시지 추출 (refine 에러는 root에 저장됨)
	const birthdateError =
		errors.birthdate?.root?.message || errors.birthdate?.message;

	return (
		// flex-1으로 하단 영역을 아래로 밀기 위해 헤더 제외한 높이 지정
		<div className="mt-[var(--header-height)] flex h-[calc(100dvh-var(--header-height))] flex-col bg-white p-[2.4rem_2rem_4rem_2rem]">
			{/* 상단 컨텐츠 영역 */}

			<Header variant="signup" title="회원가입" />

			<div className="mb-[4rem] space-y-[1.2rem]">
				<h1 className="head01-b-18 text-center">
					간단한 정보 입력으로 케어나 시작하기
				</h1>
				<h2 className="body04-r-14 text-center">
					아래 정보는 필수 입력 정보에요
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
					<div className="flex flex-col gap-[1.2rem]">
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
									...register("birthdate.year", {
										onBlur: () => trigger("birthdate"),
									}),
								}}
								month={{
									placeholder: "MM",
									maxLength: 2,
									...register("birthdate.month", {
										onBlur: () => trigger("birthdate"),
									}),
								}}
								day={{
									placeholder: "DD",
									maxLength: 2,
									...register("birthdate.day", {
										onBlur: () => trigger("birthdate"),
									}),
								}}
								errorMessage={birthdateError}
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
									// shouldValidate: react-hook-form의 setValue 옵션
									// radio 버튼은 blur 이벤트를 발생시키지 않으므로 값 변경과 동시에 해당 필드의 유효성 검사를 즉시 실행함
									onChange={() =>
										setValue("gender", "MALE", { shouldValidate: true })
									}
								/>
								<RadioButton
									name="gender"
									value="FEMALE"
									text="여자"
									checked={gender === "FEMALE"}
									onChange={() =>
										setValue("gender", "FEMALE", { shouldValidate: true })
									}
								/>
							</div>
						</div>
					</div>
				</section>
			</form>

			<Button
				type="submit"
				form="signup-form"
				size="lg"
				disabled={!isRequiredFilled || !isValid}
			>
				확인
			</Button>
		</div>
	);
};
