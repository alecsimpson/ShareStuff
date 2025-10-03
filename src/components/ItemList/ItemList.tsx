import {useState} from "react";
import Item from "../Item/Item.tsx";
import {v4 as uuid} from "uuid"


export type ItemData = {
    id: string;
    itemName: string,
    itemPrice: number,
    urgent: boolean,
    editState: boolean,
    dateAdded: Date,
}

type ItemListProps = {
    itemListData: ItemData[];
}




export default function ItemList({itemListData}: ItemListProps) {


    function addItem() {
        const newItem = {
            id: uuid(),
            itemName: '',
            itemPrice: 0,
            urgent: false,
            editState: true,
            dateAdded: new Date(),
        }

        itemListData.unshift(newItem)


    function updateItem(updatedItem: ItemData) {
       setItems(items => items.map(item => item.id === updatedItem.id ? updatedItem : item));
    }


    function saveItem(itemId: string) {
        const item = items.find(item => item.id === itemId)

        if (item) {
            updateItem({...item, editState: false})
            console.log('saving to DB...')
        }
    }


    function removeItem(id: string) {
        setItems(items => items.filter(item => item.id !== id));
    }


    return (
        <>
            <button onClick={addItem}>Add</button>
            {items.map((item, i) => (
                <div>
                    <hr/>
                    <Item
                        key={i}
                        item={item}
                        onChange={updateItem}
                        onSave={saveItem}
                        onDelete={removeItem}
                    />
                    <hr/>
                </div>
            ))}
        </>
    )

}