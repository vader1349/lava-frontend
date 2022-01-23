import { Navigate, Outlet } from "react-router-dom";
import {useSelector} from 'react-redux';

function ProtectedRoute() {

  const isAuthenticated = useSelector(state=>state.user.id);

  return isAuthenticated!==0?<Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;