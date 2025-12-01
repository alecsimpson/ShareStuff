import {useEffect, useState} from 'react';
import {ChoreT} from '../../models/Chores/ChoreT';
import {Person} from '../../models/Chores/Person';
import {ChoreCompletion} from '../../models/Chores/ChoreCompletion';
import ChoreTable from './ChoreTable';
import AddChoreModal from './AddChoreModal';
import ChoreDetailModal from './ChoreDetailModal';
import {choresAPI} from '../../services/api/choresAPI';

export default function Chore() {
	const [chores, setChores] = useState<ChoreT[]>([]);
	const [people, setPeople] = useState<Person[]>([]);
	const [completions, setCompletions] = useState<ChoreCompletion[]>([]);
	const [isAddChoreModalOpen, setIsAddChoreModalOpen] = useState(false);
	const [selectedChore, setSelectedChore] = useState<ChoreT | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Load initial data
	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		try {
			setLoading(true);
			setError(null);
			const [choresData, peopleData, completionsData] = await Promise.all([
				choresAPI.getChores(),
				choresAPI.getPeople(),
				choresAPI.getCompletions()
			]);
			setChores(choresData);
			setPeople(peopleData);
			setCompletions(completionsData);
		} catch (err) {
			console.error('Error loading data:', err);
			setError('Failed to load data. Please check your Supabase connection.');
		} finally {
			setLoading(false);
		}
	};

	const handleAddChore = async (name: string, description: string) => {
		try {
			const newChore = await choresAPI.createChore({
				name,
				description,
				due_date: '',
				completed: false,
				created_by: '',
				assigned_to: '',
				assigned_by: ''
			});
			setChores((prev) => [newChore, ...prev]);
		} catch (err) {
			console.error('Error adding chore:', err);
			alert('Failed to add chore. Please try again.');
		}
	};

	const handleUpdateChore = async (id: string, name: string, description: string) => {
		try {
			const updatedChore = await choresAPI.updateChore(id, { name, description });
			setChores((prev) => prev.map((c) => (c.id === id ? updatedChore : c)));
			setSelectedChore(updatedChore);
		} catch (err) {
			console.error('Error updating chore:', err);
			alert('Failed to update chore. Please try again.');
		}
	};

	const handleDeleteChore = async (id: string) => {
		try {
			await choresAPI.deleteChore(id);
			setChores((prev) => prev.filter((c) => c.id !== id));
			// Also remove associated completions
			setCompletions((prev) => prev.filter((c) => c.chore_id !== id));
		} catch (err) {
			console.error('Error deleting chore:', err);
			alert('Failed to delete chore. Please try again.');
		}
	};

	const handleAddCompletion = async (completion: ChoreCompletion) => {
		try {
			const newCompletion = await choresAPI.createCompletion({
				chore_id: completion.chore_id,
				person_id: completion.person_id,
				completed_date: completion.completed_date
			});
			setCompletions((prev) => [newCompletion, ...prev]);
		} catch (err) {
			console.error('Error adding completion:', err);
			alert('Failed to add completion. Please try again.');
		}
	};

	const handleRemoveCompletion = async (completionId: string) => {
		try {
			await choresAPI.deleteCompletion(completionId);
			setCompletions((prev) => prev.filter((c) => c.id !== completionId));
		} catch (err) {
			console.error('Error removing completion:', err);
			alert('Failed to remove completion. Please try again.');
		}
	};

	if (loading) {
		return (
			<div className="bg-transparent text-white mx-auto max-w-6xl px-4 py-6">
				<div className="flex items-center justify-center py-12">
					<div className="text-gray-400">Loading...</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-transparent text-white mx-auto max-w-6xl px-4 py-6">
				<div className="bg-red-900 border border-red-700 rounded-lg p-4 text-red-200">
					{error}
				</div>
			</div>
		);
	}

	return (
		<div className="bg-transparent text-white mx-auto max-w-6xl px-4 py-6 space-y-6">
			<header className="flex items-center justify-between">
				<div className="space-y-1">
					<h1 className="text-2xl font-semibold tracking-tight">Chore Tracker</h1>
					<p className="text-sm text-gray-500">Track who completed which chores and when.</p>
				</div>
				<button
					onClick={() => setIsAddChoreModalOpen(true)}
					className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium"
				>
					+ Add Chore
				</button>
			</header>

			{chores.length === 0 ? (
				<div className="text-center py-12 text-gray-400">
					<p className="text-lg mb-2">No chores yet</p>
					<p className="text-sm">Click "Add Chore" to get started!</p>
				</div>
			) : (
				<ChoreTable
					chores={chores}
					people={people}
					completions={completions}
					onAddCompletion={handleAddCompletion}
					onRemoveCompletion={handleRemoveCompletion}
					onChoreClick={setSelectedChore}
				/>
			)}

			<AddChoreModal
				isOpen={isAddChoreModalOpen}
				onClose={() => setIsAddChoreModalOpen(false)}
				onAdd={handleAddChore}
			/>

			<ChoreDetailModal
				isOpen={selectedChore !== null}
				onClose={() => setSelectedChore(null)}
				chore={selectedChore}
				onUpdate={handleUpdateChore}
				onDelete={handleDeleteChore}
			/>
		</div>
	);
}