import { createContext, useContext, useState, ReactNode } from 'react';
import { ItemType } from '../models/ItemType';

type ItemsContextType = {
    allItems: ItemType[];
    userItems: Set<string>; // Set of item IDs the user has added
    addItemToUser: (itemId: string) => void;
    removeItemFromUser: (itemId: string) => void;
    isItemInUserList: (itemId: string) => boolean;
    updateItem: (updated: ItemType) => void;
    currentUserId: string;
};

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export function ItemsProvider({ children }: { children: ReactNode }) {
    // Mock data - replace with API calls later
   const [allItems, setAllItems] = useState<ItemType[]>([
	    {
	      id: '1',
	      name: 'Item 1',
	      description: 'Description 1',
	      addedAt: new Date('2025-01-01T10:00:00Z'),
	      addedBy: 'user_1',
	      urgent: true,
	      bought: false,
	      price: 12.99,
	      link: 'https://example.com/item1',
	      amount: 2,
	      image: 'https://picsum.photos/id/101/200/200'
	    },
	    {
	      id: '2',
	      name: 'Item 2',
	      description: 'Description 2',
	      addedAt: new Date('2025-02-15T12:00:00Z'),
	      addedBy: 'user_2',
	      urgent: false,
	      bought: true,
	      price: 5.49,
	      link: 'https://example.com/item2',
	      amount: 1,
	      image: 'https://picsum.photos/id/102/200/200'
	    },
	    {
	      id: '3',
	      name: 'Item 3',
	      description: 'Description 3',
	      addedAt: new Date('2025-03-20T15:30:00Z'),
	      addedBy: 'user_3',
	      urgent: false,
	      bought: false,
	      price: 24.0,
	      link: 'https://example.com/item3',
	      amount: 3,
	      image: 'https://picsum.photos/id/103/200/200'
	    },
	  ]);


    const [userItems, setUserItems] = useState<Set<string>>(new Set());

		console.log('userItems', userItems)

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

    const updateItem = (updated: ItemType) => {
        setAllItems(prev => prev.map(i => (i.id === updated.id ? { ...i, ...updated, addedAt: i.addedAt, addedBy: i.addedBy } : i)));
    };

    const currentUserId = 'user_1';

    return (
        <ItemsContext.Provider value={{
            allItems,
            userItems,
            addItemToUser,
            removeItemFromUser,
            isItemInUserList,
            updateItem,
            currentUserId,
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