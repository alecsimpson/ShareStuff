import {type ChangeEvent, type FormEvent, useMemo, useState} from "react";
import {v4 as uuid} from "uuid"
import type {ItemData} from "../ItemList/ItemList.tsx";


type ItemProps = {
    item: ItemData,
    onChange: (value: ItemData) => void,
    onSave: (itemId: string) => void,
    onDelete: (itemId: string) => void,
}

export default function Item({item, onSave, onDelete, onChange}: ItemProps ) {

    function handleChange(e: ChangeEvent<HTMLInputElement>) {

        const { name, value } = e.target;
        let updated = { ...item };

        switch (e.target.name) {
            case "name":
                updated.itemName = value;
                break;
            case "price":
                updated.itemPrice = Number(value);
        }

        onChange(updated)
    }


    return (
        <>
            {
                item.editState ?
                    <div>
                        <form
                            onSubmit={(e: FormEvent<HTMLFormElement>) => {
                                e.preventDefault();
                                onSave(item.id);
                            }}
                            style={{display: "flex", flexDirection: "column"}}
                        >
                            <input
                                name="name"
                                type="text"
                                placeholder={'Item name...'}
                                value={item.itemName}
                                onChange={handleChange}
                            />
                            <input
                                name="price"
                                type="number"
                                placeholder={'Item price...'}
                                value={item.itemPrice}
                                onChange={handleChange}
                            />
                            <button type="submit">Save</button>
                            <button onClick={() => onDelete(item.id)}>Delete</button>
                        </form>
                    </div>
                    :
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <p>{item.itemName}</p>
                        <p>{'$' + item.itemPrice}</p>
                        {item.urgent ? <p>Urgent!</p> : null}
                        <button onClick={() => {
                            onChange({...item, urgent: !item.urgent})
                        }}>
                            {item.urgent ? 'Not urgent' : 'Urgent!'}
                        </button>
                        <button onClick={() => {
                            onChange({...item, editState: true})
                        }}>
                            Edit
                        </button>
                        <p>{`Date Added: ${item.dateAdded.toLocaleDateString()}`}</p>
                    </div>
            }
        </>
    )
}