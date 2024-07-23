import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/context";
import { Modal } from "./Components/Modal"
import { Modal as BootstrapModal } from "bootstrap";


export const Private = () => {
    const { store, actions  } = useContext(Context)
    const [message, setMessage] = useState("")
    const navigate = useNavigate(); 

    useEffect(()=>{
      if (!store.token || store.token === ""  || store.token === undefined || store.token === null) {
         return navigate("/")
      }
    })

    const handleHome = () => {
      navigate("/")
    }

    const handleGetMessage = async () => {
      try {
        const message = await actions.getMessage();
        setMessage(message);
        const modalElement = document.getElementById('staticBackdrop');
        const modal = new BootstrapModal(modalElement);
        modal.show(); 
      } catch (error) {
        console.error("Error fetching message:", error);
        setMessage("Error fetching message"); // Ajusta el mensaje de error si es necesario
      }
    }


    return (
        <div className="">
            <div className="d-flex justify-content-center text-center text-wrap col-12">
              <h6 className="text-break">{`Your are loged in with token: ${store.token}`}</h6>
            </div>
            <div className="col-12 me-2 d-flex justify-content-center mt-3">
              <button className="btn btn-primary" onClick={handleGetMessage}>get Message from back end with authorization bearer</button>
            </div>
            <div className="col-12 me-2 d-flex justify-content-center mt-2">
              <button className="btn btn-success" onClick={handleHome}>Go to home</button>
            </div>
            <Modal
                title="New Messasge!"
                body={message}
                onClose={() => {
                    const modalElement = document.getElementById('staticBackdrop');
                    const modal = new BootstrapModal(modalElement);
                    modal.hide();
                }}
            />
        </div>

        


    )
};
