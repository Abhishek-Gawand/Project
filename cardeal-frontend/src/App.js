import './App.css';
import Header from './components/Header';
import NavBar from './components/NavBar';
import RegCustomer from './pages/RegCustomer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import AdminProfile from './pages/AdminProfile';
import AllCustomers from './pages/AllCustomers';
import AddProduct from './pages/AddProduct';
import MyProducts from './pages/MyProducts';
import AllProduct from './pages/AllProducts';
import EditProduct from './pages/EditProduct';
import CustomerProfile from './pages/CustomerProfile';
import MyOrders from './pages/MyOrders';
import Orders from './pages/Orders';
import ViewCart from './pages/ViewCart';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Categories from './pages/Categories';
import { createContext, useState } from 'react';
export const GlobalInfo=createContext()
function App() {
  const [cats,setcats]=useState([{"id":1,"catname":"First"},{"id":2,"catname":"Second"}])
  return (
    <div className="App">
      <ToastContainer 
      position="top-right"
      autoClose={5000}
      /> 
      <GlobalInfo.Provider value={{cats:cats,setcats:setcats}}>
      <Header />      
      <BrowserRouter>
      <NavBar />
        <Switch>
          <Route component={AllProduct} path="/" exact />
          <Route component={AllProduct} path="/cats" />
          <Route component={RegCustomer} path="/register" />          
          <Route component={Login} path="/login" />          
          <Route component={AdminProfile} path="/aprofile" />          
          <Route component={CustomerProfile} path="/cprofile" />          
          <Route component={AllCustomers} path="/customers" />          
          <Route component={AddProduct} path="/add-product" />          
          <Route component={EditProduct} path="/edit/:prodid" />          
          <Route component={MyProducts} path="/myproducts" />          
          <Route component={MyOrders} path="/myorders" />          
          <Route component={Orders} path="/orders" />          
          <Route component={Categories} path="/categories" />          
          <Route component={ViewCart} path="/cart/:carid" />          
        </Switch>
        </BrowserRouter>
        </GlobalInfo.Provider>
    </div>
  );
}

export default App;
