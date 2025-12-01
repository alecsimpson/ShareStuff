import {useState} from 'react';
import {ChoreCompletion} from '../../models/Chores/ChoreCompletion';

type ChoreHistoryModalProps = {
	isOpen: boolean;
	onClose: () => void;
	choreName: string;
	personName: string;
	completions: ChoreCompletion[];
	onAddDate: (date: string) => void;
	onRemoveDate: (completionId: string) => void;
};

export default function ChoreHistoryModal({
																						isOpen,
																						onClose,
																						choreName,
																						personName,
																						completions,
																						onAddDate,
																						onRemoveDate
																					}: ChoreHistoryModalProps) {
	const [selectedDate, setSelectedDate] = useState('');

	if (!isOpen) return null;

	const getTodayDateString = () => {
		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const day = String(today.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	};

	const handleAddToday = () => {
		const today = getTodayDateString();
		onAddDate(today);
	};

	const handleAddCustomDate = () => {
		if (selectedDate) {
			onAddDate(selectedDate);
			setSelectedDate('');
		}
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString + 'T00:00:00'); // Add time to prevent timezone issues
		const today = new Date();
		const yesterday = new Date(today);
		yesterday.setDate(yesterday.getDate() - 1);

		// Reset time for comparison
		today.setHours(0, 0, 0, 0);
		yesterday.setHours(0, 0, 0, 0);
		const compareDate = new Date(date);
		compareDate.setHours(0, 0, 0, 0);

		if (compareDate.getTime() === today.getTime()) {
			return 'Today';
		} else if (compareDate.getTime() === yesterday.getTime()) {
			return 'Yesterday';
		} else {
			return date.toLocaleDateString('en-US', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
		}
	};

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape') {
			onClose();
		}
	};

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
			onClick={handleBackdropClick}
			onKeyDown={handleKeyDown}
			tabIndex={-1}
		>
			<div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[80vh] flex flex-col animate-slide-up">
				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b border-gray-700">
					<h2 className="text-xl font-semibold text-white">
						{personName} - {choreName}
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

				{/* Add Date Section */}
				<div className="p-4 border-b border-gray-700 bg-gray-750">
					<div className="flex gap-2">
						<button
							onClick={handleAddToday}
							className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium"
						>
							+ Add Today
						</button>
						<input
							type="date"
							value={selectedDate}
							onChange={(e) => setSelectedDate(e.target.value)}
							className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<button
							onClick={handleAddCustomDate}
							disabled={!selectedDate}
							className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Add
						</button>
					</div>
				</div>

				{/* History List */}
				<div className="flex-1 overflow-y-auto p-4">
					{completions.length === 0 ? (
						<div className="text-center py-8 text-gray-400">
							<p className="text-lg mb-2">No history yet</p>
							<p className="text-sm">Add a date to get started!</p>
						</div>
					) : (
						<div className="space-y-2">
							{completions.map((completion) => (
								<div
									key={completion.id}
									className="flex items-center justify-between p-3 bg-gray-700 rounded-md hover:bg-gray-650 transition-colors group"
								>
									<div className="flex items-center gap-3">
										<span className="text-2xl">📅</span>
										<span className="text-white font-medium">
											{formatDate(completion.completed_date)}
										</span>
									</div>
									<button
										onClick={() => onRemoveDate(completion.id)}
										className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
										aria-label="Remove date"
									>
										<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
										</svg>
									</button>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}