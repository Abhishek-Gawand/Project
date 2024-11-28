import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RoleNavbar from "./RoleNavbar";
import { GlobalInfo } from "../App";
import { useContext } from "react";
import { apiUrls, baseUrl } from "../services/constants";
const { Fragment } = require("react");

function NavBar(){
    const state=useSelector((state)=>state);
    const {cats,setcats}=useContext(GlobalInfo) 
    useEffect(()=>{
        axios.get(baseUrl+apiUrls.CATEGORIES_LIST)
        .then(resp=>{
            setcats(resp.data)
        })
        .catch(err=>console.log(err))
    },[])
    return (
        <Fragment>
            <div className="clearfix"></div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success position-sticky" style={{top:0,zIndex:"1000"}}>
                <Link className="navbar-brand" to="#">E-Shop</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Cateories
                        </Link>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            {cats.map(x=>(
                                <Link key={x.id} className="dropdown-item" to={"/cats?cat="+x.id}>{x.catname}</Link>
                            ))}
                        </div>
                    </li>                    
                    </ul>
                    <RoleNavbar isLoggedIn={state.loggedin.IsLoggedIn} />                    
                </div>
                </nav>
        </Fragment>
    )
}

export default NavBar;
