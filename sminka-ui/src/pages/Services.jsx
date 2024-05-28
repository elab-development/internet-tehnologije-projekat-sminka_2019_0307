import React, {useEffect, useState} from 'react';
import {Container, Row, Table} from "react-bootstrap";
import axiosInstance from "../axios-instance/axios-call";

const Services = () => {

    const [services, setServices] = useState([]);

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


            </Container>
        </div>
    );
};

export default Services;