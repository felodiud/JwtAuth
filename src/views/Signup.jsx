import React, { useState } from "react";
import { Modal } from "./Components/Modal"
import { Modal as BootstrapModal } from "bootstrap";
import { useNavigate } from 'react-router-dom'

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [modalMsg, setModalMsg] = useState("");
    const navigate = useNavigate();

    const handleSignup = () => {
        fetch('http://192.168.50.127:3001/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                confirmPass: confirmPassword,
                active: true,
            })
        })
        .then((response) => {
            if (response.ok) {
                return response.json(); 
            } else {
                return response.json().then((errorData) => {
                    throw new Error(errorData.msg || 'Error en la respuesta del servidor');
                });
            }
        })
        .then((data) => {
            setModalMsg(data.msg);
            const modalElement = document.getElementById('staticBackdrop');
            const modal = new BootstrapModal(modalElement);
            modal.show(); 
        })
        .catch((error) => {
            console.error('Error:', error.message);
            setModalMsg(error.message);
            const modalElement = document.getElementById('staticBackdrop');
            const modal = new BootstrapModal(modalElement);
            modal.show(); 
        });
    };

    return (
        <div>
            <div className="container-fluid justify-content-center">
                

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
                    <div className="col-12 d-flex justify-content-center mt-3">
                        <input
                            type="password"
                            placeholder="confirm password"
                            className="d-block"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-3 col-12 d-flex justify-content-center mt-3">
                        <button className="btn btn-primary" onClick={handleSignup}>
                            Sign up
                        </button>
                    </div>
                </div>
            </div>


            <Modal 
                title="Notification"
                body={modalMsg}
                onClose={() => {
                    const modalElement = document.getElementById('staticBackdrop');
                    const modal = new BootstrapModal(modalElement);
                    modal.hide();
                    if (modalMsg === 'User created') {
                        navigate('/');
                    }
                }}
            />
        </div>
    );
};