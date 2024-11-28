const loginvalidation=(values)=>{
    let errors={}
    if(!values.userid){
        errors.userid="User id is required"
    }
    if(!values.pwd){
        errors.pwd="Password is required"
    }
    if(!values.role){
        errors.role="Role is required"
    }    
    return errors;
}

export default loginvalidation;