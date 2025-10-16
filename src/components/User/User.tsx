import { useState } from "react";
import ItemList from "../ItemList/ItemList.tsx";
import { useItems } from "../../contexts/ItemsContext";

export type User = {
  userid: number;
  displayName: string;
};

export default function User() {
  const [userData] = useState<User>(getUserData());
  const { userItems } = useItems();

  function getUserData(): User {
    return {
      userId: "user_1",
      displayName: "alec",
    };
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{userData.displayName}</h1>
        <p className="text-sm text-gray-500">Your items: {userItems.size}</p>
      </header>
      <ItemList itemListId="userId" showAddButton={false} />
    </div>
  );
}