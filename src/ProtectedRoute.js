import React,{useEffect} from "react";
import { Navigate, Outlet } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';
import axios from 'axios';
import {url,login} from './actions';
import cookie from 'react-cookies';

function ProtectedRoute() {

  const isAuthenticated = useSelector(state=>state.user.id);
  const dispatch=useDispatch();

  useEffect(() => {
    let id=cookie.load('id');
    let password=cookie.load('password');
    if(id!==undefined&&password!==undefined){
      axios.get(`${url}/user/${id}/${password}`)
         .then((res)=>{
           if(res.data.id!==0){
            dispatch(login(res.data));
          }
      });
    }
  }, [dispatch]);

  return isAuthenticated?<Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;