import axios from "axios";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { apiUrls, baseUrl } from "../services/constants";

function Orders(){
    const [orders,setOrders]=useState([])
    const [show,setShow]=useState(false)
    const [details,setDetails]=useState([])

    useEffect(()=>{
        axios.get(baseUrl+apiUrls.ORDERS_LIST)
        .then(resp=>{
            console.log(resp.data)
            setOrders(resp.data.data)
        })
    },[]);

    const showDetails=(orderid)=>{
        axios.get(baseUrl+apiUrls.ORDER_DETAILS+orderid)
        .then(resp=>{
            console.log(resp.data)
            setDetails(resp.data.data.details)
        })
        setShow(true)
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-10 mx-auto">
                <h4 className="p-2 text-center text-white">My Purchased Orders</h4>
                <table className="table table-bordered table-sm table-light table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Purchase Date</th>
                            <th>Car Details</th>
                            <th>Customer</th>
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
                                    <br/>
                                    Price &#8377; {x.payment.amount}
                                </td>
                                <td>
                                   Name: {x.customer.name}<br/>
                                   Phone: {x.customer.phone}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>  
                </div>
                <div className="col-sm-5">
                    {show ? <>
                    <h4 className="p-2">Order Details</h4>
                    <table className="table table-bordered table-light table-hover table-striped table-sm">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Book</th>
                                <th>Price</th>
                                <th>Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.map(x => (
                                <tr key={x.book.bookid}>
                                    <td>{x.book.bookid}</td>
                                    <td><img className="mr-2 float-left" src={baseUrl+x.book.photo} width="100" />
                                    {x.book.bname}<br/>
                                    {x.book.cat}
                                    </td>
                                    <td>{x.book.price}</td>
                                    <td>{x.qty}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </> : ''}
                </div>
            </div>                
                              
        </div>                    
    )
}

export default Orders;