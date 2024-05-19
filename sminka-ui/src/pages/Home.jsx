import React from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";
import pocetna from "../photos/pocetna.jpeg";

const Home = () => {
    return (
        <>
            <Container>
                <Row>
                    <h1 className="text-center text-black-50 mt-3">Welcome</h1>
                </Row>
                <Row className="m-5">
                    <Col md={6}>
                        <Image src={pocetna} fluid/>
                    </Col>
                    <Col md={6}>
                        <h3>Hello beautiful people</h3>
                        <p>
                            We are here to make you feel beautiful and confident. We offer a wide range of services
                            that will make you feel like a new person. Our team is made of professionals who will make
                            sure that you leave our salon satisfied and happy. We are looking forward to seeing you.
                        </p>

                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Home;