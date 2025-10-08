import {Outlet} from "react-router";
import NavBar from "../NavBar/NavBar.tsx";


export default function Base() {

	return (
		<>
			<NavBar/>
			<Outlet/>
		</>
	)
}