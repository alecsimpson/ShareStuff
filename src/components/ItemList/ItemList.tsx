import { useItems } from '../../contexts/ItemsContext';
import Item from "../Item/Item.tsx";
import {useMemo, useState} from "react";
import {ItemType} from "../../models/ItemType.ts";

type ItemListProps = {
	itemListId: number;
};


export default function ItemList({ itemListId }: ItemListProps) {
	const { allItems, userItems, currentUserId } = useItems();
	const [editMode, setEditMode] = useState(false);


	const draftItem: ItemType = {
		id: -1, // Temporary ID
		name: '',
		created_at: new Date(),
		created_by: currentUserId,
		urgent: false,
		bought: false,
		price: undefined,
		description: '',
		link: '',
		amount: undefined,
		image_url: '',
		store: '',
	};

	const allMode = useMemo(() => {return itemListId === 0}, [itemListId]);

	const displayItems = allMode
		? allItems
		: allItems.filter(item => userItems.has(item.id));

	const totalCost = displayItems.reduce(
		(total, curr) => {total += curr.price || 0; return total;}, 0);

	const onCreate = () => {
		setEditMode(true);
	}

	return (
		<div className="space-y-4">
			<p>Total: {totalCost}</p>
			{
				!editMode && (
					<button
						type="button"
						className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
						onClick={onCreate}
					>
						Create
					</button>
				)
			}
			{editMode &&
				<Item key={-1} item={draftItem} editMode={editMode} setEditMode={setEditMode}/>
			}
			{displayItems.map(item => (
				<Item
					key={item.id}
					item={item}
					showAddButton={allMode}
					editMode={editMode}
					setEditMode={setEditMode}
				/>
			))}
		</div>
	);
}