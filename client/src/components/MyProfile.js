import React, { useContext, useState, useRef, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom"
import { firestore } from '../services/firebase';
import { UserContext } from '../contexts/UserProvider';
import Navbar from "../components/Navbars/AuthNavbar";
import Footer from "../components/Footers/Footer.js";

const MyProfile = () => {
    const navigate = useNavigate()
    const[message,setMessage] = useState()
    const nameRef = useRef()
    const ageRef = useRef()
    const addressRef = useRef()
    const cityRef = useRef()
    const pinRef = useRef()
    const stateRef = useRef()
    const user = useContext(UserContext)

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        firestore.collection("users").doc(user['uid'])
        .get()
        .then((doc) => {
            if (doc.exists) {
              setMessage(doc.data())
          }})
          .catch((error) => {
            console.log("Error getting document:", error);
        });
    
      },[])

    function handleSubmit(e) {
        e.preventDefault()
        const promises = []
        setError("")
        setLoading(true)
        if (nameRef.current.value !== message.name) {
        promises.push(
            firestore.collection("users").doc(user['uid'])
            .update({ name:nameRef.current.value},{merge:true}))
        }
        if (ageRef.current.value !== message.age) {
        promises.push(
            firestore.collection("users").doc(user['uid'])
            .update({ age:ageRef.current.value},{merge:true}))
        }
        if (addressRef.current.value !== message.address) {
        promises.push(
            firestore.collection("users").doc(user['uid'])
            .update({ address:addressRef.current.value},{merge:true}))
        }
        if (cityRef.current.value !== message.city) {
        promises.push(
            firestore.collection("users").doc(user['uid'])
            .update({ city:cityRef.current.value},{merge:true}))
        }
        if (stateRef.current.value !== message.state) {
            promises.push(
                firestore.collection("users").doc(user['uid'])
                .update({ state:stateRef.current.value},{merge:true}))
        }
        if (pinRef.current.value !== message.pin) {
        promises.push(
            firestore.collection("users").doc(user['uid'])
            .update({ pin:pinRef.current.value},{merge:true}))
        }
        

        Promise.all(promises)
            .then(() => {
              navigate("/home")
            })
            .catch(() => {
              setError("Failed to update account")
            })
            .finally(() => {
              setLoading(false)
        })
    }


    return (
        <>
        <Navbar transparent />
        <main>
      <section className="relative w-full h-full py-40 min-h-screen">
        <div
          className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
          style={{
            backgroundImage:
              "url(" + require("assets/img/back2.png").default + ")",
          }}
        ></div>
            
            {message?
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-6/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                    <div className="rounded-t mb-0 px-6 py-6">
                        <div className="text-center mb-3">
                        <h6 className="text-blueGray-500 text-sm font-bold">
                            Profile
                        </h6>
                        </div>
                        
                        {error && <Alert severity="error">{error}</Alert>}
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        
                        <form onSubmit={handleSubmit}>
                        <div className="relative w-full mb-3">
                            <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                            >
                            Name
                            </label>
                            <input
                            type="text"
                            defaultValue={message.name}
                            ref={nameRef}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Name"
                            />
                        </div>

                        


                        <div className="relative w-full mb-3">
                            <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                            >
                            Address
                            </label>
                            <input
                            defaultValue={message.address}
                            type="text"
                            ref={addressRef}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Address"
                            />
                        </div>

                        <div className="relative w-full mb-3">
                            <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                            >
                            City
                            </label>
                            <input
                            defaultValue={message.city}
                            ref={cityRef}
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="City"
                            />
                        </div>

                        <div className="relative w-full mb-3">
                            <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                            >
                            State
                            </label>
                            <input
                            defaultValue={message.state}
                            ref={stateRef}
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="State"
                            />
                        </div>

                        <div className="relative w-full mb-3">
                            <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                            >
                            Pin Code
                            </label>
                            <input
                            defaultValue={message.pin}
                            ref={pinRef}
                            type="number"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Pin Code"
                            />
                        </div>

                        <div className="relative w-full mb-3">
                            <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                            >
                            Age
                            </label>
                            <input
                            defaultValue={message.age}
                            ref={ageRef}
                            type="number"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Age"
                            />
                        </div>

                        

                        <div className="text-center mt-6">
                            <button
                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            typr="submit" disabled={loading}
                            >
                            Done!
                            </button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>:<></>}
        </section>
        </main>
        <Footer />
            </>
      
    )
}

export default MyProfile
