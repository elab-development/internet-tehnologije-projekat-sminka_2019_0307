import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import sanja from "../photos/sanja.png";
import milica from "../photos/milica.png";
import AboutUsCard from "../components/AboutUsCard";

const About = () => {

    const aboutUs = [
        {
            id: 1,
            name: "Sanja Petkovic",
            description: "Sanja is a makeup artist with 10 years of experience. She is a professional who will make sure that you leave our salon satisfied and happy.",
            image: sanja
        },
        {
            id: 2,
            name: "Milica Pajovic",
            description: "Milica is a hair stylist with 15 years of experience. She is a professional who will make sure that you leave our salon satisfied and happy.",
            image: milica
        }
    ];

    return (
        <div>
            <Container>
                <Row>
                    <h1 className="text-center text-black-50 mt-3">About Us</h1>
                </Row>
                <Row className="m-5">
                    {
                        aboutUs.map((about) => {
                            return (
                                <Col md={6} key={about.id}>
                                    <AboutUsCard name={about.name} description={about.description} image={about.image}/>
                                </Col>
                            );
                        })
                    }
                </Row>
            </Container>
        </div>
    );
};

export default About;