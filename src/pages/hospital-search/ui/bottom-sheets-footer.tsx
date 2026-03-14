type BottomSheetFooterProps = {
	tempSelectedSido: string | null;
	onConfirm: (sido: string) => void;
	onClose: () => void;
};

export const BottomSheetFooter = ({
	tempSelectedSido,
	onConfirm,
	onClose,
}: BottomSheetFooterProps) => {
	const buttonText = tempSelectedSido
		? `${tempSelectedSido} 전체 보기`
		: "지역을 선택해 주세요";

	const handleButtonClick = () => {
		if (!tempSelectedSido) return;

		onConfirm(tempSelectedSido);
		onClose();
	};

	return (
		<div className="pb-[3rem]">
			<button
				type="button"
				disabled={!tempSelectedSido}
				onClick={handleButtonClick}
				className={`label04-r-16 h-[5.2rem] w-full rounded-[1.2rem] ${!tempSelectedSido ? "bg-gray-300 text-gray-600" : "bg-primary-400 text-white"}
        `}
			>
				{buttonText}
			</button>
		</div>
	);
};
