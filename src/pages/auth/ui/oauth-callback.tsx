"use client";

import { useEffect } from "react";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router";
import { ROUTE_PATH } from "@/app/routes/paths";
import { postTokenExchange } from "@/pages/auth/apis/post-token-exchange";
import LoadingGraphic from "@/shared/assets/lottie/spinner.json";
import { useAuthStore } from "@/shared/store/auth-store";
import { notifyError } from "@/shared/ui/overlays/toast/toast";

// OauthCallback에서는 신규회원/기존회원 구분할 필요 없음
export const OauthCallBack = () => {
	const navigate = useNavigate();
	const { setAccessToken, setAuthenticated, setAuthCheckLoading } =
		useAuthStore();

	useEffect(() => {
		const exchangeToken = async () => {
			try {
				setAuthCheckLoading(true);

				const response = await postTokenExchange();

				const authHeader = response.headers.authorization;

				if (!authHeader) {
					throw new Error("Authorization header not found");
				}

				const accessToken = authHeader.replace(/^Bearer\s+/i, "");

				setAccessToken(accessToken);
				setAuthenticated(true);

				const signupRedirect = localStorage.getItem("signupRedirect");
				if (signupRedirect) {
					// 회원가입 후 리다이렉트된 경우 회원가입 페이지에서 모달 선택값에 따라 리다이렉트 분기처리
					localStorage.removeItem("signupRedirect");
					if (signupRedirect === "checkup-result") {
						void navigate(ROUTE_PATH.CHECKUP_RESULT, { replace: true });
					} else {
						void navigate(ROUTE_PATH.HOME, { replace: true });
					}
				} else {
					// 이미 가입된 사용자의 로그인인 경우 HOME으로 즉시 리다이렉트
					void navigate(ROUTE_PATH.HOME, { replace: true });
				}
			} catch (_error) {
				void navigate(ROUTE_PATH.LOGIN, { replace: true });
				notifyError("로그인에 실패했습니다");
			} finally {
				setAuthCheckLoading(false);
			}
		};

		void exchangeToken();
	}, [navigate, setAccessToken, setAuthenticated, setAuthCheckLoading]);

	return (
		<div className="flex min-h-dvh items-center justify-center">
			<Lottie
				animationData={LoadingGraphic}
				aria-hidden="true"
				tabIndex={-1}
				speed={0.57}
				loop
				play
				className="h-[22rem] w-[20rem]"
			/>
		</div>
	);
};
