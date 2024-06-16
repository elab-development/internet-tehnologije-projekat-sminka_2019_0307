import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import axiosInstance from "../axios-instance/axios-call";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import useForm from "../useForm";

const Reservations = () => {

    const [reservations, setReservations] = useState([]);
    const user = JSON.parse(window.sessionStorage.getItem("user"));
    const [izabraniDatum, setIzabraniDatum] = useState(new Date());
    const [freeSlots, setFreeSlots] = useState([]);
    const [services, setServices] = useState([]);

    const [formData, handleChange] = useForm(
        {
            slot_id: "",
            service_id: "",
            email: "",
            phone: "",
            message: ""
        }
    )

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

    useEffect(() => {
        axiosInstance.post("/free-slots", {date: izabraniDatum})
            .then(res => {
                console.log(res.data.data);
                setFreeSlots(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [izabraniDatum]);

    const reserve = () => {
        let data = {
            ...formData,
            reservation_date: izabraniDatum,
            user_id: user.id
        }
        console.log(data);
        axiosInstance.post("/reservations", data)
            .then(res => {
                console.log(res.data);
                setReservations([...reservations, res.data.data]);
            })
            .catch(err => {
                console.log(err);
            });
    }


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
                                <th>Message</th>
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
                                            <td>{reservation.message}</td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </Table>
                    </Col>
                    <Col md={3}>
                        <h3>Reserve</h3>
                        <Form className="mb-3 mt-3">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Date</Form.Label>
                                <br/>
                                <DatePicker selected={izabraniDatum} onChange={(date) => setIzabraniDatum(date.toISOString().split('T')[0])} className="form-control" dateFormat="yyyy-MM-dd"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Choose Slot</Form.Label>
                                <Form.Select onChange={handleChange} aria-label="Slots" name="slot_id">
                                    {
                                        freeSlots && freeSlots.map((slot) => {
                                            return (
                                                <option key={slot.id} value={slot.id}>{slot.name} : {slot.times}</option>
                                            );
                                        })

                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.service">
                                <Form.Label>Choose Service</Form.Label>
                                <Form.Select onChange={handleChange} aria-label="Services" name="service_id">
                                    {
                                        services && services.map((service) => {
                                            return (
                                                <option key={service.id} value={service.id}>{service.name}</option>
                                            );
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" name="phone" placeholder="Phone"  onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Email"  onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPhone">
                                <Form.Label>Message</Form.Label>
                                <Form.Control type="text" name="message" placeholder="Message"  onChange={handleChange}/>
                            </Form.Group>
                            <hr/>
                            <Button onClick={reserve} disabled={freeSlots.length === 0} variant="dark">Reserve</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Reservations;