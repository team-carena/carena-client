interface SignupCategoryProps {
	label: string;
}

const SignupCategory = ({ label }: SignupCategoryProps) => {
	return (
		<h3 className="head02-b-16 mb-[2rem] text-left text-primary-700">
			{label}
		</h3>
	);
};

const Signup = () => {
	return (
		<div>
			{/* 입력 컴포넌트 */}
			<div className="flex min-h-dvh w-full flex-col gap-[4rem] bg-white px-[2rem] pt-[4rem] pb-[2.4rem]">
				<SignupCategory label={"기본정보"} />
			</div>
		</div>
	);
};

export default Signup;
