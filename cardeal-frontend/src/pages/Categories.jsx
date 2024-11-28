import { useContext } from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GlobalInfo } from "../App";
import api from "../services/api";
import { apiUrls, baseUrl } from "../services/constants";

function Categories(){
    const [data,setdata]=useState([])
    const [catid,setcatid]=useState()
    const [catname,setcatname]=useState()
    const {cats,setcats}=useContext(GlobalInfo)
    useEffect(async()=>{
        await loadData()
    },[])

    const loadData=async()=>{
        const resp=await api.get(apiUrls.CATEGORIES_LIST)
        setdata(resp)
        setcats(resp)
    }

    const handleSubmit=async e=>{
        if(catname==undefined){
            return
        }
        const response=await api.post(apiUrls.ADD_CATEGORY,{id:catid,catname:catname})
        loadData()
        setcatname('')
        setcatid(null)
        toast.success(response.data)
    }

    const editcategory=x=>{
        setcatid(x.id)
        setcatname(x.catname)
    }

    const deleteCategory = async (catid)=>{
        let resp=window.confirm('Are you sure to delete this book ?');
        if(resp){
            const resp=await api.delete(baseUrl+apiUrls.DELETE_CATEGORY+catid)
            toast.success("Category deleted successfully")
            loadData()
        }
    }
    
    return (
        <div className="container">
            <div className="card shadow">
                <div className="card-body">                    
            <h4 className="p-2">Categories</h4>
            <div className="row">
                <div className="col-sm-8">
                <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>Id</th>
                        <th>Category</th>
                        <th>Action</th>                                
                    </tr>
                </thead>
                <tbody>
                {data.map(x=>(
                    <tr key={x.id}>
                        <td>{x.id}</td>
                        <td>{x.catname}</td>
                        <td>
                            <button onClick={e=>editcategory(x)} className="btn btn-primary btn-sm mr-2">Edit</button>
                            <button onClick={()=>deleteCategory(x.id)} className="btn btn-danger btn-sm">Delete</button>
                        </td>                                
                    </tr>
                ))}
                </tbody>
            </table>
                </div>
                <div className="col-sm-4">
                    <h4 className="p-2">Add Category</h4>
                    <div className="form-group">
                        <label>Category Name</label>
                        <input type="text" name="catname" value={catname} onChange={e=>setcatname(e.target.value)} className="form-control" />
                    </div>
                    <button onClick={handleSubmit} className="btn btn-primary">Save Category</button>
                </div>
            </div>
            
        </div>
        
        </div>
            </div>
    )
}

export default Categories;