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
import { OcrSection } from "@/pages/checkup-result/ui/ocr-section";
import { Button } from "@/shared/ui/buttons/button";
import { DateInput } from "@/shared/ui/inputs/date-input";
import { InputLarge } from "@/shared/ui/inputs/input-large";
import { InputMedium } from "@/shared/ui/inputs/input-medium";
import { InputSmall } from "@/shared/ui/inputs/input-small";
import { Header } from "@/shared/ui/navigations/header";
import { openModal } from "@/shared/ui/overlays/modal/open-modal";
import { notifyError, notifySuccess } from "@/shared/ui/overlays/toast/toast";

type CheckupResultData = {
	checkupDate: {
		year: string;
		month: string;
		day: string;
	};
	hospital: string;
	height: string | null;
	weight: string | null;
	bmi: string | null;
	waistCircumference: string | null;
	systolicBp: string | null;
	diastolicBp: string | null;
	hemoglobin: string | null;
	fastingGlucose: string | null;
	serumCreatinine: string | null;
	egfr: string | null;
	ast: string | null;
	alt: string | null;
	gammaGtp: string | null;
};

const initialResult: CheckupResultData = {
	// TODO: API 연동 시 기존 검진 결과 데이터로 교체
	checkupDate: {
		year: "2026",
		month: "03",
		day: "06",
	},
	hospital: "케어나 병원",
	height: "180",
	weight: "70",
	bmi: "19.5",
	waistCircumference: null,
	systolicBp: "118",
	diastolicBp: "76",
	hemoglobin: "13.2",
	fastingGlucose: null,
	serumCreatinine: "0.72",
	egfr: null,
	ast: "21",
	alt: "18",
	gammaGtp: null,
};

export const CheckupResultEditPage = () => {
	const navigate = useNavigate();

	const openExitModal = useCallback(() => {
		openModal({
			size: "sm",
			description:
				"검진 결과를 수정하지 않고\n결과 분석 화면으로 이동하시겠어요?",
			secondaryAction: {
				label: "취소",
				onClick: () => {},
			},
			primaryAction: {
				label: "이동하기",
				onClick: () => navigate(ROUTE_PATH.CHECKUP_RESULT, { replace: true }),
			},
		});
	}, [navigate]);

	useEffect(() => {
		window.history.pushState(null, "", window.location.href);

		const handlePopState = () => {
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
		setValue,
		formState: { errors },
	} = useForm<CheckupFormInput, unknown, CheckupFormData>({
		resolver: zodResolver(checkupSchema),
		mode: "onBlur",
		defaultValues: {
			// TODO: API 연동 시 조회한 기존 검진 결과를 defaultValues로 설정
			checkupDate: initialResult.checkupDate,
			hospital: initialResult.hospital,
			height: initialResult.height ?? "",
			weight: initialResult.weight ?? "",
			bmi: initialResult.bmi ?? "",
			waistCircumference: initialResult.waistCircumference ?? "",
			systolicBp: initialResult.systolicBp ?? "",
			diastolicBp: initialResult.diastolicBp ?? "",
			hemoglobin: initialResult.hemoglobin ?? "",
			fastingGlucose: initialResult.fastingGlucose ?? "",
			serumCreatinine: initialResult.serumCreatinine ?? "",
			egfr: initialResult.egfr ?? "",
			ast: initialResult.ast ?? "",
			alt: initialResult.alt ?? "",
			gammaGtp: initialResult.gammaGtp ?? "",
		},
	});

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

	const onSubmit = () => {
		if (!hasAnyTestResult) {
			notifyError("검사 결과를 한 개 이상 입력하세요");
			return;
		}

		// TODO: API 연동 시 수정 요청 payload 가공 후 수정 API 호출
		notifySuccess("검진 결과가 수정되었습니다");
		void navigate(ROUTE_PATH.CHECKUP_RESULT);
	};

	return (
		<>
			<Header
				variant="back"
				title="검진 결과 수정"
				onBackClick={openExitModal}
			/>

			<OcrSection onOcrComplete={handleOcrComplete} />

			<form
				id="checkup-edit-form"
				onSubmit={handleSubmit(onSubmit)}
				className="flex min-h-dvh w-full flex-col bg-white pb-[16.4rem]"
			>
				<section className="flex flex-col gap-[1.2rem] px-[2rem] py-[4rem]">
					<div className="flex flex-col gap-[0.8rem]">
						<span className="body03-r-16 text-black">
							검진일자 <span aria-hidden="true">*</span>
						</span>
						<DateInput
							year={{
								value: initialResult.checkupDate.year,
								placeholder: "YYYY",
								maxLength: 4,
								readOnly: true,
							}}
							month={{
								value: initialResult.checkupDate.month,
								placeholder: "MM",
								maxLength: 2,
								readOnly: true,
							}}
							day={{
								value: initialResult.checkupDate.day,
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
						<InputLarge value={initialResult.hospital} readOnly />
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
						<span className="head01-b-18 text-black">고혈압</span>

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
