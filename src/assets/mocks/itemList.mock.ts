import {v4 as uuid} from "uuid";


export const itemListMock = {
    itemList: [
        {
            id: uuid(),
            itemName: 'asd1',
            itemPrice: 123,
            urgent: false,
            editState: false,
            dateAdded: new Date(),
        },
        {
            id: uuid(),
            itemName: 'asd2',
            itemPrice: 12334,
            urgent: false,
            editState: false,
            dateAdded: new Date(),
        }
    ]
}

export const itemListMock2 = {
    itemList: [
        {
            id: uuid(),
            itemName: 'user asd1',
            itemPrice: 1231231,
            urgent: false,
            editState: false,
            dateAdded: new Date(),
        },
        {
            id: uuid(),
            itemName: 'user asd2',
            itemPrice: 1342334,
            urgent: false,
            editState: false,
            dateAdded: new Date(),
        }
    ]
}