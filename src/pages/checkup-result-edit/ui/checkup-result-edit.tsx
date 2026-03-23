import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
	useBlocker,
	useLocation,
	useNavigate,
	useSearchParams,
} from "react-router";
import { ROUTE_PATH } from "@/app/routes/paths";
import { OCR_FIELD_KEYS } from "@/pages/checkup-result/apis/constants/ocr-field-keys";
import {
	type CheckupFormData,
	type CheckupFormInput,
	checkupSchema,
} from "@/pages/checkup-result/model/checkup-schema";
import { FullScreenSubmitLoading } from "@/pages/checkup-result/ui/full-screen-submit-loading";
import { OcrSection } from "@/pages/checkup-result/ui/ocr-section";
import { useEntireHealthReport } from "@/pages/home/apis/queries/use-entire-health-report";
import type { WriteHealthReportRequest } from "@/shared/apis/generated/data-contracts";
import { toNumberOrUndefined } from "@/shared/libs/to-number-or-undefined";
import { Button } from "@/shared/ui/buttons/button";
import { DateInput } from "@/shared/ui/inputs/date-input";
import { InputLarge } from "@/shared/ui/inputs/input-large";
import { InputMedium } from "@/shared/ui/inputs/input-medium";
import { InputSmall } from "@/shared/ui/inputs/input-small";
import { Header } from "@/shared/ui/navigations/header";
import { openModal } from "@/shared/ui/overlays/modal/open-modal";
import { notifyError } from "@/shared/ui/overlays/toast/toast";
import { useHealthReportUpdateMutation } from "../apis/mutations/use-health-report-update-mutation";
import { toCheckupFormInput } from "../model/to-checkup-form-input";

export const CheckupResultEditPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams] = useSearchParams();

	const reportId = searchParams.get("reportId") ?? "";
	const institutionName =
		(location.state as { institutionName?: string })?.institutionName ?? "";

	const {
		data: report,
		isPending: isReportPending,
		isError: isReportError,
	} = useEntireHealthReport({
		healthReportId: reportId,
		enabled: reportId !== "",
	});

	const { mutate: updateHealthReport, isPending: isSubmitting } =
		useHealthReportUpdateMutation();

	const formDefaults = useMemo(() => {
		if (!report) return undefined;
		return toCheckupFormInput(report, institutionName);
	}, [report, institutionName]);

	const checkupDate = useMemo(() => {
		const [year = "", month = "", day = ""] = (
			report?.healthCheckDate ?? ""
		).split("-");
		return { year, month, day };
	}, [report?.healthCheckDate]);

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "auto" });
	}, []);

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		reset,
		formState: { errors, isDirty },
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

	useEffect(() => {
		if (!formDefaults) return;
		reset(formDefaults);
	}, [formDefaults, reset]);

	// useBlocker가 true일 때 모든 라우트 이동 차단
	const blocker = useBlocker(reportId !== "" && isDirty && !isSubmitting);

	// Header/브라우저 뒤로가기 시 React Router가 navigate를 감지해 내부적으로 blocker.state를 "idle" → "blocked"로 변경 → useEffect 실행
	useEffect(() => {
		// 라우트 이동이 차단된 상태
		if (blocker.state === "blocked") {
			openModal({
				size: "sm",
				description: "검진 결과를 수정하지 않고\n이동하시겠어요?",
				secondaryAction: {
					label: "취소",
					// 차단된 네비게이션 취소 (페이지에 머무르기)
					onClick: () => blocker.reset(),
				},
				primaryAction: {
					label: "이동하기",
					// 차단된 네비게이션 허용 (페이지 이동 허용)
					onClick: () => blocker.proceed(),
				},
			});
		}
	}, [blocker.state, blocker.reset, blocker.proceed]);

	useEffect(() => {
		if (!reportId) {
			void navigate(ROUTE_PATH.HEALTH_ANALYSIS, { replace: true });
		}
	}, [reportId, navigate]);

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

	// 키/몸무게를 제외한 검사 결과가 하나라도 입력되었는지 확인
	const hasAnyTestResult =
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

	const onSubmit = (data: CheckupFormData) => {
		if (!hasAnyTestResult) {
			notifyError("검사 결과를 한 개 이상 입력하세요");
			return;
		}

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

		updateHealthReport({ healthReportId: reportId, data: requestBody });
	};

	useEffect(() => {
		if (isReportError) {
			notifyError("검진 결과를 불러오지 못했어요");
			void navigate(ROUTE_PATH.HEALTH_ANALYSIS, { replace: true });
		}
	}, [isReportError, navigate]);

	if (isReportPending || isReportError) return null;

	return (
		<>
			{isSubmitting && <FullScreenSubmitLoading />}

			<Header
				variant="back"
				title="검진 결과 수정"
				onBackClick={() =>
					void navigate(`${ROUTE_PATH.HEALTH_ANALYSIS}?reportId=${reportId}`, {
						replace: true,
					})
				}
			/>

			<OcrSection onOcrComplete={handleOcrComplete} />

			<form
				id="checkup-edit-form"
				onSubmit={(e) => void handleSubmit(onSubmit)(e)}
				className="flex min-h-dvh w-full flex-col bg-white pb-[13.2rem]"
			>
				<section className="flex flex-col gap-[1.2rem] px-[2rem] py-[4rem]">
					<div className="flex flex-col gap-[0.8rem]">
						<span className="body03-r-16 text-black">
							검진일자 <span aria-hidden="true">*</span>
						</span>
						<DateInput
							year={{
								value: checkupDate.year,
								placeholder: "YYYY",
								maxLength: 4,
								readOnly: true,
							}}
							month={{
								value: checkupDate.month,
								placeholder: "MM",
								maxLength: 2,
								readOnly: true,
							}}
							day={{
								value: checkupDate.day,
								placeholder: "DD",
								maxLength: 2,
								readOnly: true,
							}}
						/>
					</div>

					<div className="flex flex-col gap-[0.8rem]">
						<span className="body03-r-16 text-black">
							검진병원 <span aria-hidden="true">*</span>
						</span>
						<InputLarge value={institutionName} readOnly />
					</div>
				</section>

				<section className="flex flex-col gap-[4rem] px-[2rem]">
					<section className="flex flex-col gap-[2rem]">
						<span className="head01-b-18 text-black">계측검사</span>

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
					</section>

					<section className="flex flex-col gap-[2rem]">
						<span className="head01-b-18 text-black">혈압검사</span>

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
					</section>

					<section className="flex flex-col gap-[2rem]">
						<span className="head01-b-18 text-black">혈액검사</span>

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
				</section>
			</form>

			<div className="fixed right-0 bottom-[2rem] left-0 mx-auto max-w-[var(--app-max-width)] px-[2rem]">
				<Button type="submit" form="checkup-edit-form" size="lg">
					저장
				</Button>
			</div>
		</>
	);
};
