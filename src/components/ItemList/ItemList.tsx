import {useItems} from '../../contexts/ItemsContext';
import Item from "../Item/Item.tsx";
import {useMemo, useState} from "react";
import {useAuth} from "../../contexts/AuthContext.tsx";

type ItemListProps = {
	itemListKey?: string;
};


export default function ItemList({ itemListKey = 'shared' }: ItemListProps) {

	const { allItems, userItems } = useItems();
	const { user } = useAuth();
	const [editingItem, setEditingItem] = useState<string | null>(null);
	const allMode = useMemo(() => {return itemListKey === 'shared'}, [itemListKey]);
	const displayItems = allMode
		? allItems
		: allItems.filter(item => userItems.has(item.id));

	const totalCost = displayItems.reduce(
		(total, curr) => {total += curr.price || 0; return total;}, 0);


	const onCreate = () => {
		setEditingItem('new');
	}

	return (
		<div className="space-y-4">
			<p className="text-sm sm:text-base">Total: ${totalCost}</p>
			{
				!editingItem && (
					<button
						type="button"
						className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
						onClick={onCreate}
					>
						Create
					</button>
				)
			}
			{editingItem === 'new' &&
				<Item
					item={{
						id: '',
						name: '',
						created_at: new Date(),
						created_by: user ? user.id : '0',
						urgent: false,
						bought: false,
						price: undefined,
						description: '',
						link: '',
						amount: undefined,
						image_url: '',
						store: '',
					}}
					editMode={true}
					setEditMode={(mode) => {!mode && setEditingItem(null)}}/>
			}
			{displayItems.map(item => (
				<Item
					key={item.id}
					item={item}
					editMode={editingItem === item.id}
					setEditMode={(mode) => {setEditingItem(mode ? item.id : null);}}
				/>
			))}
		</div>
	);
}