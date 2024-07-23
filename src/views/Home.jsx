
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/context";

export const Home = () => {
    const {store, actions} = useContext(Context)

    const navigate = useNavigate(); 

    const handlePrivate = () => {
        navigate("/private")
    }



    return (
        <div>


            { store.token && store.token !== ""  && store.token !== undefined ?
               ( <div className="container-fluid"> 
                    <div className="container-fluid d-inline-flex justify-content-center align-items-center mt-2 vh-100">
                        <div className=" col-1 me-2">
                            <button className="btn btn-success" onClick={handlePrivate}>Go to private</button>
                        </div>
                    </div>
                </div>) : ( <div className="text-center m-5 text-wrap col-12">
                <h3 className="text-break">Home</h3>
                <h6 className="text-break">You are not logged in!</h6>
            </div>)
            } 
        </div>
    );
};