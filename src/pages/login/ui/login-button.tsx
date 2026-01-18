import { KakaoIcon } from "@/shared/assets/svg";

interface LoginButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	provider?: string;
}

export const LoginButton = ({
	provider = "카카오톡",
	...props
}: LoginButtonProps) => {
	return (
		<button
			type="button"
			className="flex w-full min-w-[33.5rem] gap-[1.2rem] items-center px-[1.6rem] py-[1.2rem] rounded-[8px] bg-[#FEE500]"
			{...props}
		>
			<KakaoIcon />
			<span className="body03-r-16">{provider}으로 시작하기</span>
		</button>
	);
};
