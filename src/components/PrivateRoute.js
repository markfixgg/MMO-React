import React, {useState, useEffect} from 'react'
import {Redirect} from "react-router-dom";
import axios from 'axios'
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'


const PrivateRoute = ({component}) =>{
    const [auth, setAuth] = useState({notLoaded: true});

    useEffect( () => {
        let cleanupFunction = false;
        const verify = async () => {
            try {
                var user = JSON.parse(localStorage.getItem("user"));
                if(user){
                    if(user.jwt){
                        const axiosInstance = axios.create({headers: { "Authorization" : `${user.jwt}` }})
                        
                        const result = await axiosInstance.post("http://127.0.0.1:8081/verify")
                        
                        if(result.data.success){
                            if(!cleanupFunction) setAuth(true)
                        }else{
                            const refresh = await axios.post('http://127.0.0.1:8081/refresh', { refreshToken: user.refresh })
                            if(refresh.data.success){
                                user.jwt = refresh.data.jwt;
                                localStorage.setItem("user", JSON.stringify(user))
                                if(!cleanupFunction) setAuth(true)
                            }else{
                                localStorage.clear()
                                if(!cleanupFunction) setAuth(false)
                            }
                        }
                    }else{
                        if(!cleanupFunction) setAuth(false)
                    }
                }else{
                    if(!cleanupFunction) setAuth(false)
                }   
            } catch (error) {
                if(!cleanupFunction) setAuth(false)
            }
        }
        verify()
        return () => cleanupFunction = true;
    }, [])
    

    if(auth.notLoaded) return <div/>
    
    return( auth ? component : <Redirect to="/login"/> )
}

export default PrivateRoute