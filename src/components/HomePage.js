import React from "react";
import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route, Link, Redirect, useLocation} from "react-router-dom";
import mmologo from '../assets/mmologo.png'
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:8081";

const HomePage = ()=>{
    const handleClick = (e)=>{
        e.preventDefault();
        localStorage.clear(); 
        window.location.reload()
    }
    // const socket = socketIOClient(ENDPOINT);
    // socket.on("currentPlayers", data => {
    //     console.log(data)
    // });

    return (
        <div className="container">
            <header className="header">
                <Link to="/"><img className="loginLogo" src={mmologo}/></Link>
                <div className="navs" style={{marginTop: "17px"}}>
                    <Link to="/profile" style={{marginRight:"20px"}}>Profile</Link>
                    <Link onClick={(e)=>{handleClick(e)}}>Logout</Link>
                </div>
            </header>            
            <div className="wrapper" style={{marginTop: "25px"}}>
                <div className="contentContainer">
                    <div className="wrapper"><h4>Home Page</h4></div>
                    <p className="wrapper">some content will be here</p>
                </div>
            </div>
        </div>
    )
}


export default HomePage