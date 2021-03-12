import React, { useState } from "react";
import axios from 'axios';
import ErrorComponent from './ErrorComponent';
import {Redirect} from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export default () =>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [color, setColor] = useState("");
    const [registered, setRegistered] = useState("");

    function validateForm() {
      return (email.length > 0 && password.length > 0 && name.length > 0); 
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      setLoading(true);
      setRegistered(false);
      axios.post('http://127.0.0.1:8081/signup', {
        email: email,
        password: password,
        name: name
      })
      .then(function (response) {
        console.log(response);

        response.data.success ? setColor("green") : setColor("red") // Задаем цвет ошибке

        if(response.data.message == "Missing credentials"){ // Выводим сообщение результата/ошибки
            setError("Вы что-то пропустили")
        } else{
            setError(response.data.message)
        }

        setLoading(false); // Убираем статус загрузки

        new Promise((resolve)=>{
            setTimeout(() => {
                setError("")
                setColor("")
                if(response.data.success){
                    setRegistered(true) 
                };                
                resolve()
            }, 1300);
        }) // Показываем ошибку n-секунды, после чего убираем
      })
      .catch(function (error) {
        console.log(error);
        setColor("red")
        setError("Неизвестная ошибка, попробуйте ещё раз.")

        new Promise((resolve)=>{
            setTimeout(() => {
                setError("")
                setColor("")
                resolve()
            }, 4000);
        }) // Показываем ошибку n-секунды, после чего убираем

        setLoading(false); // Убираем статус загрузки
      });
    }

    return(
        <div>
            <div>
                <>
                {registered ? (<Redirect to="/login"/>) : ("")}
                </>
                <ErrorComponent message={error} color={color}/>
            </div>

            <div className="Login">
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </Form.Group>
                    <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button block size="lg" type="submit" disabled={!validateForm() || isLoading}>{isLoading ? "Loading..." : "Register"}</Button>
                </Form>
            </div>
        </div>
    )
}