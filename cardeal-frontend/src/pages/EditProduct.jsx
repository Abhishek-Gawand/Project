import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { apiUrls, baseUrl } from "../services/constants";
import productvalidation from "../validations/productvalidation";

function EditProduct(){
    console.log("Edit product page")
    const {prodid}=useParams()
    const  [cats,setcats]=useState([])
    const [product,setProduct]=useState({
        "bookid":prodid,
        "cname":"",
        "catid":"",
        "qty":"",
        "price":"",
        "author":"",
        "category":""
    })
    
    
    const [errors,setErrors]=useState({})
    const [submitted,setSubmitted]=useState(false)
    const history=useHistory()

    const handleInput=e=>{
        setProduct({...product,[e.target.name]:e.target.value})
    }

    useEffect(()=>{
        axios.get('http://localhost:8080/api/categories')
        .then(resp=>setcats(resp.data))
        .catch(error=>console.log(error))        
    },[])

    const handleSubmit=e=>{
        e.preventDefault()
        product.catid=product.category.id
        console.log("product",product)
        setErrors(productvalidation(product))    
        setSubmitted(true)
    }
    
    useEffect(()=>{        
        console.log(errors)

        axios.get(baseUrl+apiUrls.CAR_DETAILS+prodid)
        .then(resp=>{
            console.log("received",resp.data)
            setProduct(resp.data)            
        })
        
        if(Object.keys(errors).length===0 && submitted){            
            console.log(product)
            axios.put(baseUrl+apiUrls.UPDATE_CAR+prodid,product)
            .then(resp=>{
                toast.success("Product saved successfully")               
                history.push("/myproducts")
            })
            .catch(error=>{
                console.log("Error",error);
                toast.error("Error saving product")
            })            
        }
    },[errors])
    return (
        <div className="container pt-3 card mt-3">
                    <div className="row">
                        <div className="col-sm-4">
                            <img className="img-thumbnail mt-3" src={baseUrl+"/"+product?.photo} alt="car" />
                        </div>
                        <div className="col-sm-6 offset-1 p-4">
                            <h4 className="text-center p-2">
                                Edit Book (Book Id : {product.carid})
                            </h4>
                            <form onSubmit={handleSubmit}>
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Product Name</label>
                                <div className="col-sm-8">
                                    <input type="text" name="cname" value={product?.cname} onChange={handleInput} className="form-control" />
                                    {errors.cname && <small className="text-danger float-right">{errors.cname}</small>}
                                </div>
                                
                            </div>                            
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Category</label>
                                <div className="col-sm-8">
                                    <select name="catid" value={product.category.id} 
                                    onChange={e=>setProduct({...product,'catid':e.target.value})} className="form-control">
                                        <option value="">Select Category</option>
                                        {cats.map(x=>(
                                            <option key={x.id} value={x.id}>{x.catname}</option>     
                                        ))} 
                                    </select>   
                                    {errors.catid && <small className="text-danger float-right">{errors.catid}</small>}                    
                                </div>                        
                            </div>                            
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Price</label>
                                <div className="col-sm-8">
                                    <input type="number" name="price" value={product.price} onChange={handleInput} className="form-control" />
                                    {errors.price && <small className="text-danger float-right">{errors.price}</small>}
                                </div>                                
                            </div>
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Quantity</label>
                                <div className="col-sm-8">
                                    <input type="number" name="qty" value={product.qty} onChange={handleInput} className="form-control" />
                                    {errors.qty && <small className="text-danger float-right">{errors.qty}</small>}
                                </div>                                
                            </div>
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Author</label>
                                <div className="col-sm-8">
                                <select name="fueltype" value={product.fueltype} onChange={handleInput} className="form-control">
                                    <option value="">Select Fuel Type</option>
                                    <option>Petrol</option>
                                    <option>Diesel</option>
                                    <option>CNG</option>
                                    <option>EV</option>
                                </select>
                                    {errors.author && <small className="text-danger float-right">{errors.author}</small>}
                                </div>                                
                            </div>                           
                            
                            <button className="btn btn-primary float-right">Update Car</button>
                            </form>
                        </div>
                    </div>
                </div>
    )
}

export default EditProduct;
