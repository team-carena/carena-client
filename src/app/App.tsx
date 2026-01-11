import { Modal } from "@shared/ui/Modal";
import "@app/styles/global.css";

export const App = () => {
	return (
		<Modal
			open={true}
			title="내용"
			description="두줄 가능"
			primaryAction={{ label: "버튼", onClick: () => {} }}
			secondaryAction={{ label: "버튼", onClick: () => {} }}
		/>
	);
};
