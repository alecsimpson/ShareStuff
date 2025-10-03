import {useMemo, useState} from "react";
import ItemList, {type ItemData} from "../ItemList/ItemList.tsx";
import {itemListMock2} from "../../assets/mocks/itemList.mock.ts";


export type User = {
    userId: string;
    displayName: string;
    itemList: ItemData[]
}




export default function User(){

    const [userData, setUserData] = useState<User>(getUserData())

    const totalSpent = useMemo(() => {
        return userData.itemList.reduce((sum, item) =>  sum + (item.itemPrice || 0), 0) },
        [userData]
    )


    function getUserData(): User {
        return {
            userId: "asd",
            displayName: "alec",
            itemList: itemListMock2.itemList
        }
    }

    return (
        <>
            <div>
                <h3>{userData.displayName}</h3>
                <hr/>
                <p>{`Total spent: $${totalSpent}`}</p>
                <hr/>
                <ItemList itemListData={userData.itemList}/>
                <hr/>
            </div>
        </>
    )
}