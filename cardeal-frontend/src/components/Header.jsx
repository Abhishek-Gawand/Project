import { useSelector } from "react-redux";

function Header(){
    const state=useSelector((state)=>state);
    return (
        <div className="jumbotron px-2 py-0 mb-0 bg-white rounded-0">
            <img src={'/assets/logo.jpg'} alt="tata" style={{width:"70px",height:"70px"}} className="float-left"/>
            {state.loggedin.IsLoggedIn ?
            <>            
            <h5 className="float-right mt-3">Welcome ! {state.loggedin.Username}</h5> </>:
            ''}
            <h4 className="text-center pt-3">Tata Motors</h4>
            <div className="clearfix"></div>
        </div>
    )
}

export default Header;