import React, { useContext, useState, useRef } from 'react';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom"
import { firestore } from '../services/firebase';
import { UserContext } from '../contexts/UserProvider';

const AddDetails = () => {
    const navigate = useNavigate()
    const nameRef = useRef()
    const ageRef = useRef()
    const addressRef = useRef()
    const cityRef = useRef()
    const pinRef = useRef()
    const stateRef = useRef()
    const user = useContext(UserContext)

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        setError("")
        setLoading(true)
        firestore.collection("users").doc(user['uid']).set({
            name:nameRef.current.value,
            age:ageRef.current.value,
            address:addressRef.current.value,
            city:cityRef.current.value,
            state:stateRef.current.value,
            pin:pinRef.current.value,
        })
        .then(() =>navigate("/home"))
        .catch(error => {
            setError("Failed to update account")
            console.error("Error writing document: ", error);
        })
        .finally(() =>setLoading(false))
    }


    return (
        <main>
      <section className="relative w-full h-full py-40 min-h-screen">
        <div
          className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
          style={{
            backgroundImage:
              "url(" + require("assets/img/back2.png").default + ")",
          }}
        ></div>
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-6/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                    <div className="rounded-t mb-0 px-6 py-6">
                        <div className="text-center mb-3">
                        <h6 className="text-blueGray-500 text-sm font-bold">
                            Fill in the Additional Details!
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
            </div>
      </section>
      </main>
    )
}

export default AddDetails
