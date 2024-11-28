const productvalidation=(values)=>{
    let errors={}
    if(!values.cname){
        errors.cname="Car Name is required"
    }
    if(!values.price){
        errors.price="Price is required"
    } 
    if(!values.catid){
        errors.catid="Category is required"
    } 
    if(!values.fueltype){
        errors.fueltype="FuelType is required"
    }   
    return errors;
}

export default productvalidation;