import {useState} from 'react';
import {ChoreT} from '../../models/Chores/ChoreT';

type ChoreDetailModalProps = {
	isOpen: boolean;
	onClose: () => void;
	chore: ChoreT | null;
	onUpdate: (id: string, name: string, description: string) => void;
	onDelete: (id: string) => void;
};

export default function ChoreDetailModal({
																					 isOpen,
																					 onClose,
																					 chore,
																					 onUpdate,
																					 onDelete
																				 }: ChoreDetailModalProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

	if (!isOpen || !chore) return null;

	const handleEdit = () => {
		setName(chore.name);
		setDescription(chore.description);
		setIsEditing(true);
	};

	const handleSave = () => {
		if (name.trim()) {
			onUpdate(chore.id, name.trim(), description.trim());
			setIsEditing(false);
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
		setName('');
		setDescription('');
	};

	const handleDelete = () => {
		onDelete(chore.id);
		setShowDeleteConfirm(false);
		onClose();
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
			<div className="bg-gray-800 rounded-lg shadow-xl max-w-lg w-full">
				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b border-gray-700">
					<h2 className="text-xl font-semibold text-white">
						{isEditing ? 'Edit Chore' : 'Chore Details'}
					</h2>
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

				{/* Content */}
				<div className="p-6 space-y-4">
					{isEditing ? (
						<>
							{/* Edit Mode */}
							<div>
								<label htmlFor="editChoreName" className="block text-sm font-medium text-gray-300 mb-2">
									Chore Name *
								</label>
								<input
									type="text"
									id="editChoreName"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="w-full px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
								/>
							</div>

							<div>
								<label htmlFor="editChoreDescription" className="block text-sm font-medium text-gray-300 mb-2">
									Description
								</label>
								<textarea
									id="editChoreDescription"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									className="w-full px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
									rows={4}
								/>
							</div>

							{/* Edit Actions */}
							<div className="flex gap-2 pt-4">
								<button
									onClick={handleCancel}
									className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors font-medium"
								>
									Cancel
								</button>
								<button
									onClick={handleSave}
									className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium"
								>
									Save Changes
								</button>
							</div>
						</>
					) : (
						<>
							{/* View Mode */}
							<div>
								<h3 className="text-sm font-medium text-gray-400 mb-1">Chore Name</h3>
								<p className="text-lg text-white font-medium">{chore.name}</p>
							</div>

							{chore.description && (
								<div>
									<h3 className="text-sm font-medium text-gray-400 mb-1">Description</h3>
									<p className="text-white whitespace-pre-wrap">{chore.description}</p>
								</div>
							)}

							{!chore.description && (
								<div>
									<h3 className="text-sm font-medium text-gray-400 mb-1">Description</h3>
									<p className="text-gray-500 italic">No description provided</p>
								</div>
							)}

							<div>
								<h3 className="text-sm font-medium text-gray-400 mb-1">Created</h3>
								<p className="text-white">
									{new Date(chore.created_at).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</p>
							</div>

							{/* View Actions */}
							<div className="flex gap-2 pt-4 border-t border-gray-700">
								<button
									onClick={handleEdit}
									className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium"
								>
									Edit
								</button>
								<button
									onClick={() => setShowDeleteConfirm(true)}
									className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors font-medium"
								>
									Delete
								</button>
							</div>
						</>
					)}
				</div>

				{/* Delete Confirmation */}
				{showDeleteConfirm && (
					<div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-lg">
						<div className="bg-gray-900 p-6 rounded-lg max-w-sm mx-4">
							<h3 className="text-xl font-semibold text-white mb-3">Delete Chore?</h3>
							<p className="text-gray-300 mb-6">
								Are you sure you want to delete "{chore.name}"? This will also delete all completion history for this chore. This action cannot be undone.
							</p>
							<div className="flex gap-3">
								<button
									onClick={() => setShowDeleteConfirm(false)}
									className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors font-medium"
								>
									Cancel
								</button>
								<button
									onClick={handleDelete}
									className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors font-medium"
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}