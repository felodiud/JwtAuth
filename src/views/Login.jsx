import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/context";
import {  useNavigate } from "react-router-dom";


export const Login = () => {
    const { store, actions } = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    

    useEffect(()=>{
        if (store.token && store.token !== ""  && store.token !== undefined && store.token !== null ) {
           return navigate("/")
        }
    }, [store.token])

    return (
        <div>
            <div className="container-fluid justify-content-center">
                <div>
                    <div className="row w-auto">
                        <div className="col-12 d-flex justify-content-center mt-3">
                            <input
                                type="email"
                                placeholder="email"
                                className="d-block"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center mt-3">
                            <input
                                type="password"
                                placeholder="password"
                                className="d-block"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 col-12 d-flex justify-content-center mt-3">
                            <button className="btn btn-success" onClick={()=>actions.login(email, password)}>
                                Log in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
                
        </div>
    );
};