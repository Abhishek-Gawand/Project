import { Link } from "react-router-dom";

function LoginRegisterMenu(){
    return(
        <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
                <Link className="nav-link" to="/login">Login</Link>
            </li>            
            <li className="nav-item active">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
        </ul>
    )
}

export default LoginRegisterMenu;