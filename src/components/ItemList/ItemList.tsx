import { useItems } from '../../contexts/ItemsContext';
import Item from "../Item/Item.tsx";
import {useMemo} from "react";

type ItemListProps = {
	itemListId: string;
};

export default function ItemList({ itemListId }: ItemListProps) {
	const { allItems, userItems } = useItems();

	const allMode = useMemo(() => {return itemListId === 'all'}, [itemListId]);

	const displayItems = allMode
		? allItems
		: allItems.filter(item => userItems.has(item.id));

	const totalCost = displayItems.reduce(
		(total, curr) => {total += curr.price || 0; return total;}, 0);

	return (
		<div className="space-y-4">
			<p>Total: {totalCost}</p>
			{displayItems.map(item => (
				<Item
					key={item.id}
					item={item}
					showAddButton={allMode}
				/>
			))}
		</div>
	);
}