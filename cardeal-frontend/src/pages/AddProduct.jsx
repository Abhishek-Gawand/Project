import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { apiUrls, baseUrl } from "../services/constants";
import productvalidation from "../validations/productvalidation";

function AddProduct(){
    const [product,setProduct]=useState({
        "cname":"",
        "catid":"",
        "price":"",
        "fueltype":"",
        "qty":1
    })
    const  [cats,setcats]=useState([])
    const [errors,setErrors]=useState({})
    const [selectedPhoto,setSelectedPhoto]=useState(null)
    const [file,setFile]=useState(null)
    const [submitted,setSubmitted]=useState(false)
    const history=useHistory()

    const handleInput=e=>{
        setProduct({...product,[e.target.name]:e.target.value})
    }

    const handleFileInput=e=>{
        setSelectedPhoto(e.target.files[0])
        setFile(URL.createObjectURL(e.target.files[0]))
    }

    const handleSubmit=e=>{
        e.preventDefault()
        setErrors(productvalidation(product))    
        setSubmitted(true)
    }

    useEffect(()=>{
        axios.get(baseUrl+apiUrls.CATEGORIES_LIST)
        .then(resp=>setcats(resp.data))
        .catch(error=>console.log(error))
    },[])

    useEffect(()=>{
        console.log(errors)
        if(Object.keys(errors).length===0 && submitted){
            const formData=new FormData()
            formData.append("pic",selectedPhoto)
            formData.append("cname",product.cname)
            formData.append("catid",product.catid)
            formData.append("price",product.price)
            formData.append("fueltype",product.fueltype)
            formData.append("qty",product.qty)
            console.log(product)
            axios.post(baseUrl+apiUrls.ADD_CAR,formData)
            .then(resp=>{
                let result=resp.data.data;
                console.log(result) 
                toast.success("Book saved successfully")               
                history.push("/myproducts")
            })
            .catch(error=>{
                console.log("Error",error);
                toast.error("Error saving product")
            })            
        }
    },[errors])
    return (
        <div className="container">
                <div className="card shadow bg-success text-white mt-3">
                    <div className="card-body">
                    <div className="row">
                        <div className="col-sm-4 pt-4">
                            {selectedPhoto ? <img className="img-thumbnail" src={file} alt="car" /> : ""} 
                        </div>
                        <div className="col-sm-6">
                            <h4 className="text-center p-2">
                                Add Car
                            </h4>
                            <form onSubmit={handleSubmit}>
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Car Name</label>
                                <div className="col-sm-8">
                                    <input type="text" name="cname" value={product.cname} onChange={handleInput} className="form-control" />
                                    {errors.cname && <small className="text-danger float-right">{errors.cname}</small>}
                                </div>
                                
                            </div>                            
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Category</label>
                                <div className="col-sm-8">
                                    <select name="catid" value={product.cat} onChange={handleInput} className="form-control">
                                        <option value="">Select Category</option>
                                        {cats.map(x=>(
                                            <option key={x.id} value={x.id}>{x.catname}</option>     
                                        ))}
                                            
                                    </select>   
                                    {errors.cat && <small className="text-danger float-right">{errors.cat}</small>}                    
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
                                </div>                                
                            </div>
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Fuel Type</label>
                                <div className="col-sm-8">
                                <select name="fueltype" value={product.fueltype} onChange={handleInput} className="form-control">
                                    <option value="">Select Fuel Type</option>
                                    <option>Petrol</option>
                                    <option>Diesel</option>
                                    <option>CNG</option>
                                    <option>EV</option>
                                </select>
                                    {errors.fueltype && <small className="text-danger float-right">{errors.fueltype}</small>}
                                </div>                                
                            </div>

                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Photo</label>
                                <div className="col-sm-8">
                                    <input type="file" required name="photo" value={product.photo} onChange={handleFileInput} className="form-control-file" />                                    
                                </div>                                
                            </div>
                            
                            <button className="btn btn-primary float-right">Save Car</button>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
                </div>
    )
}

export default AddProduct;
