import React, {useState} from 'react';
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import useForm from "../useForm";

const Contact = () => {

    const [formData, handleChange] = useForm({
        email: "",
        message: ""
    });

    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState({
        type: "",
        text: ""
    });



    const handleClick = () => {
        console.log(formData);
        if(formData.email === "" || formData.message === ""){
            setShowMessage(true);
            setMessage({
                type: "danger",
                text: "All fields are required"
            });
            return;
        }

        setShowMessage(true);
        setMessage({
            type: "success",
            text: "Message sent successfully. We will contact you soon to email: ." + formData.email
        });
    }

    return (
        <>
            <Container>
                <Row>
                    <h1 className="text-center text-black-50 mt-3">Contact Us</h1>
                    {
                        showMessage && <>
                            <Alert key={message.type} variant={message.type}>
                                {message.text}
                            </Alert>
                        </>
                    }
                </Row>
                <Row className="m-5">
                    <Col md={6} >
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control onChange={handleChange} name="email" type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicMessage">
                                <Form.Label>Message</Form.Label>
                                <Form.Control onChange={handleChange} name="message" as="textarea" type="text" placeholder="Message" />
                            </Form.Group>
                            <Button variant="dark" type="button" onClick={handleClick}>
                                Submit
                            </Button>
                        </Form>
                    </Col>
                    <Col md={6}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2832.4950402506356!2d20.474893576201456!3d44.77071207944153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7057daa060a9%3A0x13e6b50704d3a759!2sBilec%CC%81ka%205%2C%20Beograd!5e0!3m2!1sen!2srs!4v1716122253862!5m2!1sen!2srs"
                            width="600" height="450" allowFullScreen="" loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Contact;