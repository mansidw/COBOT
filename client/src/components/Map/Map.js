import React,{useEffect,useState,useContext} from 'react';
import Navbar from "../Navbars/AuthNavbar";
import Footer from "../Footers/Footer.js";
import DisplayMap from './DisplayMap';
import axios from 'axios'
import { firestore } from '../../services/firebase';
import { UserContext } from '../../contexts/UserProvider';

function Map() {
    const [address,setAddress] = useState()
    const user = useContext(UserContext)
    
    useEffect(()=>{

        firestore.collection("users").doc(user['uid'])
        .get()
        .then((doc) => {
            if (doc.exists) {
              setAddress(doc.data())
          }
        } )
          .catch((error) => {
            console.log("Error getting document:", error);
        });
        
    },[])

return (
    <>
    <Navbar transparent/>
    {/* {address?<h1>{address.address}</h1>:<></>} */}
    <DisplayMap />
    <Footer/>

</>
);
}
export default Map;