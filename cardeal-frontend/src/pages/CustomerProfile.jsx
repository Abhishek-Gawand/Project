import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { toast } from "react-toastify"
import { apiUrls, baseUrl } from "../services/constants"

function CustomerProfile(){
    const [uname,setUname]=useState(sessionStorage.getItem("uname"))
    const userid=sessionStorage.getItem("userid")
    const id=sessionStorage.getItem("id")

    const [user,setUser]=useState({
        "id":sessionStorage.getItem("id"),
        "name":"",
        "city":"",
        "userid":"",
        "pwd":"",
        "phone":"",
        "gender":""
    })

    

    useEffect(()=>{
        axios.get(baseUrl+apiUrls.CUSTOMER_DETAILS+id)
        .then(resp=>{
            console.log(resp.data.data)
            setUser(resp.data.data)
        })
    },[])
 
    const handleInput=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault() 
        axios.put(baseUrl+apiUrls.CUSTOMER_UPDATE+id,user)
        .then(resp=>{
            toast.success("Profile updated successfully")
            setUname(user.name)
        })     
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6 mx-auto">
                    <div className="card shadow mt-3">
                        <div className="card-body">
                        
            <h4 className="p-2 text-center">Welcome {uname}</h4>            
            <form onSubmit={handleSubmit}>
                    <div className="form-group form-row">
                        <label className="col-sm-4 form-control-label">Customer Name</label>
                        <div className="col-sm-8">
                            <input type="text" name="name" value={user.name} onChange={handleInput} className="form-control" />                        
                        </div>
                        
                    </div>
                    <div className="form-group form-row">
                        <label className="col-sm-4 form-control-label">City</label>
                        <div className="col-sm-8">
                            <input type="text" name="city" value={user.city} onChange={handleInput} className="form-control" />                        
                        </div>                        
                    </div>
                    <div className="form-group form-row">
                        <label className="col-sm-4 form-control-label">Gender</label>
                        <div className="col-sm-8">
                            <select required name="gender" value={user.gender} onChange={handleInput} className="form-control">
                                <option value="">Select Gender</option>
                                <option>Male</option>     
                                <option>Female</option>     
                            </select>                       
                        </div>                        
                    </div>
                    <div className="form-group form-row">
                        <label className="col-sm-4 form-control-label">User Id</label>
                        <div className="col-sm-8">
                            <input type="text" readOnly name="userid" value={user.userid} onChange={handleInput} className="form-control" />                        
                        </div>
                        
                    </div>
                    <div className="form-group form-row">
                        <label className="col-sm-4 form-control-label">Phone</label>
                        <div className="col-sm-8">
                            <input type="text" maxLength="10" name="phone" value={user.phone} onChange={handleInput} className="form-control" />                        
                        </div>
                        
                    </div>
                    <div className="form-group form-row">
                        <label className="col-sm-4 form-control-label">Password</label>
                        <div className="col-sm-8">
                            <input type="password" name="pwd" value={user.pwd} onChange={handleInput} className="form-control" />                        
                        </div>
                    </div>                    
                    <button className="btn btn-primary float-right">Update Profile</button>
                    </form>                           
        </div>
            
        </div>
                    </div>
                </div>
            </div>
    )
}

export default CustomerProfile;
