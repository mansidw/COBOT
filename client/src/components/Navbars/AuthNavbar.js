/*eslint-disable*/
import React, {useContext } from "react";
import { Link,useNavigate } from "react-router-dom"
import { logOut } from '../../services/firebase';
import { UserContext } from '../../contexts/UserProvider';

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const navigate = useNavigate();
  const user = useContext(UserContext)

  const changeRoute= (a)=>{
    if(a==1){
      logOut()
    }
    else if(a==2){
      navigate('/profile')
    }
    else if(a==0){
      navigate('/checkcovi')
    }
    else if(a==20){
      navigate('/map')
    }
    
  }


  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              to="/home"
            >
              COBOT
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              
            <li className="flex items-center">
                <button
                  className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button" onClick={() => changeRoute(0)}
                >
                  <i class="fas fa-solid fa-virus"></i> CoviCheck
                </button>
              </li>

              <li className="flex items-center">
                <button
                  className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button" onClick={() => changeRoute(2)}
                >
                  <i class="fas fa-solid fa-user"></i> My Profile
                </button>
              </li>

              <li className="flex items-center">
                <button
                  className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button" onClick={() => changeRoute(4)}
                >
                  <i class="fas fa-solid fa-robot"></i> Chat with Bot
                </button>
              </li>

              <li className="flex items-center">
                <button
                  className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button" onClick={() => window.open("http://localhost:3001/corona")}
                >
                  <i class="fas fa-solid fa-chart-line"></i> View Statistics
                </button>
              </li>

              <li className="flex items-center">
                <button
                  className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button" onClick={() => changeRoute(20)}
                >
                  <i class="fas fa-solid fa-hospital"></i> Hospitals
                </button>
              </li>

          {user?
              <li className="flex items-center">
                <button
                  className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button" onClick={() => changeRoute(1)}
                >
                  <i class="fas fa-solid fa-sign-out-alt"></i> Logout
                </button>
              </li>:<></>}
              


            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
