import { useItems } from '../../contexts/ItemsContext';
import Item from "../Item/Item.tsx";

type ItemListProps = {
	itemListId: string;
	showAddButton?: boolean; // true for home, false for user page
};

export default function ItemList({ itemListId, showAddButton = false }: ItemListProps) {
	const { allItems, userItems } = useItems();

	// Filter items based on context
	const displayItems = showAddButton
		? allItems // Show all items on home page
		: allItems.filter(item => userItems.has(item.id)); // Show only user's items on user page

	return (
		<div className="space-y-4">
			{displayItems.map(item => (
				<Item
					key={item.id}
					item={item}
					showAddButton={showAddButton}
				/>
			))}
		</div>
	);
}