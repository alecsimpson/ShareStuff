import "./App.css";
import NavBar from "./components/NavBar/NavBar.tsx";
import {Outlet} from "react-router";


function App() {
  return (
    <>
			<div className="bg-primary text-white min-h-screen">
				<NavBar/>
				<Outlet/>
			</div>
    </>
  );
}

export default App;
