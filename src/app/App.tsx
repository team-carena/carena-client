import "@app/styles/global.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/router";

export const App = () => {
	return <RouterProvider router={router} />;
};
