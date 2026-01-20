"use client";

import { useEffect } from "react";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router";
import { ROUTE_PATH } from "@/app/routes/paths";
import { postTokenExchange } from "@/shared/apis/auth/post-token-exchange";
import LoadingGraphic from "@/shared/assets/lottie/spinner.json";
import { useAuthStore } from "@/shared/store/auth-store";

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

				// OCR 페이지로 이동 -> TODO: 라우터 상수 활용해야 함
				await navigate("/ocr", { replace: true });
			} catch (error) {
				await navigate(ROUTE_PATH.LOGIN, { replace: true });
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
