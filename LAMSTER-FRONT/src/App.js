import React from "react";
import Modal from "@material-ui/core/Modal";
import LeftSide from "./LeftSide.js";
import getModalStyle from "./ModalStyle.js";
import SnackbarComponent from "./Snackbar.js";
import "./styles.css";
import { useState } from "react";

function App() {
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [forgetopen, setForgetOpen] = useState(false);

    //LOGIN
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //REGISTER
    const [firstnameReg, setFirstNameReg] = useState("");
    const [lastnameReg, setLastNameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [mailReg, setMailReg] = useState("");

    //FORGET PASSWORD ASK MAIL
    const [mailforget, setMailForget] = useState("");
    const [passwordForg, setPasswordForg] = useState("");

    //LOGIN/PASSWORD RETOUR CLIENT
    const [loginStatus, setLoginStatus] = useState();
    const [registerStatus, setRegisterStatus] = useState();

    const handleForgetClose = () => {
        setForgetOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function openForgetPassword() {
        setForgetOpen(true);
    }

    // INSCRIPTION
    function UserRegister() {
        fetch("http://localhost:3001/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstname: firstnameReg,
                lastname: lastnameReg,
                mail: mailReg,
                password: passwordReg,
            }),
        }).then((response) => {
            if (response.status === 500) {
                setRegisterStatus(false);
            } else if (response.status === 200) {
                setRegisterStatus(true);
            }
        });
        handleClose();
    }

    //MOT DE PASSE OUBLIE
    function ForgetPassword() {
        fetch("http://localhost:3001/forget", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mail: mailforget,
            }),
        }).then((response) => {
            if (response.status === 401) {
                setPasswordForg("Aucune adresse reconnue !");
            } else if (response.status === 200) {
                setPasswordForg("Email envoyé");
            }
        });
        handleClose();
    }

    //CONNECTION
    function UserLogin() {
        fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mail: username,
                password: password,
            }),
        }).then((response) => {
            response.json().then((json) => {
                if (json.auth) {
                    setLoginStatus("Connecté");
                } else {
                    setLoginStatus("Mail ou mot de passe incorrect");
                }
            });
        });
    }

    //CONTENU MODAL REGISTER
    const register_form = (
        <div style={modalStyle} className="modal_open">
            <h2> Inscription </h2>
            <div>
                <div className="form_style">
                    <input
                        type="text"
                        placeholder="Prénom"
                        onChange={(e) => {
                            setFirstNameReg(e.target.value);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Nom"
                        onChange={(e) => {
                            setLastNameReg(e.target.value);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Adresse mail"
                        onChange={(e) => {
                            setMailReg(e.target.value);
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        onChange={(e) => {
                            setPasswordReg(e.target.value);
                        }}
                    />
                    {firstnameReg && lastnameReg && mailReg && passwordReg ? (
                        <input
                            onClick={() => {
                                UserRegister();
                            }}
                            type="submit"
                            placeholder="S'INSCRIRE"
                        />
                    ) : (
                        <input className="noaccess" defaultValue="S'INSCRIRE" />
                    )}
                </div>
            </div>
        </div>
    );

    //MODAL OUBLI DU MOT DE PASSE
    const forgetpassword = (
        <div style={modalStyle} className="modal_open">
            <h2> Mot de passe oublié </h2>
            <div>
                <div className="form_style">
                    <input
                        type="text"
                        placeholder="Votre E-Mail"
                        onChange={(e) => {
                            setMailForget(e.target.value);
                        }}
                    />
                    {mailforget ? (
                        <input
                            onClick={() => {
                                ForgetPassword();
                            }}
                            type="submit"
                            placeholder="Envoyer"
                        />
                    ) : (
                        <input className="noaccess" defaultValue="Envoyer" />
                    )}
                    {passwordForg && (
                        <h1 className="user_answer">{passwordForg}</h1>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="App">
            <div className="row no-gutters">
                {/* LEFT SIDE OF HOME PAGE */}
                <LeftSide />
                {/* RIGHT SIDE OF HOME PAGE */}
                <div className="col no-gutters">
                    <div className="rightside">
                        <div
                            id="register"
                            onClick={handleOpen}
                            className="register"
                        >
                            S 'inscrire
                        </div>
                        {/* APPEL MODAL MOT DE PASSE OUBLIÉ */}
                        <Modal open={forgetopen} onClose={handleForgetClose}>
                            {forgetpassword}
                        </Modal>
                        {/* APPEL MODAL S'INSCRIRE */}
                        <Modal open={open} onClose={handleClose}>
                            {register_form}
                        </Modal>
                        <div className="form">
                            <div>
                                <img
                                    className="brand_logo"
                                    src="brand_name.svg"
                                    alt="brand_name"
                                />
                            </div>
                            <div className="descr_title">
                                Nous sommes très heureux de vous revoir!
                            </div>
                            <div>
                                <div className="form_style">
                                    <input
                                        type="text"
                                        placeholder="Adresse mail"
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Mot de passe"
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                    <div
                                        onClick={openForgetPassword}
                                        className="forget_password"
                                    >
                                        Mot de passe oublié ?
                                    </div>

                                    {/* VERIFICATION DE LA COMPLETION DES INPUT */}
                                    {password && username ? (
                                        <input
                                            type="submit"
                                            onClick={UserLogin}
                                        />
                                    ) : (
                                        <input
                                            defaultValue="Envoyer"
                                            className={"noaccess"}
                                        />
                                    )}
                                </div>
                                {loginStatus && (
                                    <h1 className="user_answer">
                                        {loginStatus}{" "}
                                    </h1>
                                )}
                                {registerStatus && (
                                    <div>
                                        <SnackbarComponent />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
