import Lottie from "react-lottie-player";
import LoginBackGround from "@/shared/assets/img/login-bg.png";
import { CarenaLogoText } from "@/shared/assets/svg";
import { requestKakaoAuthorize } from "@/shared/libs/request-kakao-authorize";
import { LoginButton } from "../components/login-button";
import LandingGraphic from "../landing-graphic.json";

export const LoginPage = () => {
	return (
		<>
			<div
				aria-hidden="true"
				className="fixed inset-0 -z-10 bg-center bg-cover bg-no-repeat"
				style={{ backgroundImage: `url(${LoginBackGround})` }}
			/>
			<div className="px-[2rem]">
				<h1 className="sr-only">CareNA 로그인 페이지</h1>
				<header className="flex flex-col gap-[1.9rem] px-[0.4rem] pt-[6.4rem] pb-[1.6rem]">
					<p className="display03-sb-20 text-gray-900">
						검진 결과 이후의 모든 순간을
					</p>
					<p className="display01-b-36 text-primary-500">더 쉽고 편리하게</p>
				</header>

				<Lottie
					animationData={LandingGraphic}
					aria-hidden="true"
					tabIndex={-1}
					speed={0.57}
					loop
					play
					className="mx-auto mt-[8.1rem] mb-[10.2rem] h-[22rem] w-[20rem]"
				/>

				<section
					className="body03-r-16 mb-[4rem] flex flex-col gap-[0.4rem] text-gray-900"
					aria-describedby="login-description"
				>
					<p id="login-description">검진 결과를 입력하면,</p>
					<p className="flex h-[2.2rem] items-center gap-[0.4rem]">
						<CarenaLogoText aria-hidden="true" />
						<span>가 해설부터 관리까지 도와드려요.</span>
					</p>
				</section>

				<div className="pb-[4rem]">
					<LoginButton onClick={requestKakaoAuthorize} />
				</div>
			</div>
		</>
	);
};
