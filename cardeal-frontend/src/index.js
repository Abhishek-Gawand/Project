import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { Provider } from 'react-redux';
import axios from 'axios';
import { baseUrl } from './services/constants';
import { toast } from 'react-toastify';

axios.defaults.baseURL=baseUrl
// axios.interceptors.response.use((res)=>{
//   console.log("response",res)
//   return res
// },
// error=>{
//   console.log(error)
//   if(error=="Network Error")
//     toast.error('Cannot connect to server')
//   return Promise.reject(error);
// })
axios.interceptors.request.use((req)=>{
  console.log("request",req)
  return req
})



ReactDOM.render(
  <React.StrictMode>  
      {console.table(store)}
    <Provider store={store}>
      <App />
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
