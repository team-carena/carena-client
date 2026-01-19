import * as React from "react";
import { DateInput } from "@/shared/ui/inputs/date-input";
import { InputMedium } from "@/shared/ui/inputs/input-medium";
import { InputSmall } from "@/shared/ui/inputs/input-small";
import { RadioButton } from "@/shared/ui/radio/radio";

interface SignupCategoryProps {
	label: string;
}

const SignupCategory = ({ label }: SignupCategoryProps) => {
	return <h3 className="head02-b-16 text-left text-primary-700">{label}</h3>;
};

const Signup = () => {
	// 기본정보
	const [name, setName] = React.useState("김경아");
	const [birthYear, setBirthYear] = React.useState("2003");
	const [birthMonth, setBirthMonth] = React.useState("08");
	const [birthDay, setBirthDay] = React.useState("21");
	const [gender, setGender] = React.useState("female");
	const [checkupYear, setCheckupYear] = React.useState("");
	const [checkupMonth, setCheckupMonth] = React.useState("");
	const [checkupDay, setCheckupDay] = React.useState("");
	const [hospital, setHospital] = React.useState("");

	// 계측검사
	const [height, setHeight] = React.useState("");
	const [weight, setWeight] = React.useState("");
	const [bmi, setBmi] = React.useState("");
	const [waist, setWaist] = React.useState("");
	const [systolic, setSystolic] = React.useState("");
	const [diastolic, setDiastolic] = React.useState("");

	// 혈액검사
	const [hemoglobin, setHemoglobin] = React.useState("");
	const [fastingGlucose, setFastingGlucose] = React.useState("");
	const [serumCreatinine, setSerumCreatinine] = React.useState("");
	const [gfr, setGfr] = React.useState("");
	const [ast, setAst] = React.useState("");
	const [alt, setAlt] = React.useState("");
	const [ggt, setGgt] = React.useState("");

	return (
		<div className="flex min-h-dvh w-full flex-col bg-white px-[2rem] pt-[4rem] pb-[2.4rem]">
			{/* 기본정보 */}
			<section className="flex flex-col">
				<SignupCategory label="기본정보" />
				<div className="mt-[2rem] flex flex-col gap-[1.2rem]">
					<InputMedium
						label="이름"
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>

					{/* 생년월일 */}
					<div className="flex flex-col gap-[0.4rem]">
						<span className="body03-r-16 text-black">
							생년월일 <span aria-hidden="true">*</span>
						</span>
						<DateInput
							year={{
								placeholder: "YYYY",
								value: birthYear,
								onChange: (e) => setBirthYear(e.target.value),
							}}
							month={{
								placeholder: "MM",
								value: birthMonth,
								onChange: (e) => setBirthMonth(e.target.value),
							}}
							day={{
								placeholder: "DD",
								value: birthDay,
								onChange: (e) => setBirthDay(e.target.value),
							}}
						/>
					</div>

					{/* 성별 */}
					<div className="flex items-center justify-between">
						<span className="body03-r-16 text-black">
							성별 <span aria-hidden="true">*</span>
						</span>
						<div className="flex gap-[2rem]">
							<RadioButton
								name="gender"
								value="male"
								text="남자"
								checked={gender === "male"}
								onChange={setGender}
							/>
							<RadioButton
								name="gender"
								value="female"
								text="여자"
								checked={gender === "female"}
								onChange={setGender}
							/>
						</div>
					</div>

					{/* 검진일자 */}
					<div className="flex flex-col gap-[0.4rem]">
						<span className="body03-r-16 text-black">검진일자</span>
						<DateInput
							year={{
								placeholder: "YYYY",
								value: checkupYear,
								onChange: (e) => setCheckupYear(e.target.value),
							}}
							month={{
								placeholder: "MM",
								value: checkupMonth,
								onChange: (e) => setCheckupMonth(e.target.value),
							}}
							day={{
								placeholder: "DD",
								value: checkupDay,
								onChange: (e) => setCheckupDay(e.target.value),
							}}
						/>
					</div>

					<InputMedium
						label="검진병원"
						placeholder="병원명 입력"
						value={hospital}
						onChange={(e) => setHospital(e.target.value)}
					/>
				</div>
			</section>

			{/* 계측검사 */}
			<section className="mt-[4rem] flex flex-col">
				<SignupCategory label="계측검사" />
				<div className="mt-[2rem] flex flex-col gap-[1.2rem]">
					<InputSmall
						left={{
							label: "키",
							unit: "cm",
							value: height,
							onChange: (e) => setHeight(e.target.value),
						}}
						right={{
							label: "몸무게",
							unit: "kg",
							value: weight,
							onChange: (e) => setWeight(e.target.value),
						}}
					/>
					<InputMedium
						label="체질량 지수"
						unit="kg/m²"
						numeric
						value={bmi}
						onChange={(e) => setBmi(e.target.value)}
					/>
					<InputMedium
						label="허리둘레"
						unit="cm"
						numeric
						value={waist}
						onChange={(e) => setWaist(e.target.value)}
					/>

					{/* 고혈압 */}
					<div className="flex flex-col gap-[0.4rem]">
						<span className="body03-r-16 text-black">고혈압</span>
						<InputSmall
							left={{
								label: "수축기",
								unit: "단위",
								value: systolic,
								onChange: (e) => setSystolic(e.target.value),
							}}
							right={{
								label: "이완기",
								unit: "단위",
								value: diastolic,
								onChange: (e) => setDiastolic(e.target.value),
							}}
						/>
					</div>
				</div>
			</section>

			{/* 혈액검사 */}
			<section className="mt-[4rem] flex flex-col">
				<SignupCategory label="혈액검사" />
				<div className="mt-[2rem] flex flex-col gap-[1.2rem]">
					<InputMedium
						label="혈색소"
						unit="g/dL"
						numeric
						value={hemoglobin}
						onChange={(e) => setHemoglobin(e.target.value)}
					/>
					<InputMedium
						label="공복혈당"
						unit="mg/dL"
						numeric
						value={fastingGlucose}
						onChange={(e) => setFastingGlucose(e.target.value)}
					/>
					<InputMedium
						label="혈청 크레아티닌"
						unit="mg/dL"
						numeric
						value={serumCreatinine}
						onChange={(e) => setSerumCreatinine(e.target.value)}
					/>
					<InputMedium
						label="신사구체여과율"
						unit="mL/min/1.73m²"
						numeric
						value={gfr}
						onChange={(e) => setGfr(e.target.value)}
					/>
					<InputMedium
						label="에이에스티"
						unit="IU/L"
						numeric
						value={ast}
						onChange={(e) => setAst(e.target.value)}
					/>
					<InputMedium
						label="에이엘티"
						unit="IU/L"
						numeric
						value={alt}
						onChange={(e) => setAlt(e.target.value)}
					/>
					<InputMedium
						label="감마지티피"
						unit="IU/L"
						numeric
						value={ggt}
						onChange={(e) => setGgt(e.target.value)}
					/>
				</div>
			</section>
		</div>
	);
};

export default Signup;
