import Lottie from "react-lottie-player";
import LoginBackGround from "@/shared/assets/img/login-bg.png";
import { CarenaLogoText } from "@/shared/assets/svg";
import LandingGraphic from "../landing-graphic.json";
import { LoginButton } from "./login-button";

export const LoginPage = () => {
	return (
		<>
			<div
				aria-hidden="true"
				className="fixed inset-0 -z-10 bg-center bg-no-repeat bg-cover"
				style={{ backgroundImage: `url(${LoginBackGround})` }}
			/>
			<main className="relative px-[2rem]">
				<h1 className="sr-only">CareNA 로그인 페이지</h1>
				<header className="flex flex-col gap-[1.9rem] pt-[4rem] pb-[1.6rem] px-[0.4rem]">
					<p className="display03-sb-20 text-gray-900">
						검진 결과 이후의 모든 순간을
					</p>
					<p className="display01-b-36 text-primary-500">더 쉽게</p>
				</header>

				<Lottie
					animationData={LandingGraphic}
					aria-hidden="true"
					tabIndex={-1}
					loop
					play
					className="w-[20rem] h-[22rem] mx-auto mt-[8.1rem] mb-[7.2rem]"
				/>

				<section
					className="flex flex-col gap-[0.4rem] mb-[4rem] text-gray-900 body03-r-16"
					aria-describedby="login-description"
				>
					<p id="login-description">검진 결과를 입력하면,</p>
					<p className="flex gap-[0.4rem] h-[2.2rem] items-center">
						<CarenaLogoText aria-hidden="true" />
						<span>가 해설부터 관리까지 도와드려요.</span>
					</p>
				</section>
				<LoginButton onClick={() => {}} />
			</main>
		</>
	);
};
