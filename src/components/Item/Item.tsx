import { useItems } from '../../contexts/ItemsContext';
import { ItemType } from "../../models/ItemType.ts";
import {useState} from "react";
import ItemForm from "./ItemForm/ItemForm.tsx";


type ItemProps = {
  item: ItemType;
  showAddButton?: boolean;
};


export default function Item({ item, showAddButton }: ItemProps) {
  const { addItemToUser, removeItemFromUser, isItemInUserList, updateItem, currentUserId } = useItems();

	const [editing, setEditing] = useState<boolean>(false);

	const isAdded = isItemInUserList(item.id);
	const addedAtLabel = item.addedAt ? new Date(item.addedAt).toLocaleString() : '';
	const canEdit = item.addedBy === currentUserId;


  return (
		<>
			{
				editing ?
					<>
						<ItemForm
							item={item}
							onCancel={() => setEditing(false)}
							onSave={(updated) => { updateItem(updated); setEditing(false); }}
						/>
					</>
				:
					<>
						<div className={`bg-white border rounded-xl p-4 sm:p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow ${item.urgent ? 'ring-1 ring-red-200' : ''} ${item.bought ? 'ring-1 ring-green-200' : ''}`}>
							{/* Thumbnail */}
							{item.image && (
								<img
									src={item.image}
									alt={item.name}
									className="w-20 h-20 sm:w-24 sm:h-24 rounded-md object-cover border"
								/>
							)}

							{/* Main content */}
							<div className="flex-1 min-w-0">
								<div className="flex flex-wrap items-center gap-2">
									<h3 className={`font-semibold text-base sm:text-lg ${item.bought ? 'line-through text-gray-500' : 'text-gray-900'}`}>
										{item.name}
									</h3>
									{/* Clickable status chips */}
									<span
										role="button"
										tabIndex={0}
										aria-pressed={item.urgent}
										title={item.urgent ? 'Mark not urgent' : 'Mark urgent'}
										onClick={() => updateItem({ ...item, urgent: !item.urgent })}
										onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); updateItem({ ...item, urgent: !item.urgent }); } }}
										className={`cursor-pointer select-none text-xs font-medium px-2 py-1 rounded-full border transition-colors
											${item.urgent ? 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}
									>
										Urgent
									</span>
									<span
										role="button"
										tabIndex={0}
										aria-pressed={item.bought}
										title={item.bought ? 'Mark not bought' : 'Mark bought'}
										onClick={() => updateItem({ ...item, bought: !item.bought })}
										onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); updateItem({ ...item, bought: !item.bought }); } }}
										className={`cursor-pointer select-none text-xs font-medium px-2 py-1 rounded-full border transition-colors
											${item.bought ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}
									>
										Bought
									</span>
								</div>

								{item.description && (
									<p className="mt-1 text-sm text-gray-600 line-clamp-2">{item.description}</p>
								)}

								<div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-700">
									{typeof item.price === 'number' && (
										<span className="inline-flex items-center gap-1">
              <span className="text-gray-500">Price:</span>
              <span className="font-medium">${item.price.toFixed(2)}</span>
            </span>
									)}
									{typeof item.amount === 'number' && (
										<span className="inline-flex items-center gap-1">
              <span className="text-gray-500">Amount:</span>
              <span className="font-medium">{item.amount}</span>
            </span>
									)}
									{item.link && (
										<a
											href={item.link}
											target="_blank"
											rel="noreferrer"
											className="text-blue-600 hover:text-blue-700 hover:underline"
										>
											View link
										</a>
									)}
								</div>

								<div className="mt-2 text-xs text-gray-500">
									<span>Added by </span>
									<span className="font-medium text-gray-700">{item.addedBy}</span>
									{addedAtLabel && <span> • {addedAtLabel}</span>}
								</div>
							</div>

  					{/* Actions */}
						<div className="self-center flex items-center gap-2">
							{showAddButton ? (
								<button
									onClick={() => (isAdded ? removeItemFromUser(item.id) : addItemToUser(item.id))}
									className={`px-3 sm:px-4 py-2 rounded-md text-white text-sm font-medium shadow ${
										isAdded
											? 'bg-red-500 hover:bg-red-600'
											: 'bg-blue-500 hover:bg-blue-600'
										}`}
								>
									{isAdded ? 'Remove' : 'Add'}
								</button>
							) : (
								<button
									onClick={() => removeItemFromUser(item.id)}
									className="px-3 sm:px-4 py-2 rounded-md bg-red-500 text-white text-sm font-medium shadow hover:bg-red-600"
								>
									Remove
								</button>
							)}


							{canEdit && (
								<button
									onClick={() => setEditing(true)}
									className="px-3 sm:px-4 py-2 rounded-md bg-gray-200 text-gray-800 text-sm font-medium shadow hover:bg-gray-300"
								>
									Edit
								</button>
							)}
						</div>
						</div>
					</>
			}
		</>
  );
}