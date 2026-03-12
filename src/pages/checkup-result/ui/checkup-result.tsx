import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { ROUTE_PATH } from "@/app/routes/paths";
import { OCR_FIELD_KEYS } from "@/pages/checkup-result/apis/constants/ocr-field-keys";
import {
	type CheckupFormData,
	type CheckupFormInput,
	checkupSchema,
} from "@/pages/checkup-result/model/checkup-schema";
import type { WriteHealthReportRequest } from "@/shared/apis/generated/data-contracts";
import { toNumberOrUndefined } from "@/shared/libs/to-number-or-undefined";
import { Button } from "@/shared/ui/buttons/button";
import { DateInput } from "@/shared/ui/inputs/date-input";
import { InputMedium } from "@/shared/ui/inputs/input-medium";
import { InputSmall } from "@/shared/ui/inputs/input-small";
import { CategoryLabel } from "@/shared/ui/labels/category-label";
import { Header } from "@/shared/ui/navigations/header";
import { openModal } from "@/shared/ui/overlays/modal/open-modal";
import { notifyError } from "@/shared/ui/overlays/toast/toast";
import { useHealthReportMutation } from "../apis/mutations/use-health-report-mutation";
import { FullScreenSubmitLoading } from "./full-screen-submit-loading";
import { OcrSection } from "./ocr-section";
import { openPrivacyConsentSheet } from "./privacy-consent-sheet";

