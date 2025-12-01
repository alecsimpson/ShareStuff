import {ChoreCompletion} from '../../models/Chores/ChoreCompletion';

type ChoreCellProps = {
	choreId: string;
	personId: string;
	completions: ChoreCompletion[];
	onClick: () => void;
};

export default function ChoreCell({ completions, onClick }: ChoreCellProps) {
	const sortedCompletions = [...completions].sort(
		(a, b) => new Date(b.completed_date + 'T00:00:00').getTime() - new Date(a.completed_date + 'T00:00:00').getTime()
	);

	const latestDate = sortedCompletions[0]?.completed_date;
	const count = completions.length;

	const formatDate = (dateString: string) => {
		// Parse date in local timezone by adding time component
		const date = new Date(dateString + 'T00:00:00');
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	};

	return (
		<button
			onClick={onClick}
			className="w-full h-full px-4 py-3 text-left hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
		>
			{latestDate ? (
				<div className="flex items-center justify-between">
					<span className="text-white font-medium">{formatDate(latestDate)}</span>
					<span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded-full">
						{count}
					</span>
				</div>
			) : (
				<span className="text-gray-500">—</span>
			)}
		</button>
	);
}