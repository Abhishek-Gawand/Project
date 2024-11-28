import { baseUrl } from "../services/constants";

function Product(props){
    const {x,showModal}=props
    return (
        <div className="col-sm-3" key={x.prodid}>
            <div className="card text-center mb-3 bg-white" style={{boxShadow:"0 0 3px 3px white"}}>
                <div className="card-header p-2 border-bottom border-white">
                    <h5>{x.cname}</h5>
                </div>
                <div className="card-body py-1">
                <img alt="car" style={{width:"90%",height:"250px",marginBottom:"10px"}} src={baseUrl+x.photo} className="img-thumnail" />
                <h6 className="float-left">Fuel Type: {x.fueltype}</h6>                
                <h6 className="float-right">Price: &#8377; {x.price}</h6>                           
                </div>
                <div className="card-footer p-1">
                    <button onClick={e=>showModal(x)} className="btn btn-primary btn-sm">Buy Now</button>
                </div>
            </div>
        </div>
    )
}

export default Product;