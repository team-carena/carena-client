import { Outlet } from "react-router";

export const Layout = () => {
	return (
		<div>
			{/* Header 위치 */}
			<Outlet />
		</div>
	);
};