export const CheckupResultPage = () => {
	// TODO: OCR 로직과 입력값 검증 로직 나누기

	const navigate = useNavigate();
	const { mutate: createHealthReport, isPending } = useHealthReportMutation();

	// 이탈방지 모달 열기
	const openExitModal = useCallback(() => {
		openModal({
			size: "sm",
			description: "검진 결과를 저장하지 않고\n메인 화면으로 이동하시겠어요?",
			secondaryAction: {
				label: "취소",
				onClick: () => {},
			},
			primaryAction: {
				label: "이동하기",
				onClick: () => navigate(ROUTE_PATH.HOME, { replace: true }),
			},
		});
	}, [navigate]);

	// 브라우저의 기본 뒤로가기 감지 및 차단
	useEffect(() => {
		// 히스토리에 현재 상태 추가 (뒤로가기 감지용)
		window.history.pushState(null, "", window.location.href);

		const handlePopState = () => {
			// 뒤로가기 시 다시 현재 페이지로 push하여 이탈 방지, 그 뒤 이탈방지 모달 띄우기
			window.history.pushState(null, "", window.location.href);
			openExitModal();
		};

		window.addEventListener("popstate", handlePopState);

		return () => {
			window.removeEventListener("popstate", handlePopState);
		};
	}, [openExitModal]);

	const {
		register,
		handleSubmit,
		watch,
		trigger,
		setValue,
		formState: { errors, isValid, isSubmitting },
	} = useForm<CheckupFormInput, unknown, CheckupFormData>({
		resolver: zodResolver(checkupSchema),
		mode: "onBlur",
		defaultValues: {
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

	// 필수 필드 감시
	const checkupDate = watch("checkupDate");
	const hospital = watch("hospital");

	// 검사 결과 필드 감시
	const height = watch("height");
	const weight = watch("weight");
	const bmi = watch("bmi");
	const waistCircumference = watch("waistCircumference");
	const systolicBp = watch("systolicBp");
	const diastolicBp = watch("diastolicBp");
	const hemoglobin = watch("hemoglobin");
	const fastingGlucose = watch("fastingGlucose");
	const serumCreatinine = watch("serumCreatinine");
	const egfr = watch("egfr");
	const ast = watch("ast");
	const alt = watch("alt");
	const gammaGtp = watch("gammaGtp");

	// 필수 필드가 모두 채워졌는지 확인
	const isRequiredFilled =
		checkupDate.year !== "" &&
		checkupDate.month !== "" &&
		checkupDate.day !== "" &&
		(hospital?.trim() ?? "") !== "";

	// 검사 결과가 하나라도 입력되었는지 확인
	const hasAnyTestResult =
		height !== "" ||
		weight !== "" ||
		bmi !== "" ||
		waistCircumference !== "" ||
		systolicBp !== "" ||
		diastolicBp !== "" ||
		hemoglobin !== "" ||
		fastingGlucose !== "" ||
		serumCreatinine !== "" ||
		egfr !== "" ||
		ast !== "" ||
		alt !== "" ||
		gammaGtp !== "";

	const onSubmit = async (data: CheckupFormData) => {
		if (!hasAnyTestResult) {
			notifyError("검사 결과를 한 개 이상 입력하세요");
			return;
		}

		const agreed = await openPrivacyConsentSheet();
		if (!agreed) return;

		const requestBody: WriteHealthReportRequest = {
			healthCheckDate: `${data.checkupDate.year}-${data.checkupDate.month}-${data.checkupDate.day}`,
			institutionName: data.hospital!,

			height: toNumberOrUndefined(data.height),
			weight: toNumberOrUndefined(data.weight),
			waistCircumference: toNumberOrUndefined(data.waistCircumference),
			bmi: toNumberOrUndefined(data.bmi),

			systolicBp: toNumberOrUndefined(data.systolicBp),
			diastolicBp: toNumberOrUndefined(data.diastolicBp),

			hemoglobin: toNumberOrUndefined(data.hemoglobin),
			fastingGlucose: toNumberOrUndefined(data.fastingGlucose),

			serumCreatinine: toNumberOrUndefined(data.serumCreatinine),
			egfr: toNumberOrUndefined(data.egfr),
			ast: toNumberOrUndefined(data.ast),
			alt: toNumberOrUndefined(data.alt),
			gammaGtp: toNumberOrUndefined(data.gammaGtp),
		};
		createHealthReport(requestBody);
	};

	// 날짜 에러 메시지 추출 (refine 에러는 root에 저장됨)
	const checkupDateError =
		errors.checkupDate?.root?.message || errors.checkupDate?.message;

	const handleOcrComplete = useCallback(
		(data: Record<string, string>) => {
			OCR_FIELD_KEYS.forEach((key) => {
				const value = data[key];
				if (value == null) return;
				setValue(key, value, {
					shouldDirty: true,
					shouldTouch: true,
					shouldValidate: true,
				});
			});
		},
		[setValue],
	);

	return (
		<>
			{isPending && <FullScreenSubmitLoading />}
			{/* 헤더 동작 커스텀 필요(이탈방지 모달)→ CheckupResult 페이지에 별도로 헤더 배치 */}
			<Header
				variant="back"
				title="검진 결과 입력"
				onBackClick={openExitModal}
			/>
			<OcrSection onOcrComplete={handleOcrComplete} />
			<form
				id="checkup-form"
				onSubmit={(e) => void handleSubmit(onSubmit)(e)}
				className="flex min-h-dvh w-full flex-col gap-[4rem] bg-white px-[2rem] pt-[4rem] pb-[11.2rem]"
			>
				{/* 기본정보 */}
				<section className="flex flex-col gap-[2rem]">
					<div className="flex flex-col gap-[1.2rem]">
						<div className="flex flex-col gap-[0.8rem]">
							<span className="body03-r-16 text-black">
								검진일자 <span aria-hidden="true">*</span>
							</span>
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
							required
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
			</form>

			{/* 저장 버튼 - 하단 고정 */}
			<div className="fixed right-0 bottom-[2rem] left-0 mx-auto max-w-[var(--app-max-width)] px-[2rem]">
				<Button
					type="submit"
					form="checkup-form"
					size="lg"
					disabled={!isRequiredFilled || !isValid || isSubmitting}
				>
					저장
				</Button>
			</div>
		</>
	);
};
