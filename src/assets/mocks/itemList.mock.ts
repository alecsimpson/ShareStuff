import {v4 as uuid} from "uuid";


export const itemListMock = {
    itemList: [
        {
            uuid: uuid(),
            itemName: 'asd1',
            itemPrice: 123,
            urgent: false,
            editState: false,
            dateAdded: new Date(),
        },
        {
            uuid: uuid(),
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
            uuid: uuid(),
            itemName: 'user asd1',
            itemPrice: 1231231,
            urgent: false,
            editState: false,
            dateAdded: new Date(),
        },
        {
            uuid: uuid(),
            itemName: 'user asd2',
            itemPrice: 1342334,
            urgent: false,
            editState: false,
            dateAdded: new Date(),
        }
    ]
}