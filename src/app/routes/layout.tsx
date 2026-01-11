import { Outlet } from "react-router";

export const Layout = () => {
	return (
		<>
			{/* Header 위치 */}
			<Outlet />
		</>
	);
};
