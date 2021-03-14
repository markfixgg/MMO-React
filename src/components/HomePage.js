import React from "react";
import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route, Link, Redirect, useLocation} from "react-router-dom";
import mmologo from '../assets/mmologo.png'
import socketIOClient from "socket.io-client";
import GameComponent from '../game/GameComponent';


const HomePage = ()=>{

    const handleClick = (e)=>{
        e.preventDefault();
        localStorage.clear(); 
        window.location.reload()
    }

    const socketInit = ()=> {
        const socket = socketIOClient(`http://127.0.0.1:8081`);

        socket.on("currentPlayers", data => {
            console.log(data)
        });
    }

    return (
        <div className="container">
            <header className="header">
                <Link to="/"><img className="loginLogo" src={mmologo}/></Link>
                <div className="navs" style={{marginTop: "17px"}}>
                    <Link to="/profile" style={{marginRight:"20px"}}>Profile</Link>
                    <a href="" onClick={ e => handleClick(e)}>Logout</a>
                </div>
            </header>
            <div className="wrapper" style={{marginTop: "25px"}}>
                <div className="contentContainer">
                    <div className="wrapper"><h4>Game</h4></div>
                    <div id="game__container" className="wrapper" style={{paddingBottom:"20px"}}>
                        <GameComponent/>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default HomePage