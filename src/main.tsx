import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ItemsProvider } from "./contexts/ItemsContext.tsx";
import {RouterProvider} from "react-router/dom";
import {createBrowserRouter} from "react-router";
import Home from "./components/Home/Home.tsx";
import User from "./components/User/User.tsx";

const routes = createBrowserRouter([
	{
		path: "/",
		Component: App,
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

createRoot(document.getElementById('root')!).render(
    <StrictMode>
	    <ItemsProvider>
		    <RouterProvider router={routes}/>
	    </ItemsProvider>
    </StrictMode>
)
