import React,{useContext} from "react"
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from "./contexts/UserProvider"

const PrivateRoute = () => {
    const user = useContext(UserContext)
    return user ? <Outlet /> : <Navigate to="/login" />;
  }
  
export default PrivateRoute;