import React,{Fragment} from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import UserProvider from "./contexts/UserProvider";
import Landing from "views/Landing.js";
import PrivateRoute from './PrivateRoute'
import AddDetails from './components/AddDetails'
import Login from "./views/auth/Login"
import Register  from "./views/auth/Register"
import MyProfile from './components/MyProfile'
import Map from './components/Map/Map'
import CoviCheck from './components/CoviCheck/CoviCheck'

// import Companies from "components/Company/Companies.js"
// import Events from "components/Events/Events.js"

ReactDOM.render(
  <UserProvider>
    <Router>
      <Fragment>
          <Routes>
            <Route exact path="/" element={<Login/>}></Route>
            <Route exact path="/login" element={<Login/>}></Route>
            <Route exact path="/register" element={<Register/>}></Route>
            <Route exact path='/addDetails' element={<PrivateRoute/>}>
              <Route exact path='/addDetails' element={<AddDetails/>}/>
            </Route>
            <Route exact path='/checkcovi' element={<PrivateRoute/>}>
              <Route exact path='/checkcovi' element={<CoviCheck/>}/>
            </Route>
            <Route exact path='/map' element={<PrivateRoute/>}>
              <Route exact path="/map" element={<Map/>}></Route>
            </Route>
            <Route exact path='/home' element={<PrivateRoute/>}>
              <Route exact path="/home" element={<Landing/>}></Route>
            </Route>
            <Route exact path='/profile' element={<PrivateRoute/>}>
              <Route exact path='/profile' element={<MyProfile/>}></Route>
            </Route> 
          </Routes>
        </Fragment>
      </Router>
    </UserProvider>,
  document.getElementById("root")
);
