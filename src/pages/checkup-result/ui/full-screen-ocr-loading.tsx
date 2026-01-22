import Lottie from "react-lottie-player";
import ocrLoadingLottie from "@/shared/assets/lottie/loader.json";

export const FullScreenOcrLoading = () => {
	return (
		<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
			<div className="flex flex-col items-center gap-[0.4rem]">
				<Lottie
					animationData={ocrLoadingLottie}
					loop
					className="h-[10rem] w-[20rem]"
				/>
				<p className="head03-sb-16 text-white">정보를 불러오는 중이에요</p>
			</div>
		</div>
	);
};
