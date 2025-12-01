import {useState} from 'react';

type AddChoreModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onAdd: (name: string, description: string) => void;
};

export default function AddChoreModal({ isOpen, onClose, onAdd }: AddChoreModalProps) {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	if (!isOpen) return null;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (name.trim()) {
			onAdd(name.trim(), description.trim());
			setName('');
			setDescription('');
			onClose();
		}
	};

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
			onClick={handleBackdropClick}
		>
			<div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b border-gray-700">
					<h2 className="text-xl font-semibold text-white">Add New Chore</h2>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-white transition-colors"
						aria-label="Close modal"
					>
						<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className="p-4 space-y-4">
					<div>
						<label htmlFor="choreName" className="block text-sm font-medium text-gray-300 mb-2">
							Chore Name *
						</label>
						<input
							type="text"
							id="choreName"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="e.g., Wash dishes"
							required
						/>
					</div>

					<div>
						<label htmlFor="choreDescription" className="block text-sm font-medium text-gray-300 mb-2">
							Description (optional)
						</label>
						<textarea
							id="choreDescription"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="w-full px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Additional details..."
							rows={3}
						/>
					</div>

					<div className="flex gap-2 pt-4">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors font-medium"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium"
						>
							Add Chore
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}