import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter} from "react-router";
import {RouterProvider} from "react-router/dom";
import User from "./components/User/User.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        Component: App
    },
    {
        path: "/user",
        Component: User
    }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
