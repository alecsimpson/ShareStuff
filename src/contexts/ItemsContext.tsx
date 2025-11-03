import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {ItemT} from '../models/ItemT.ts';
import {itemsAPI} from '../services/api/itemsAPI.ts'
import {listsAPI} from "../services/api/listsAPI.ts";
import {ListT} from "../models/ListT.ts";

type ItemsContextType = {
	allItems: ItemT[];
	userItems: Set<string>;
	currentList: ListT | null;
	addItemToUser: (itemId: string) => void;
	removeItemFromUser: (itemId: string) => void;
	isItemInUserList: (itemId: string) => boolean;
	updateItem: (updated: ItemT) => void;
	deleteItem: (itemId: string) => void;
	loading: boolean;
	refreshItems: () => Promise<void>;
	createItem: (item: Omit<ItemT, 'id' | 'created_at'>) => Promise<void>;
	updateItemOrder: (itemIds: string[]) => Promise<void>;
};

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export function ItemsProvider({children}: { children: ReactNode }) {

	const [allItems, setAllItems] = useState<ItemT[]>([]);
	const [userItems, setUserItems] = useState<Set<string>>(new Set());
	const [currentList, setCurrentList] = useState<ListT | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		void refreshItems();
	}, []);


	const sortItemsByList = (items: ItemT[], list: ListT): ItemT[] => {
		const itemsMap = new Map(items.map(item => [item.id, item]));
		return list.items
			.map(itemId => itemsMap.get(itemId))
			.filter(item => item !== undefined) as ItemT[];
	}

	const refreshItems = async () => {
		try {
			setLoading(true);
			const allItems: ItemT[] = await itemsAPI.getAll();
			let sharedList: ListT = await listsAPI.getHomePageList();


			if(sharedList.items.length === 0) {
				sharedList = await listsAPI.updateList({
					...sharedList,
					items: allItems.map(item => item.id)
				})
			}

			setCurrentList(sharedList);
			setAllItems(sortItemsByList(allItems, sharedList));

		} catch (e) {
			console.error('Error fetching items:', e);
		} finally {
			setLoading(false);
		}
	};


	const updateItemOrder = async (itemIds: string[]) => {
		if (!currentList) return;

		const itemsMap = new Map(allItems.map(item => [item.id, item]));
		const reorderedItems = itemIds
			.map(id => itemsMap.get(id))
			.filter(item => item !== undefined) as ItemT[];

		setAllItems(reorderedItems);

		try {
			await listsAPI.updateList({
				...currentList,
				items: itemIds,
			});
		} catch (e) {
			console.error('Error updating list order:', e);
			void refreshItems();
		}
	};


	const addItemToUser = (itemId: string) => {
		// Ensure the user list is always a subset of allItems
		const existsInAll = allItems.some(item => item.id === itemId);
		if (!existsInAll) return;
		setUserItems(prev => new Set([...prev, itemId]));
	};

	const removeItemFromUser = (itemId: string) => {
		setUserItems(prev => {
			const newSet = new Set(prev);
			newSet.delete(itemId);
			return newSet;
		});
	};

	const isItemInUserList = (itemId: string) => {
		return userItems.has(itemId);
	};

	const updateItem = async (updated: ItemT) => {
		await itemsAPI.update(updated.id, updated);
		void refreshItems();
	};

	const deleteItem = async (itemId: string) => {
		await itemsAPI.delete(itemId);
		void refreshItems();
	}

	const createItem = async (item: ItemT | Omit<ItemT, 'id' | 'created_at'>) => {
		await itemsAPI.create(item);
		void refreshItems();
	}


	return (
		<ItemsContext.Provider value={{
			allItems,
			userItems,
			loading,
			addItemToUser,
			removeItemFromUser,
			isItemInUserList,
			createItem,
			updateItem,
			deleteItem,
			refreshItems,
			updateItemOrder,
			currentList,
		}}>
			{children}
		</ItemsContext.Provider>
	);
}

export function useItems() {
	const context = useContext(ItemsContext);
	if (!context) {
		throw new Error('useItems must be used within ItemsProvider');
	}
	return context;
}