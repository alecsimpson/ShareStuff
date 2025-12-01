import {useState} from 'react';
import {ChoreT} from '../../models/Chores/ChoreT';
import {Person} from '../../models/Chores/Person';
import {ChoreCompletion} from '../../models/Chores/ChoreCompletion';
import {ModalData} from '../../models/Chores/ModalData';
import ChoreCell from './ChoreCell';
import ChoreHistoryModal from './ChoreHistoryModal';
import {v4 as uuidv4} from 'uuid';

type ChoreTableProps = {
	chores: ChoreT[];
	people: Person[];
	completions: ChoreCompletion[];
	onAddCompletion: (completion: ChoreCompletion) => void;
	onRemoveCompletion: (completionId: string) => void;
	onChoreClick: (chore: ChoreT) => void;
};

export default function ChoreTable({
																		 chores,
																		 people,
																		 completions,
																		 onAddCompletion,
																		 onRemoveCompletion,
																		 onChoreClick
																	 }: ChoreTableProps) {
	const [modalData, setModalData] = useState<ModalData>(null);
	const [selectedPersonId, setSelectedPersonId] = useState<string>(people[0]?.id || '');

	const getCompletionsForCell = (choreId: string, personId: string) => {
		return completions.filter(
			(c) => c.chore_id === choreId && c.person_id === personId
		);
	};

	const handleCellClick = (choreId: string, personId: string) => {
		const chore = chores.find((c) => c.id === choreId);
		const person = people.find((p) => p.id === personId);

		if (chore && person) {
			setModalData({
				choreId: chore.id,
				choreName: chore.name,
				personId: person.id,
				personName: person.name
			});
		}
	};

	const handleAddDate = (date: string) => {
		if (modalData) {
			const newCompletion: ChoreCompletion = {
				id: uuidv4(),
				chore_id: modalData.choreId,
				person_id: modalData.personId,
				completed_date: date,
				created_at: new Date().toISOString()
			};
			onAddCompletion(newCompletion);
		}
	};

	const handleRemoveDate = (completionId: string) => {
		onRemoveCompletion(completionId);
	};

	const currentCompletions = modalData
		? getCompletionsForCell(modalData.choreId, modalData.personId)
		: [];

	const selectedPerson = people.find((p) => p.id === selectedPersonId);

	return (
		<>
			{/* Desktop View */}
			<div className="max-md:hidden overflow-x-auto">
				<table className="w-full border-collapse bg-gray-800 rounded-lg overflow-hidden">
					<thead>
					<tr className="bg-gray-900">
						<th className="px-4 py-3 text-left text-white font-semibold border-r border-gray-700 sticky left-0 bg-gray-900 z-10">
							Chore Name
						</th>
						{people.map((person) => (
							<th
								key={person.id}
								className="px-4 py-3 text-center text-white font-semibold border-r border-gray-700 last:border-r-0 min-w-[150px]"
							>
								{person.name}
							</th>
						))}
					</tr>
					</thead>
					<tbody>
					{chores.map((chore, index) => (
						<tr
							key={chore.id}
							className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-850'}
						>
							<td className="px-4 py-3 border-r border-gray-700 sticky left-0 bg-inherit z-10">
								<button
									onClick={() => onChoreClick(chore)}
									className="text-white font-medium hover:text-blue-400 transition-colors text-left w-full"
								>
									{chore.name}
								</button>
							</td>
							{people.map((person) => (
								<td
									key={person.id}
									className="border-r border-gray-700 last:border-r-0"
								>
									<ChoreCell
										choreId={chore.id}
										personId={person.id}
										completions={getCompletionsForCell(chore.id, person.id)}
										onClick={() => handleCellClick(chore.id, person.id)}
									/>
								</td>
							))}
						</tr>
					))}
					</tbody>
				</table>
			</div>

			{/* Mobile View */}
			<div className="md:hidden">
				<table className="w-full border-collapse bg-gray-800 rounded-lg overflow-hidden">
					<thead>
					<tr className="bg-gray-900">
						<th className="px-4 py-3 text-left text-white font-semibold border-r border-gray-700">
							Chore Name
						</th>
						<th className="px-4 py-3 text-center border-gray-700">
							<select
								value={selectedPersonId}
								onChange={(e) => setSelectedPersonId(e.target.value)}
								className="bg-gray-900 text-white font-semibold px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
							>
								{people.map((person) => (
									<option key={person.id} value={person.id}>
										{person.name}
									</option>
								))}
							</select>
						</th>
					</tr>
					</thead>
					<tbody>
					{chores.map((chore, index) => (
						<tr
							key={chore.id}
							className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-850'}
						>
							<td className="px-4 py-3 border-r border-gray-700">
								<button
									onClick={() => onChoreClick(chore)}
									className="text-white font-medium hover:text-blue-400 transition-colors text-left w-full"
								>
									{chore.name}
								</button>
							</td>
							<td className="border-gray-700">
								{selectedPerson && (
									<ChoreCell
										choreId={chore.id}
										personId={selectedPersonId}
										completions={getCompletionsForCell(chore.id, selectedPersonId)}
										onClick={() => handleCellClick(chore.id, selectedPersonId)}
									/>
								)}
							</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>

			<ChoreHistoryModal
				isOpen={modalData !== null}
				onClose={() => setModalData(null)}
				choreName={modalData?.choreName || ''}
				personName={modalData?.personName || ''}
				completions={currentCompletions}
				onAddDate={handleAddDate}
				onRemoveDate={handleRemoveDate}
			/>
		</>
	);
}