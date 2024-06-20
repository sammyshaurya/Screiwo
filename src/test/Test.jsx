import React from 'react'
import { Table } from './Table'
import {users,products} from "./data"

const Test = () => {
    const [table,settable] = React.useState(null)
    const SelectedData = {users: users.id,department: users.department,experience: users.experience}
    console.log(SelectedData)

    console.log(SelectedData)
    return (
    <div>
        <button onClick={()=>{settable("product")}} >Products</button>
        <button onClick={()=>{settable("user")}}>Users</button>
        <Table table={table} data={table == "product" ? products: table=="user" ? SelectedData : ""}/>
    </div>
  )
}

export default Test