import { useState } from 'react'

import './App.css'
import ItemList from "./components/ItemList/ItemList.tsx";
import {itemListMock} from "./assets/mocks/itemList.mock.ts";

function App() {

  return (
    <>
     <ItemList itemListData={itemListMock.itemList}/>
    </>
  )
}

export default App
