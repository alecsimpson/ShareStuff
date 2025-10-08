import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";
import Home from "./components/Home/Home.tsx";
import User from "./components/User/User.tsx";
import "./App.css";
import Base from "./components/Base/Base.tsx";

const routes = createBrowserRouter([
	{
		path: "/",
		Component: Base,
		children: [
			{
				path: "/",
				Component: Home,
			},
			{
				path: "user",
				Component: User,
			},
		]
	}
]);

function App() {
  return (
    <>
	    <RouterProvider router={routes} />
    </>
  );
}

export default App;
