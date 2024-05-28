import React, {useState} from 'react';
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import useForm from "../useForm";
import axiosInstance from "../axios-instance/axios-call";

const Login = () => {

    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState({
        type: "",
        text: ""
    });

    const [formData, handleChange] = useForm({
        email: "",
        password: ""
    });

    const login = () => {
        axiosInstance.post("/login", formData)
            .then(res => {
                console.log(res.data);
                setShowMessage(true);
                let user = res.data.user;
                let token = res.data.token;
                window.sessionStorage.setItem("token", token);
                window.sessionStorage.setItem("user", JSON.stringify(user));
                setMessage({
                    type: "success",
                    text: "Login successful. Welcome " + user.name
                });
            })
            .catch(err => {
                console.log(err);
                setShowMessage(true);
                setMessage({
                    type: "danger",
                    text: "Login failed"
                });
            });
    }


    return (
        <div>
            <Container>
                <Row>
                    <h1 className="text-center text-black-50 mt-3">Login form</h1>
                    {
                        showMessage && <>
                            <Alert key={message.type} variant={message.type}>
                                {message.text}
                            </Alert>
                        </>
                    }
                </Row>

                <Row>
                    <Col className="m-3" >
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control onChange={handleChange} name="email" type="email" placeholder="name@example.com" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={handleChange} name="password" type="password" placeholder="*******" />
                            </Form.Group>
                            <hr/>
                            <Button type="button" onClick={login} variant={"dark"}>Login</Button>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </div>
    );
};

export default Login;