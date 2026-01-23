import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { ROUTE_PATH } from "@/app/routes/paths";
import { OCR_FIELD_KEYS } from "@/pages/checkup-result/apis/constants/ocr-field-keys";
import {
	type CheckupFormData,
	type CheckupFormInput,
	checkupSchema,
} from "@/pages/checkup-result/model/checkup-schema";
import type { CreateHealthReportRequest } from "@/shared/apis/generated/data-contracts";
import { Button } from "@/shared/ui/buttons/button";
import { CheckBox } from "@/shared/ui/check-box/check-box";
import { DateInput } from "@/shared/ui/inputs/date-input";
import { InputMedium } from "@/shared/ui/inputs/input-medium";
import { InputSmall } from "@/shared/ui/inputs/input-small";
import { CategoryLabel } from "@/shared/ui/labels/category-label";
import { Header } from "@/shared/ui/navigations/header";
import { openModal } from "@/shared/ui/overlays/modal/open-modal";
import { notifyError } from "@/shared/ui/overlays/toast/toast";
import { useHealthReportMutation } from "../apis/mutations/use-health-report-mutation";
import { OcrSection } from "./ocr-section";

export const CheckupResultPage = () => {
	// TODO: OCR 로직과 입력값 검증 로직 나누기

	const navigate = useNavigate();
	const { mutate: createHealthReport } = useHealthReportMutation();

	const [isAgreed, setIsAgreed] = useState(false);
	const [isCheckboxEnabled, setIsCheckboxEnabled] = useState(false);

	const agreementSectionRef = useRef<HTMLElement>(null);

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
		formState: { errors, isValid },
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

	// 민감정보 수집·이용 모달 열기
	const handleOpenPrivacyModal = () => {
		openModal({
			title: "민감정보 수집·이용 동의",
			description: `케어나(이하 '서비스')는 이용자의 건강 정보를 안전하게 보호하기 위해 아래와 같이 민감정보를 수집·이용합니다.

1. 수집하는 민감정보 항목
- 건강검진 결과(검진일자, 검진기관, 검사 수치 등)

2. 민감정보의 수집·이용 목적
- 건강검진 결과 분석 및 맞춤형 건강 정보 제공
- 서비스 개선 및 신규 서비스 개발

3. 민감정보의 보유 및 이용 기간
- 회원 탈퇴 시까지 또는 동의 철회 시까지
- 단, 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관

4. 동의 거부권 및 불이익
- 이용자는 민감정보 수집·이용에 대한 동의를 거부할 권리가 있습니다.
- 다만, 필수 항목에 대한 동의를 거부하실 경우 서비스 이용이 제한됩니다.`,
			onScrollEnd: () => setIsCheckboxEnabled(true),
			primaryAction: {
				label: "확인",
				onClick: () => {},
			},
		});
	};

	const onSubmit = (data: CheckupFormData) => {
		if (!hasAnyTestResult) {
			notifyError("검사 결과를 한 개 이상 입력하세요");
			return;
		}

		if (!isAgreed) {
			agreementSectionRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
			notifyError("민감정보 수집·이용에 동의해주세요");
			return;
		}

		const requestBody: CreateHealthReportRequest = {
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

	const toNumberOrUndefined = (value?: string | number): number | undefined => {
		if (value === undefined || value === null) return undefined;
		const normalized = typeof value === "string" ? value.trim() : String(value);
		if (normalized === "") return undefined;
		const num = Number(normalized);
		return Number.isFinite(num) ? num : undefined;
	};

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
			{/* 헤더 동작 커스텀 필요(이탈방지 모달)→ CheckupResult 페이지에 별도로 헤더 배치 */}
			<Header
				variant="back"
				title="검진 결과 입력"
				onBackClick={openExitModal}
			/>
			<OcrSection onOcrComplete={handleOcrComplete} />
			<form
				id="checkup-form"
				onSubmit={handleSubmit(onSubmit)}
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

				{/* 민감정보 동의 - 필수 필드 입력 완료 시 표시 */}
				{isRequiredFilled && isValid && (
					<section
						ref={agreementSectionRef}
						className="fade-in-animation flex flex-col gap-[2rem]"
					>
						<h3 className="head02-b-16 text-gray-600">
							민감정보 수집·이용 동의
						</h3>
						<div className="flex items-start gap-[0.8rem]">
							<CheckBox
								checked={isAgreed}
								onChange={setIsAgreed}
								disabled={!isCheckboxEnabled}
							/>
							<p className="whitespace-nowrap pt-[0.2rem] text-black">
								<span className="body01-sb-12">[필수] </span>
								<button
									type="button"
									className="body01-sb-12 underline underline-offset-2"
									onClick={handleOpenPrivacyModal}
								>
									민감정보 수집·이용
								</button>{" "}
								<span className="body05-r-12">
									내용을 확인하였으며 이에 동의합니다.
								</span>
							</p>
						</div>
					</section>
				)}
			</form>

			{/* 저장 버튼 - 하단 고정 */}
			<div className="fixed right-0 bottom-[2rem] left-0 mx-auto max-w-[var(--app-max-width)] px-[2rem]">
				<Button
					type="submit"
					form="checkup-form"
					size="lg"
					disabled={!isRequiredFilled || !isValid}
				>
					저장
				</Button>
			</div>
		</>
	);
};
