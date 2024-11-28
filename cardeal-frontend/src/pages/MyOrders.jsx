import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Moment from "react-moment";
import { apiUrls, baseUrl } from "../services/constants";

function MyOrders(){
    const [orders,setOrders]=useState([])
    const [show,setShow]=useState(false)
    const [details,setDetails]=useState([])

    useEffect(()=>{
        axios.get(apiUrls.ORDERS_LIST+"?custid="+sessionStorage.getItem("id"))
        .then(resp=>{
            console.log(resp.data.data)
            setOrders(resp.data.data)
        })
    },[]);

    const showDetails=(orderid)=>{
        axios.get(apiUrls.ORDER_DETAILS+orderid)
        .then(resp=>{
            console.log(resp.data)
            setDetails(resp.data.data.details)
        })
        setShow(true)
    }
    
    return (
        <div className="container-fluid text-white">
            <div className="row">
                <div className="col-sm-10 mx-auto">
                <h4 className="p-2">My Purchased Orders</h4>
                <table className="table table-bordered table-sm table-light table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Purchase Date</th>
                            <th>Car Details</th>
                            <th>Amount</th>                       
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(x=>(
                            <tr key={x.orderid}>
                                <td>{x.orderid}</td>
                                <td><Moment format="ddd, DD-MMM-YYYY">{x.orderDate}</Moment></td>
                                <td>
                                    <img src={baseUrl+x.car.photo} style={{height:"80px"}} alt="car" /> 
                                    <br/>
                                    {x.car.cname}
                                    <br/>
                                    Fuel Type {x.car.fueltype}
                                </td>
                                <td>&#8377; {x.payment.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>  
                </div>
                
                </div>
            </div>                
    )
}
export default MyOrders;