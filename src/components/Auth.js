import React, { useState } from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import mmologo from '../assets/mmologo.png'

const Auth = ({child, forgot}) => {
    return (
        <div>
            <div className="loginHeader">
                <Link to="/"><img className="loginLogo" src={mmologo}/></Link>
                <div className="loginNav">
                    <a>
                        <Link to="/login">Login</Link>
                    </a>
                    <a>
                        <Link to="/signup">Sign Up</Link>
                    </a>
                </div>
            </div>

            <div className="form">
                {
                    child
                }
            </div>
            <div className="wrapper">
                <a style={{"display": forgot}}>
                    <Link to="/forgot-password">Забыли пароль?</Link>
                </a>
            </div>
        </div>
    )
}

export default Auth