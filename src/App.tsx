import "./App.css";
import NavBar from "./components/NavBar/NavBar.tsx";
import {Outlet} from "react-router";


function App() {
  return (
    <>
	    <NavBar/>
	    <Outlet/>
    </>
  );
}

export default App;
