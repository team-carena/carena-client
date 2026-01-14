import { KakaoIcon } from "@/shared/assets/svg";

interface LoginButtonProps {
	type?: string;
}

export const LoginButton = ({ type = "카카오톡" }: LoginButtonProps) => {
	return (
		<button className="flex w-full min-w-[33.5rem] gap-[1.2rem] items-center px-[1.6rem] py-[1.2rem] rounded-[8px] bg-[#FEE500]">
			<KakaoIcon />
			<span className="body03-r-16">{type}으로 시작하기</span>
		</button>
	);
};
