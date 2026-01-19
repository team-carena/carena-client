import { KakaoIcon } from "@/shared/assets/svg";

interface LoginButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const LoginButton = ({ ...props }: LoginButtonProps) => {
	return (
		<button
			type="button"
			className="flex w-full min-w-[33.5rem] items-center justify-center gap-[1.2rem] rounded-[12px] bg-[#FEE500] px-[1.6rem] py-[1.2rem]"
			{...props}
		>
			<KakaoIcon />
			<span className="head03-sb-16 text-black/85">카카오 로그인</span>
		</button>
	);
};
