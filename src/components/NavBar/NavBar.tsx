import {NavLink} from "react-router";
import {useAuth} from "../../contexts/AuthContext";


export default function NavBar() {

	const {user, signOut} = useAuth();

	const handleSignOut = async () => {
		await signOut();
	}

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
	        {user && (
		        <div className="flex items-center space-x-4">
			        <span className="text-sm text-gray-700">{user.email}</span>
			        <button
				        onClick={handleSignOut}
				        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
			        >
				        Sign out
			        </button>
		        </div>
	        )}
        </div>
      </div>
    </nav>
  )
}