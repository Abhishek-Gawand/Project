import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { apiUrls, baseUrl } from "../services/constants";

function MyProducts(){
    const [products,setProducts]=useState([])
    useEffect(()=>{
        loadData()
    },[])
    const loadData=()=>{
        axios.get(apiUrls.CARS_LIST)
        .then(resp=>{
            console.log(resp.data)
            setProducts(resp.data)
            console.log(products)
        })
    }

    const deleteProduct = (prodid)=>{
        let resp=window.confirm('Are you sure to delete this car ?');
        if(resp){
            axios.delete(apiUrls.DELETE_CAR+prodid)
            .then(resp=>{
                toast.success("Product deleted successfully")
                loadData()
            })            
        }
    }
    
    return (
        <div className="container">
            <div className="card shadow">
                <div className="card-body">                    
            <h4 className="text-center">Cars List</h4>
            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>FuelType</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Action</th>                                
                    </tr>
                </thead>
                <tbody>
                {products?.map(x=>(
                    <tr key={x.prodid}>
                        <td><img style={{width:"60px",height:"60px"}} alt="car" src={baseUrl+ x.photo} 
                        className="img-thumnail mr-2" />{x.bname}</td>
                        <td>{x.category.catname}</td>
                        <td>{x.fueltype}</td>
                        <td>{x.price}</td>
                        <td>{x.qty}</td>
                        <td>
                            <Link to={"/edit/"+x.carid} className="btn btn-primary btn-sm mr-2">Edit</Link>
                            <button onClick={()=>deleteProduct(x.carid)} className="btn btn-danger btn-sm">Delete</button>
                        </td>                                
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        
        </div>
            </div>
    )
}

export default MyProducts;