import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { apiUrls, baseUrl } from "../services/constants";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function ViewCart(){
    const state=useSelector((state)=>state);
    const dispatch=useDispatch()
    const history=useHistory()
    const {carid}=useParams()
    const [product,setProduct] = useState()
    const [address,setAddress]=useState({
        "city":"",
        "state":"Delhi",
        "zip":"12324",
        "country":"India"
    })
    const [payment,setPayment]=useState({
        "cardno":"1212444433336666",
        "nameoncard":"Test Name",
        "cvv":"123",
        "amount":state.cart.reduce((a,b)=> (a+b.price),0)       
    })

    const handleAddressInput=(e)=>{
        setAddress({...address,[e.target.name]:e.target.value})
    }

    const handlePaymentInput=(e)=>{
        setPayment({...payment,[e.target.name]:e.target.value})
    }

    useEffect(()=>{
        axios.get(baseUrl+apiUrls.CAR_DETAILS+carid)
        .then(resp=>{
            console.log("received",resp.data)
            setProduct(resp.data)            
            setPayment({...payment,'amount':resp.data.price}) 
        })
    },[])

    const handleSubmit=(e)=>{
        e.preventDefault()  
        //setSubmitted(true)
        
        console.log("Amount ",payment.amount)
        setPayment({...payment,'amount':product?.price})

        let data={
            'cart':state.cart,
            'car':product?.carid,
            'payment':payment,
            'address':address,
            'customerid':sessionStorage.getItem('id')
        } 
        console.log(data) 
        axios.post(baseUrl+apiUrls.PLACE_ORDER,data)
        .then(resp=>{
            console.log(resp)
            dispatch({type:'Clear'});
            history.push('/myorders')
        })  
    }
    return (
        <div className="container-fluid">
            
            <div className="row">
                <div className="col-sm-7">
                <h4 className="p-2">Car Details</h4>
                <div className="card text-center mb-3" style={{boxShadow:"0 0 3px 3px white"}}>
                <div className="card-header p-2 border-bottom border-white">
                    <h5>{product?.cname}</h5>
                </div>
                <div className="card-body py-1">
                <img alt="car" style={{width:"90%",height:"250px",marginBottom:"10px"}} src={baseUrl+product?.photo} className="img-thumnail" />
                <h6 className="float-left">Fuel Type: {product?.fueltype}</h6>                
                <h6 className="float-right">Price: &#8377; {product?.price}</h6>                           
                </div>
                
            </div>
            </div>
            <div className="col-sm-4 bg-white text-dark py-2">     
            <form onSubmit={handleSubmit} >           
                <h5 className="p-2">Address Information</h5>
                <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label">City</label>
                    <div className="col-sm-8">
                        <input type="text" name="city" required value={address.city} onChange={handleAddressInput} className="form-control" />                        
                    </div>                        
                </div>
                <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label">State</label>
                    <div className="col-sm-8">
                        <input type="text" name="state" required value={address.state} onChange={handleAddressInput} className="form-control" />
                    </div>                        
                </div>
                <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label">Zip</label>
                    <div className="col-sm-8">
                        <input type="text" name="zip" required value={address.zip} onChange={handleAddressInput} className="form-control" />                        
                    </div>                        
                </div>
                <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label">Country</label>
                    <div className="col-sm-8">
                        <input type="text" name="country" required value={address.country} onChange={handleAddressInput} className="form-control" />                       
                    </div>                        
                </div>

                <h5 className="p-2">Payment Information</h5>
                <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label">Card No</label>
                    <div className="col-sm-8">
                        <input type="text" name="cardno" value={payment.cardno} onChange={handlePaymentInput} className="form-control" maxLength="16" />                        
                    </div>                        
                </div>
                <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label">Name on Card</label>
                    <div className="col-sm-8">
                        <input type="text" name="nameoncard" value={payment.nameoncard} onChange={handlePaymentInput} className="form-control" />                        
                    </div>                        
                </div>
                <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label">Expiry Date</label>
                    <div className="col-sm-8">
                        <input type="month" required className="form-control" />                        
                    </div>                        
                </div>
                <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label">CVV</label>
                    <div className="col-sm-8">
                        <input type="text" maxLength="3" value={payment.cvv} onChange={handlePaymentInput} className="form-control" />                        
                    </div>                        
                </div>
                <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label">Billed Amount</label>
                    <div className="col-sm-8">
                        <input type="text" maxLength="3" readOnly value={payment.amount} onChange={handlePaymentInput} className="form-control" />                        
                    </div>                        
                </div>                
                <button className="btn btn-success float-right">Place Order</button>
                </form>
            </div>
            </div>
        </div>
    )
}

export default ViewCart;