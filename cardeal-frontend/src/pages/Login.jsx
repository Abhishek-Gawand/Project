import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { apiUrls } from "../services/constants";
import loginvalidation from "../validations/loginvalidation"

function Login(){
    const dispatch=useDispatch()
    const [user,setUser]=useState({
        "userid":"",
        "pwd":"",
        "role":""
    })
    const [submitted,setSubmitted]=useState(false)
    const [errors,setErrors]=useState({})
    const history=useHistory()

    const handleInput=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    const handleSubmit=e=>{
        e.preventDefault()
        setErrors(loginvalidation(user))    
        setSubmitted(true)
    }

    useEffect(()=>{
        console.log(errors)
        if(Object.keys(errors).length===0 && submitted){
            console.log(user)
            if(user.role=="Admin"){
            axios.post(apiUrls.ADMIN_LOGIN,user)
            .then(resp=>{
                let result=resp.data.data;
                console.log(resp.data.data)
                sessionStorage.setItem("userid",result.userid)
                sessionStorage.setItem("uname",result.uname)
                sessionStorage.setItem("role","admin")
                dispatch({type:'IsLoggedIn'})
                toast.success('Login Successful')
                history.push("/aprofile")
            })
            .catch(error=>{
                console.log("Error",error);
                toast.error("Invalid username or password..!!")
            })            
        }
        else
        {
            axios.post(apiUrls.CUSTOMER_LOGIN,user)
            .then(resp=>{
                let result=resp.data.data;
                console.log(resp.data.data)
                sessionStorage.setItem("userid",result.userid)
                sessionStorage.setItem("uname",result.name)
                sessionStorage.setItem("role","customer")
                sessionStorage.setItem("id",result.id)  
                dispatch({type:'IsLoggedIn'})
                toast.success('Login Successful')
                history.push("/")
            })
            .catch(error=>{
                console.log("Error",error);
                toast.error("Invalid username or password")
            })  
        }
        }
    },[errors])


    return (
    <div className="container">
            <div className="card shadow mt-3" style={{minHeight:"80%"}}>
        <div className="card-body">
        <div className="row">
            <div className="col-sm-5 text-center bg-success text-white">
                <h4 style={{marginTop:"100px"}}>Login Screen</h4>
            </div>
            <div className="col-sm-5 offset-1" style={{minHeight:"500px"}}>                
                <form onSubmit={handleSubmit} className="mt-5">                 
                <div className="form-group">
                    <label>User Id</label>
                    <input type="text" name="userid" value={user.userid} onChange={handleInput} className="form-control" />
                    {errors.userid && <small className="text-danger">{errors.userid}</small>}                    
                </div>                    
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="pwd" value={user.pwd} onChange={handleInput} className="form-control" />
                    {errors.pwd && <small className="text-danger">{errors.pwd}</small>}
                </div> 
                <div className="form-group">
                    <label>Role</label>
                    <select name="role" value={user.role} onChange={handleInput} className="form-control">
                        <option value="">Select Role</option>
                        <option>Admin</option>
                        <option>Customer</option>
                    </select>
                    {errors.role && <small className="text-danger">{errors.role}</small>}
                </div> 
                <div className="clearfix"></div>                   
                <button className="btn btn-primary float-right mt-2">Login Now</button>
                </form>
                <div className="clearfix"></div>
            </div>
        </div>
    </div>
    </div>
    </div>
    );
}

export default Login;