import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ItemsProvider} from "./contexts/ItemsContext.tsx";
import {RouterProvider} from "react-router/dom";
import {createBrowserRouter} from "react-router";
import Home from "./components/Home/Home.tsx";
import User from "./components/User/User.tsx";
import Login from "./components/Login/Login.tsx";
import {ProtectedRoute} from "./components/ProtectedRoute/ProtectedRoute.tsx";
import {AuthProvider} from "./contexts/AuthContext.tsx";

const routes = createBrowserRouter([
	{
		path: "/login",
		Component: Login,
	},
	{
		path: "/",
		Component: App,
		children: [
			{
				path: "/",
				element: (
					<Home/>
				)
			},
			{
				path: "user",
				element: (
					<ProtectedRoute>
						<User />
					</ProtectedRoute>
				),
			},
		]
	}
], {basename: import.meta.env.BASE_URL});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
	    <AuthProvider>
		    <ItemsProvider>
			    <RouterProvider router={routes}/>
		    </ItemsProvider>
	    </AuthProvider>
    </StrictMode>
)
