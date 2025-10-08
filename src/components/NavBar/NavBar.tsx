import {NavLink} from "react-router";

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
	        <NavLink to="/" className="text-lg font-semibold tracking-tight">ShareStuff</NavLink>
	        <nav>
		        <div className="flex items-center gap-1">
			        <NavLink
				        to="/"
				        className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
			        >
				        Home
			        </NavLink>
			        <NavLink
				        to="/user"
				        className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
			        >
				        User
			        </NavLink>
            </div>
	        </nav>
        </div>
      </div>
    </nav>
  )
}