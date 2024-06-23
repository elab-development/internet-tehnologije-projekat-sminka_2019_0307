import React, {useEffect, useState} from 'react';
import {Col, Container, Row, Table} from "react-bootstrap";
import axiosInstance from "../axios-instance/axios-call";
import AboutUsCard from "../components/AboutUsCard";

const Services = () => {

    const [services, setServices] = useState([]);
    const [workers, setWorkers] = useState([]);

    //https://randomuser.me/api/?results=2

    useEffect(
        () => {
            axiosInstance.get("https://randomuser.me/api/?results=2")
                .then(res => {
                    console.log(res.data);
                    let data = res.data.results;
                    let workersData = data.map((worker) => {
                        return {
                            name: worker.name.first + " " + worker.name.last,
                            description: "Email: " + worker.email + " Phone: " + worker.phone,
                            image: worker.picture.large
                        }
                    })
                    setWorkers(workersData);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    , []);



    useEffect(() => {
        axiosInstance.get("/services")
            .then(res => {
                console.log(res.data);
                setServices(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <Container>
                <Row>
                    <h1 className="text-center text-black-50 mt-3">Our Services</h1>
                </Row>

                <Row>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Description</th>
                                <th>Type</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            services && services.map((service) => {
                                return (
                                    <tr key={service.id}>
                                        <td>{service.name}</td>
                                        <td>{service.description}</td>
                                        <td>{service.type.type_name}</td>
                                        <td>{service.price}&euro;</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </Table>
                </Row>

                <Row className="mt-3">
                    <h1 className="text-center text-black-50 mt-3">Our Workers of the Month</h1>
                    {
                        workers && workers.map((worker) => {
                            return (
                                <Col key={worker.name} md={6}>
                                    <AboutUsCard name={worker.name} description={worker.description} image={worker.image}/>
                                </Col>
                            );
                        })
                    }
                </Row>


            </Container>
        </div>
    );
};

export default Services;