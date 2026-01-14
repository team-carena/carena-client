import Lottie from "react-lottie-player";
import LoginBackGround from "@/shared/assets/img/login-bg.png";
import { CarenaLogoLogin } from "@/shared/assets/svg";
import LandingGraphic from "../landing-graphic.json";
import { LoginButton } from "./login-button";

export const Login = () => {
	return (
		<div
			className="min-h-screen bg-center bg-no-repeat bg-cover px-[2rem]"
			style={{ backgroundImage: `url(${LoginBackGround})` }}
		>
			<div className="flex flex-col gap-[1.9rem] pt-[4rem] pb-[1.6rem] px-[0.4rem]">
				<span className="display03-sb-20 text-gray-900">
					{" "}
					검진 결과 이후의 모든 순간을
				</span>
				<span className="display01-b-36 text-primary-500">더 쉽게</span>
			</div>

			<Lottie
				animationData={LandingGraphic}
				play
				className="w-full h-[20rem] max-w-[320px] mx-auto"
			/>

			<div className="flex flex-col gap-[0.4rem] mb-[4rem] text-gray-900 body03-r-16">
				<span>검진 결과를 입력하면,</span>
				<span className="flex items-center gap-[0.4rem] h-[2.2rem]">
					<CarenaLogoLogin />가 해설부터 관리까지 도와드려요.
				</span>
			</div>
			<LoginButton />
		</div>
	);
};
