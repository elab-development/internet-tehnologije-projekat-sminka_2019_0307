import React, {useEffect, useState} from 'react';
import {Col, Container, Row, Table} from "react-bootstrap";
import axiosInstance from "../axios-instance/axios-call";

const Reservations = () => {

    const [reservations, setReservations] = useState([]);
    const user = JSON.parse(window.sessionStorage.getItem("user"));

    useEffect(() => {
        axiosInstance.get("/user-reservations/" + user.id)
            .then(res => {
                console.log(res.data);
                setReservations(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);


    return (
        <>
            <Container>
                <Row>
                    <h1 className="text-center text-black-50 mt-3">My reservations</h1>
                </Row>
                <Row>
                    <Col md={9}>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>Service</th>
                                    <th>Date</th>
                                    <th>Slot</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                reservations && reservations.map((reservation) => {
                                    return (
                                        <tr key={reservation.id}>
                                            <td>{reservation.service.name}</td>
                                            <td>{reservation.reservation_date}</td>
                                            <td>{reservation.slot.name} : {reservation.slot.times}</td>
                                            <td>{reservation.service.price} &euro;</td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </Table>
                    </Col>
                    <Col md={3}>

                        Reserve
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Reservations;