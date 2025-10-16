import {createContext, useContext, useState, ReactNode, useEffect} from 'react';
import {ItemType} from '../models/ItemType';
import {itemsAPI} from '../services/api/itemsAPI.ts'

type ItemsContextType = {
	allItems: ItemType[];
	userItems: Set<number>;
	addItemToUser: (itemId: number) => void;
	removeItemFromUser: (itemId: number) => void;
	isItemInUserList: (itemId: number) => boolean;
	updateItem: (updated: ItemType) => void;
	deleteItem: (itemId: number) => void;
	currentUserId: string;
	loading: boolean;
	refreshItems: () => Promise<void>;
	createItem: (item: Omit<ItemType, 'id' | 'created_at'>) => Promise<void>;
};

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export function ItemsProvider({children}: { children: ReactNode }) {

	const [allItems, setAllItems] = useState<ItemType[]>([]);
	const [userItems, setUserItems] = useState<Set<number>>(new Set());
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		void refreshItems();
	}, []);

	const refreshItems = async () => {
		try {
			setLoading(true);
			const data = await itemsAPI.getAll();
			setAllItems(data);
		} catch (e) {
			console.error('Error fetching items:', e);
		} finally {
			setLoading(false);
		}
	};

	const addItemToUser = (itemId: number) => {
		// Ensure the user list is always a subset of allItems
		const existsInAll = allItems.some(item => item.id === itemId);
		if (!existsInAll) return;
		setUserItems(prev => new Set([...prev, itemId]));
	};

	const removeItemFromUser = (itemId: number) => {
		setUserItems(prev => {
			const newSet = new Set(prev);
			newSet.delete(itemId);
			return newSet;
		});
	};

	const isItemInUserList = (itemId: number) => {
		return userItems.has(itemId);
	};

	const updateItem = async (updated: ItemType) => {
		await itemsAPI.update(updated.id, updated);
		void refreshItems();
	};

	const deleteItem = async (itemId: number) => {
		await itemsAPI.delete(itemId);
		void refreshItems();
	}

	const createItem = async (item: ItemType | Omit<ItemType, 'id' | 'created_at'>) => {
		await itemsAPI.create(item);
		void refreshItems();
	}

	const currentUserId = 'user_1';

	return (
		<ItemsContext.Provider value={{
			allItems,
			userItems,
			loading,
			currentUserId,
			addItemToUser,
			removeItemFromUser,
			isItemInUserList,
			createItem,
			updateItem,
			deleteItem,
			refreshItems,
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