import { toast } from "react-toastify";
import server from "./server";

const get=async(url)=>
{
    try{
        const response= await server.get(url)
        console.log("api response",response)
        return response.data
    }
   catch(error){
        toast.error('Error occurred')
        throw error
   }
}

const post = async(url,data)=>{
    try{
        const response=await server.post(url,data)
        return response.data
    }
    catch(error){
        toast.error('Error occurred')
        throw error
    }
}

const deletereq = async(url)=>{
    try{
        const response=await server.delete(url)
        return response.data
    }
    catch(error){
        toast.error('Error occurred')
        throw error
    }
}
export default {get,post,delete: deletereq}