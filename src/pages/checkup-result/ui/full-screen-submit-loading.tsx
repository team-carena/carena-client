import Lottie from "react-lottie-player";
import spinnerLottie from "@/shared/assets/lottie/spinner.json";

export const FullScreenSubmitLoading = () => {
	return (
		<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
			<div className="flex flex-col items-center gap-[0.4rem]">
				<Lottie
					animationData={spinnerLottie}
					loop
					play
					speed={0.6}
					aria-hidden="true"
					className="h-[10rem] w-[10rem]"
				/>
				<p className="head03-sb-16 text-white">검진 결과를 저장하고 있어요</p>
			</div>
		</div>
	);
};
