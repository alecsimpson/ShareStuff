import {FormEvent, useState} from 'react';
import {useNavigate} from 'react-router';
import {useAuth} from '../../contexts/AuthContext';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isSignUp, setIsSignUp] = useState(false);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const navigate = useNavigate();
	const { signIn, signUp } = useAuth();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);
		setSuccessMessage(null);

		try {
			if (isSignUp) {
				const { error } = await signUp(email, password);
				if (error) {
					setError(error.message);
				} else {
					setSuccessMessage('Check your email to confirm your account!');
					setEmail('');
					setPassword('');
				}
			} else {
				const { error } = await signIn(email, password);
				if (error) {
					setError(error.message);
				} else {
					navigate('/');
				}
			}
		} catch (err) {
			setError('An unexpected error occurred');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
				<div>
					<h2 className="text-center text-3xl font-bold text-gray-900">
						{isSignUp ? 'Create an account' : 'Sign in to your account'}
					</h2>
				</div>

				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					{error && (
						<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
							{error}
						</div>
					)}

					{successMessage && (
						<div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
							{successMessage}
						</div>
					)}

					<div className="space-y-4">
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">
								Email address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								placeholder="you@example.com"
							/>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								placeholder="••••••••"
								minLength={6}
							/>
							{isSignUp && (
								<p className="mt-1 text-sm text-gray-500">
									Password must be at least 6 characters
								</p>
							)}
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={isLoading}
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? 'Loading...' : (isSignUp ? 'Sign up' : 'Sign in')}
						</button>
					</div>
				</form>

				<div className="text-center">
					<button
						type="button"
						onClick={() => {
							setIsSignUp(!isSignUp);
							setError(null);
							setSuccessMessage(null);
						}}
						className="text-sm text-blue-600 hover:text-blue-500"
					>
						{isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
					</button>
				</div>
			</div>
		</div>
	);
}