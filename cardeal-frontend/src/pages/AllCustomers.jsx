import axios from "axios";
import { useMemo } from "react";
import { useEffect, useState } from "react";
import Table from "../components/Table";
import { apiUrls } from "../services/constants";

function AllCustomers(){
    const [customers,setCustomers]=useState([])
    const [loading,setloading]=useState(true)
    const columns=useMemo(()=>[
        { Header:'Name',accessor:'name'},
        { Header:'City',accessor:'city'},
        { Header:'Gender',accessor:'gender'},
        { Header:'Phone',accessor:'phone'},
        { Header:'User Id',accessor:'userid'}
    ])
    const data=useMemo(()=>customers)

    useEffect(()=>{
        if(loading){
            loadData()
        }
    },[])

    const loadData=()=>{
        axios.get(apiUrls.CUSTOMERS_LIST)
        .then(resp=>{
            console.log("data => ",resp.data)
            setCustomers(resp.data)
            setloading(false)
        })
    }

    return (
        <div className="container-fluid">
            <h4 className="text-white p-2 text-center">All Customers</h4>
            {loading ? (<h4>loading...</h4>):(
                <Table data={data} columns={columns} />
                )}
        </div>
    )
}

export default AllCustomers;