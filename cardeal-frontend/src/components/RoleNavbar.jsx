import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import LoginRegisterMenu from "./LoginRegisterMenu"

const RoleNavbar=({isLoggedIn})=>{
    const logout=e=>{
        dispatch({type:'LogOut'})
        sessionStorage.clear();
        history.push("/");
    }
    const state=useSelector((state)=>state);
    const history=useHistory()
    const dispatch=useDispatch()
    if(!isLoggedIn) {
         return (
        <LoginRegisterMenu/>
        )
    }
    else if(sessionStorage.getItem("role")==="customer"){
    return (
        <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
            <Link className="nav-link" to="/cprofile">Profile</Link>
        </li>
        <li className="nav-item active">
            <Link className="nav-link" to="/myorders">My Orders</Link>
        </li>
        <li className="nav-item active">
            <Link className="nav-link" onClick={logout} to="#">Logout</Link>
        </li>        
        </ul>
    )
    }
    return (
        <ul className="navbar-nav ml-auto">             
        <li className="nav-item active">
            <Link className="nav-link" to="/aprofile">Profile</Link>
        </li>
        <li className="nav-item active">
            <Link className="nav-link" to="/categories">Categories</Link>
        </li>
        <li className="nav-item active">
            <Link className="nav-link" to="/add-product">Add Car</Link>
        </li>
        <li className="nav-item active">
            <Link className="nav-link" to="/myproducts">Cars</Link>
        </li> 
        <li className="nav-item active">
            <Link className="nav-link" to="/customers">Customers</Link>
        </li>
        <li className="nav-item active">
            <Link className="nav-link" to="/orders">Orders</Link>
        </li>
        <li className="nav-item active">
            <Link className="nav-link" onClick={logout} to="#">Logout</Link>
        </li>        
        </ul>
    )

}



export default RoleNavbar;